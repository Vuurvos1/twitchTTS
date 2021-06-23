require('dotenv').config();
const express = require('express');
const app = express();
const axios = require('axios');

app.use(express.static('public'));

// POST method route
app.post('/tts', async (req, res) => {
  try {
    res.set('Access-Control-Allow-Origin', 'http://www.localhost:3000/tts');
    res.set('Access-Control-Allow-Origin', 'http://localhost:3000/tts');
    res.set(
      'Access-Control-Allow-Origin',
      'https://www.twitchtts.glitch.me/tts'
    );
    res.set('Access-Control-Allow-Origin', 'https://twitchtts.glitch.me/tts');
    res.set('Access-Control-Allow-Methods', 'GET, POST');
    res.set(
      'Access-Control-Allow-Headers',
      'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With'
    );

    // Intercept non-POST requests
    if (req.method != 'POST') {
      res.send('ok');
      return;
    }

    // Prepare request params for Streamlabs
    const voice = req.query.voice || 'Brian';
    const text = req.query.text || 'Please select a message';

    const response = await axios.post('https://streamlabs.com/polly/speak', {
      voice,
      text,
    });

    if (response.status == 200 && response.data.success) {
      // console.log(response.data);
      res.json(response.data);
    } else {
      res.send('streamlabs brok');
    }
  } catch (err) {
    console.log(err);
    res.status(404).send('Something brok');
  }
});

// Setup server
const server = app.listen(process.env.PORT || 3000, () => {
  const port = server.address().port;
  console.log(`Example app listening at http://localhost:${port}`);
});
