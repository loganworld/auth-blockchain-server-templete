const { AuthLisnter, userMiddleware } = require("../auth/api-socket");
const GameLisnter = require("./game");

const SocketLisnter = (io) => {
    AuthLisnter(io);
    GameLisnter(io, userMiddleware);
}

module.exports = SocketLisnter;