// Messages to post
const { getUserId } = require('./getUsers');

const unconfirmedEventText = async (args) => {
  const {
    manager, displayText, status, elementId,
  } = args;
  const userId = await getUserId(manager);
  return `Hey ${userId}, the event <https://loungeworks.flexrentalsolutions.com/ui/goto/${elementId}|${displayText}> is still at status ${status} with less than 72 hours before the event!`;
};

const documentUpdatedText = async (args) => {
  const { manager, displayText, elementId } = args;
  const userId = await getUserId(manager);
  return `Hey ${userId}, ${manager} uploaded a document for: <https://loungeworks.flexrentalsolutions.com/ui/goto/${elementId}|${displayText}>`;
};

const confirmedNoPullSheetText = async (args) => {
  const {
    manager, displayText, status, elementId,
  } = args;
  const userId = await getUserId(manager);
  return `Hey ${userId}, the event <https://loungeworks.flexrentalsolutions.com/ui/goto/${elementId}|${displayText}> is ${status} without a Pull Sheet less than 72 hours before the event!`;
};

const orderReturnedText = async (args) => {
  const { manager, displayText, elementId } = args;
  const userId = await getUserId(manager);
  return `Hey ${userId}, the inventory for <https://loungeworks.flexrentalsolutions.com/ui/goto/${elementId}|${displayText}> has been received by yvr-warehouse!`;
};

const manifestCreatedText = async (args) => {
  const { manager, displayText, elementId } = args;
  const userId = await getUserId(manager);
  return `Hey ${userId}, <https://loungeworks.flexrentalsolutions.com/ui/goto/${elementId}|${displayText}> has been pulled by yvr-warehouse!`;
};

const pullSheetCreatedText = async (args) => {
  const { displayText, elementId } = args;
  return `Hey yvr-warehouse, the Pull Sheet is ready for <https://loungeworks.flexrentalsolutions.com/ui/goto/${elementId}|${displayText}>!`;
};

module.exports = {
  unconfirmedEventText,
  documentUpdatedText,
  confirmedNoPullSheetText,
  orderReturnedText,
  manifestCreatedText,
  pullSheetCreatedText,
};
