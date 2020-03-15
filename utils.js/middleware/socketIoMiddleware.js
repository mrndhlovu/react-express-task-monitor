const socketIo = require("socket.io");
const log = require("../console-alert");
const {
  addUser,
  getUser,
  getUsersInRoom,
  removeUser
} = require("../chatRooms");

socketConfig = server => {
  const io = socketIo(server);

  const nsp = io.of("/chat");
  io.on("connect", socket => {
    const { name, room } = socket.handshake.query;

    socket.on("live", () => {
      log.success(name, "We have a live connection!!");
      socket.emit("live");
    });

    socket.on("join", callback => {
      const { name, room } = socket.handshake.query;
      log.success(`${name} has joined the room!!`);

      const { user, error } = addUser({ id: socket.id, name, room });

      if (error) return callback(error);

      socket.emit("message", {
        user: user.name,
        text: `${user.name} you have joined ${user.room} room.`
      });

      socket.broadcast
        .to(user.room)
        .emit("message", `${user.name} has joined the ${user.room} room.`);

      socket.join(user.room);
      callback();
    });

    socket.on("sendMessage", (message, callback) => {
      console.log("message: ", message);
      const user = getUser(socket.id);
      console.log("user: ", { ...user });
      if (user)
        io.to(user.room).emit("message", { user: user.name, text: message });

      callback();
    });

    socket.on("update", client => {
      io.emit("join", `${client.name} ==> : ${client.message}`);
    });

    socket.on("disconnect", () => {
      const { name, room } = socket.handshake.query;

      log.warning(name, "disconnect: Connection is disabled!!");
      io.emit("join", "Someone has left the room!!");
    });
  });
};

module.exports = { socketConfig };
