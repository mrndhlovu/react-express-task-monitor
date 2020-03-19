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

  const nsp = io.of("chat");
  nsp.on("connect", socket => {
    const { name, room = "main" } = socket.handshake.query;
    console.log("socket: ", socket.id);

    socket.on("join", () => {
      log.success(`${name} has joined the room!!`);

      const { user, error } = addUser({ id: socket.id, name, room });

      if (error) return error;

      socket.emit("message", {
        user: user.name,
        text: `${user.name} you are connected, now pick a room.`
      });

      socket.broadcast
        .to(user.room)
        .emit("message", `${user.name} has joined the ${user.room} room.`);

      socket.join(user.room);
    });

    socket.on("sendMessage", (message, callback) => {
      const user = getUser(socket.id);
      console.log("user: ", { ...user });

      if (!user) return callback({ error: "User not found" });
      const newMessage = { user: user.name, text: message, time: Date.now() };
      io.to(user.room).emit("message", newMessage);
      socket.emit("message", newMessage);
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user, room)
      });

      callback();
    });

    socket.on("update", client => {
      io.emit("join", `${client.name} ==> : ${client.message}`);
    });

    socket.on("disconnect", () => {
      const user = removeUser(socket.id);
      if (user) {
        io.to(user.room).emit("message", `${user.name} has left.`);
        io.to(user.room).emit("roomData", {
          room: user.room,
          users: getUsersInRoom(user, room)
        });
        io.emit("roomData", `${user.room} has left.`);
        log.warning(`${user.name}, has left!!`);
      }
    });
  });
};

module.exports = { socketConfig };
