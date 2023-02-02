import { error } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	let { voice, text } = await request.json();
	// fallback values
	voice = voice ? voice : 'Brian';
	text = text ? text : 'Please select a message';

	const res = await fetch('https://streamlabs.com/polly/speak', {
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

	if (json.success) {
		return new Response(JSON.stringify(json));
	}

	throw error(404, 'Something went wrong :(');
}
