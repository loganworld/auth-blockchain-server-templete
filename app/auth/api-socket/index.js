const jwt = require("jsonwebtoken");
const ethers = require("ethers");
const UserController = require("../controller");
const { getHash } = require("../utils")

//login, disconnect, autoLogin

const userMiddleware = async (socket, req) => {
    if (!global.users[socket.id]) {
        socket.emit("authError");
        return null;
    }
    const Result = await UserController.find({
        name: global.users[socket.id].name
    });
    global.users[socket.id] = Result._doc;
    return global.users[socket.id];
};

const AuthLisnter = (io) => {
    global.users = [];
    io.on("connection", async (socket) => {
        console.log('socket connected: ', socket.id);
        socket.on('disconnect', () => {
            if (!global.users[socket.id])
                delete global.users[socket.id];
            console.log('socket disconnected: ' + socket.id);
        });
        socket.on('login', async (req) => {
            try {
                const { name, password } = req;
                const hashedPassword = getHash(name, password);
                var userData = await UserController.find({ name: name });
                if (!userData) throw new Error("Invalid username");
                if (userData.password != hashedPassword) throw new Error("Invalid password");

                global.users[socket.id] = userData;

                const token = jwt.sign({
                    name: userData.name,
                    address: userData.address,
                    email: userData.email
                }, process.env.TOKEN_SECRET, {
                    expiresIn: "144h",
                });
                socket.emit('loginSuccess', { token: token });
            } catch (err) {
                console.error("Auth/logIn : ", err.message);
                socket.emit('loginError', err.message)
            }
        })
    })
}

module.exports = { AuthLisnter, userMiddleware };
