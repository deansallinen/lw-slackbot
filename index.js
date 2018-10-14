require('dotenv').config();
const { WebClient } = require('@slack/client');
const data = require('./testdata.json');

const token = process.env.SLACK_TOKEN;
const web = new WebClient(token);

const conversationId = 'GDDL2A4Q2';

const usersPromise = web.users
  .list()
  .then(res => {
    return res.members.filter(member => !member.deleted).reduce((acc, cur) => {
      return { ...acc, ...{ [cur.real_name.toLowerCase()]: cur.id } };
    }, {});
  })
  .catch(console.error);

const post = getText => async args => {
  web.chat
    .postMessage({
      channel: conversationId,
      text: await getText(args)
    })
    .then(res => {
      console.log(res);
      return res;
    })
    .catch(console.error);
};

const getUserId = async userName => {
  const users = await usersPromise;
  return users[userName.toLowerCase()];
};

// Messages to post
const unconfirmedEventText = async args => {
  const { manager, displayText, status, elementId } = args;
  const userId = await getUserId(manager);
  return `Hey ${userId}, the event <https://loungeworks.flexrentalsolutions.com/ui/goto/${elementId}|${displayText}> is still at status ${status} with less than 72 hours before the event!`;
};

const documentUpdatedText = async args => {
  const { manager, displayText, elementId } = args;
  const userId = await getUserId(manager);
  return `Hey <@U5DSN0KC3>, ${manager} uploaded a document for: <https://loungeworks.flexrentalsolutions.com/ui/goto/${elementId}|${displayText}>`;
};

const confirmedNoPullSheetText = async args => {
  const { manager, displayText, status, elementId } = args;
  const userId = await getUserId(manager);
  return `Hey ${userId}, the event <https://loungeworks.flexrentalsolutions.com/ui/goto/${elementId}|${displayText}> is ${status} without a Pull Sheet less than 72 hours before the event!`;
};

const orderReturnedText = async args => {
  const { manager, displayText, elementId } = args;
  const userId = await getUserId(manager);
  return `Hey ${userId}, the inventory for <https://loungeworks.flexrentalsolutions.com/ui/goto/${elementId}|${displayText}> has been received by yvr-warehouse!`;
};

const manifestCreatedText = async args => {
  const { manager, displayText, elementId } = args;
  const userId = await getUserId(manager);
  return `Hey ${userId}, <https://loungeworks.flexrentalsolutions.com/ui/goto/${elementId}|${displayText}> has been pulled by yvr-warehouse!`;
};

const pullSheetCreatedText = async args => {
  const { manager, displayText, elementId } = args;
  //   const userId = await getUserId(manager);
  return `Hey yvr-warehouse, the Pull Sheet is ready for <https://loungeworks.flexrentalsolutions.com/ui/goto/${elementId}|${displayText}>!`;
};

post(manifestCreatedText)({ ...data });
