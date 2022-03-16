<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { browser } from '$app/env';

	function parseMessage(msg) {
		const values = msg.split(';');

		let data = {};
		values.forEach((el) => {
			const [key, value] = el.split('=');
			// console.log(key, value);
			data[key] = value;
		});

		return data;
	}

	async function postText() {
		const data = {
			voice: 'Brian',
			text: 'sapjes bas'
		};

		const res = await fetch('/api/v1/tts', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});
		const json = await res.json();
		console.log(json);
	}

	// let chat;
	onMount(async () => {
		if (browser) {
			const channel = $page.url.searchParams.get('channel') || '';

			ComfyJS.Init(channel);

			ComfyJS.onChat = (user, message, flags, self, extra) => {
				console.log(user, message, flags, extra);
			};
		}

		// import ComfyJS from 'comfy.js';

		// chat = new WebSocket('wss://irc-ws.chat.twitch.tv:');

		// chat.addEventListener('open', () => {
		// 	chat.send('CAP REQ :twitch.tv/membership');
		// 	chat.send('CAP REQ :twitch.tv/tags');
		// 	chat.send('CAP REQ :twitch.tv/commands');
		// 	chat.send('NICK justinfan12345');
		// 	chat.send('PASS 12345');
		// 	chat.send('JOIN #firefox__');
		// });

		// chat.addEventListener('message', (data) => {
		// 	const msg = data.data;
		// 	if (msg === 'PING :tmi.twitch.tv') {
		// 		chat.send('PONG :tmi.twitch.tv');
		// 		return;
		// 	}
		// 	console.log(parseMessage(msg));
		// });

		// return () => {
		// 	chat.close();
		// };
	});
</script>

<svelte:head>
	<title>Highlight Messages on Stream</title>
	<script src="https://cdn.jsdelivr.net/npm/comfy.js@latest/dist/comfy.min.js"></script>
</svelte:head>

<button on:click={postText}>Post</button>

<audio id="audio" style="visibility: hidden">
	<source id="source" type="audio/wav" />
</audio>

<!-- 
<head>
  <link href="./style.css" rel="stylesheet" />
</head>

<body>
  <div id="parent-container" class="parent-container">
    <div id="highlight-container" class="translucent-bg">
      <h2><span id="badges"></span> <span id="username"></span></h2>
      <p id="text"></p>
    </div>
  </div>

  <section class="ui">
    <button class="skipTTS">Skip message</button>
  </section>

  <script src="./index.js"></script>
</body> -->
