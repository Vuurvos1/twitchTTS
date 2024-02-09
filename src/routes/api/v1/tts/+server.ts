import { error, type NumericRange } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	let { voice, text } = await request.json();
	
	// fallback values
	voice = voice ? voice : 'Brian';
	text = text ? text : 'Please select a message';

	const res = await fetch('https://streamlabs.com/polly/speak', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			referer: 'https://streamlabs.com/'
		},
		body: JSON.stringify({
			voice,
			text
		})
	});


	if (!res.ok) {
		throw error(res.status as NumericRange<400, 599> ?? 500, 'Something went wrong :(');
	}

	const json = await res.json();

	if (json.success) {
		return new Response(JSON.stringify(json));
	}

	throw error(404, 'Something went wrong :(');
}
