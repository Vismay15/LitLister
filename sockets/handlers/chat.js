const emit = sockets => (sid, rid, crid, message) => {
  const senderSocket = sockets.get(sid.toString());
  const receiverSocket = sockets.get(rid.toString());
  if (senderSocket) {
    senderSocket.emit(`chat:${crid}`, message);
  }
  if (receiverSocket) {
    receiverSocket.emit(`chat:${crid}`, message);
  }
};

module.exports = sockets => ({
  emit: emit(sockets)
});
