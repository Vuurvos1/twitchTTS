require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const axios = require('axios');

// Setup server
let server = app.listen(process.env.PORT || 3000, () => {
  // let host = server.address().address;
  const port = server.address().port;
  console.log(`Example app listening at http://localhost:${port}`);
});

urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(express.static('web'));

// POST method route
app.post('/tts', urlencodedParser, async (req, res) => {
  try {
    res.set('Access-Control-Allow-Origin', 'http://www.localhost:3000/tts');
    res.set('Access-Control-Allow-Origin', 'http://localhost:3000/tts');
    res.set('Access-Control-Allow-Methods', 'GET, POST');
    res.set(
      'Access-Control-Allow-Headers',
      'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With'
    );

    console.log(req.query);

    // Intercept non-POST requests
    if (req.method != 'POST') {
      res.send('ok');
      return;
    }

    // Prepare request params for Streamlabs
    const voice = req.query.voice || 'Brian';
    const text = req.query.text || 'Please select a message';

    const response = await axios.post('https://streamlabs.com/polly/speak', {
      voice: voice,
      text: text,
    });

    if (response.status == 200 && response.data.success) {
      // console.log(response.data);
      res.json(response.data);
    } else {
      res.send('streamlabs brok');
    }
  } catch (err) {
    console.log(err);

    res.send('something brok');
  }
});

// try {
//   require('webwebweb').Run(11899);
// } catch (error) {
//   if (error.code === 'MODULE_NOT_FOUND') {
//     console.error('Make sure to run `npm install`');
//   } else {
//     console.error(error);
//   }
// }
