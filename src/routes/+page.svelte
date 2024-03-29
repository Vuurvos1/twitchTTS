<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	const params = $page.url.searchParams;
	let ttsVoice = params.get('voice') || 'Brian';
	const channel = params.get('channel');
	const isTTSEnabled = params.get('tts') || false;
	const subOnly = params.get('subOnly') || false;
	const charLimit = params.get('limit') || null;
	const ui = params.get('ui') || false;
	const alignBottom = params.get('bottom') || false;
	const textOnScreenTime = Number(params.get('texttimer')) || 30000;

	let audioEl: HTMLAudioElement;
	let audioSrcEl: HTMLSourceElement;

	const BADGES_BASE = 'https://badges.twitch.tv/v1/badges';
	const EMOTE_BASE = 'https://static-cdn.jtvnw.net/emoticons/v1';
	const badgeSets: Record<string, any> = {};
	let messageId = '';
	let cooldownTimer: number | null = null;
	let msgQueue: any[] = [];

	async function playTTS() {
		const audio = audioEl;

		if (audio.paused && msgQueue.length > 0) {
			const text = msgQueue[0];
			const voice = ttsVoice;

			const speak = await postText(voice, text);

			if (!speak.success) {
				return;
			}

			// TODO: Switch to Web Audio API instead of using Audio elements.
			const mp3 = speak.speak_url;
			audioSrcEl.src = mp3;

			audio.load();
			audio.volume = 1;
			audio.play();

			// remove message from queue
			msgQueue.shift();
		}
	}

	async function skipTTS() {
		// stop audio and remove message from queue
		const audio = audioEl;
		audio.pause();
		audio.currentTime = 0;

		if (msgQueue.length < 1) {
			return;
		}

		playTTS();
	}

	async function postText(voice: string, text: string) {
		const res = await fetch('/api/v1/tts', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				voice,
				text
			})
		});
		const json = await res.json();
		return json;
	}

	onMount(async () => {
		const elements = {
			badges: document.querySelector('#badges'),
			username: document.querySelector('#username'),
			text: document.querySelector('#text'),
			highlightContainer: document.querySelector('#highlight-container')
		};

		function loadBadgeSet(id: any) {
			if (!id) return;

			Promise.all([
				fetch(`${BADGES_BASE}/global/display?language=en`).then((r) => r.json()),
				fetch(`${BADGES_BASE}/channels/${id}/display?language=en`).then((r) => r.json())
			]).then(([globalBadges, channelBadges]) => {
				if (!globalBadges) {
					return;
				}
				Object.assign(badgeSets, globalBadges.badge_sets || {});
				if (!channelBadges) {
					return;
				}
				// Merge the sets together
				Object.keys(channelBadges.badge_sets || {}).forEach((k) => {
					if (badgeSets[k].versions) {
						Object.assign(badgeSets[k].versions, channelBadges.badge_sets[k].versions);
					} else {
						badgeSets[k] = channelBadges.badge_sets[k];
					}
				});
			});
		}

		function htmlEntities(html) {
			const format = (textArr) =>
				textArr.map((n, i, arr) =>
					n.length !== 1 ? n : n.replace(/[\u00A0-\u9999<>\&]/gim, (i) => `&#${i.charCodeAt(0)};`)
				);
			return Array.isArray(html) ? format(html) : format(html.split('')).join('');
		}

		function formatEmotes(text, emotes) {
			let splitText = text.split('');
			for (const i in emotes) {
				const e = emotes[i];
				for (let j in e) {
					let mote = e[j];
					if (typeof mote !== 'string') {
						continue;
					}
					mote = mote.split('-');
					mote = [parseInt(mote[0]), parseInt(mote[1])];
					let length = mote[1] - mote[0];
					splitText = [
						...splitText.slice(0, mote[0]),
						// Empty
						...Array(length + 1).fill(''),
						...splitText.slice(mote[1] + 1, splitText.length)
					];
					const img = new Image();
					const src = `${EMOTE_BASE}/${i}`;
					img.src = src;
					img.className = 'chat-message-emote';
					img.srcset = `${src}/1.0 1x,${src}/2.0 2x,${src}/3.0 4x`;
					splitText.splice(mote[0], 1, img.outerHTML);
				}
			}
			return htmlEntities(splitText).join('');
		}

		function createBadgeFromRole(name: string, version: any) {
			const badge = new Image();
			badge.className = 'chat-badge';
			if (name in badgeSets && version in badgeSets[name].versions) {
				const badgeImage = badgeSets[name].versions[version];
				const src = badgeImage.image_url_1x;
				badge.src = src;
				badge.srcset = `${src} 1x, ${badgeImage.image_url_2x} 2x, ${badgeImage.image_url_4x} 4x`;
				badge.alt = badgeImage.title;
			}
			return badge;
		}

		async function highlightThisMessage(user: any, message: any, extra: any) {
			messageId = extra.id;
			const badges = document.createElement('span');
			badges.className = 'chat-badge-items';
			// Add badges based on type
			if (extra['userBadges']) {
				Object.keys(extra['userBadges']).forEach((x) => {
					badges.appendChild(createBadgeFromRole(x, extra['userBadges'][x]));
				});
			}
			elements.badges.innerHTML = badges.innerHTML;
			elements.username.innerText = user;
			elements.username.style.color = extra.userColor;
			elements.text.innerHTML = formatEmotes(message, extra.messageEmotes);
			elements.highlightContainer.style.visibility = 'visible';
			clearTimeout(cooldownTimer);

			cooldownTimer = setTimeout(
				() => (elements.highlightContainer.style.visibility = 'hidden'),
				textOnScreenTime
			);

			if (alignBottom) {
				elements.highlightContainer.style.bottom = '0px';
			}

			if (isTTSEnabled) {
				// character limit
				if (charLimit) {
					// prevent substring returning empty
					if (charLimit < message.length) {
						message = message.substring(0, charLimit);
					}
				}

				if (typeof message != 'undefined') {
					// add message to queue
					ttsVoice = params.get('voice') || 'Brian';
					msgQueue.push(message.trim());
					playTTS();
				}
			}
		}

		ComfyJS.onMessageDeleted = (id, extra) => {
			if (id === messageId) {
				// delete highlighted message
				elements.highlightContainer.style.visibility = 'hidden';
				audioEl.pause();
				audioEl.src = '';
			}
		};

		ComfyJS.onChat = (user, message, flags, self, extra) => {
			// sub only logic
			if (subOnly && !flags.subscriber) {
				return;
			}

			if (flags.highlighted) {
				highlightThisMessage(user, message, extra);
			}
		};

		ComfyJS.onCommand = (user, command, message, flags, extra) => {
			if (flags.highlighted) {
				highlightThisMessage(user, `!${command} ${message}`, extra);
			}
		};

		if (channel) {
			ComfyJS.Init(channel);

			// TODO fix this?
			fetch(`https://api.twitch.tv/helix/users?login=${channel}`, {
				headers: {
					'Client-ID': '2odsv8xermvalbub7wipebrphqlpqv'
				}
			})
				.then((r) => r.json())
				.then((data) => loadBadgeSet(data?.data[0]?.id));
		}

		audioEl.addEventListener('ended', () => {
			// add bit of delay between messages
			setTimeout(playTTS, 500);
		});
	});
</script>

<svelte:head>
	<title>Highlight Messages on Stream</title>
	<script src="https://cdn.jsdelivr.net/npm/comfy.js@latest/dist/comfy.min.js"></script>
</svelte:head>

<div id="parent-container" class="parent-container">
	<div id="highlight-container" class="translucent-bg">
		<h2><span id="badges" /> <span id="username" /></h2>
		<p id="text" />
	</div>
</div>

{#if ui}
	<section class="ui">
		<button class="skipTTS" on:click={skipTTS}>Skip message</button>
	</section>
{/if}

<audio style="visibility: hidden" bind:this={audioEl}>
	<source type="audio/wav" bind:this={audioSrcEl} />
</audio>
