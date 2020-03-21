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

  const boardIo = io.of("chat");
  boardIo.on("connect", socket => {
    const { name, room = "main" } = socket.handshake.query;
    console.log("socket: ", socket.id);

    socket.on("join", () => {
      log.success(`${name} has joined the room!!`);
      const { user, error } = addUser({ id: socket.id, name, room });

      if (error) return error;

      socket.emit("message", {
        user: user.name,
        text: `You are connected, to ${room} room.`
      });

      socket.broadcast.to(user.room).emit("message", {
        user: user.name,
        text: `Joined the room.`
      });

      socket.join(user.room);

      boardIo.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room)
      });
    });

    socket.on("sendMessage", (message, callback) => {
      const user = getUser(socket.id);
      console.log("user: ", { ...user });

      if (!user) return callback("User not found");

      const newMessage = { user: user.name, text: message, time: Date.now() };
      boardIo.to(user.room).emit("message", newMessage);

      callback();
    });

    socket.on("update", client => {
      boardIo.emit("join", `${client.name} ==> : ${client.message}`);
    });

    socket.on("disconnect", () => {
      const user = removeUser(socket.id);
      if (user) {
        const newMessage = {
          user: user.name,
          text: `Has left the room!.`,
          time: Date.now()
        };
        boardIo.to(user.room).emit("message", newMessage);

        boardIo.to(user.room).emit("roomData", {
          room: user.room,
          users: getUsersInRoom(user.room)
        });

        log.warning(`${user.name}, has left!!`);
      }
    });
  });
};

module.exports = { socketConfig };
