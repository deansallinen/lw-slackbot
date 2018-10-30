const { web } = require('./web');

const conversationId = 'GDDL2A4Q2';

const post = getText => async (args) => {
  web.chat
    .postMessage({
      channel: conversationId,
      text: await getText(args),
    })
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch(console.error);
};

module.exports = {
  post,
};
