export async function post({ request }) {
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
		return {
			status: 200,
			body: json
		};
	}

	return {
		status: 404,
		body: 'something went wrong :('
	};
}
