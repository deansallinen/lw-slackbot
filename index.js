const data = require('./testdata.json');
const messages = require('./messages');
const { post } = require('./postMessage');

post(messages.manifestCreatedText)({ ...data });
