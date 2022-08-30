// by Logan <https://github.com/loganworld>
// at 19/08/2022

const { TanksController } = require("../../blockchain/controllers");
const { encryptFromJson, decryptToJson, securityCode } = require("../../utils");

/**
 * game socket module
 * @param {socket io} io 
 * @param {*} userMiddleware 
 */
const GameLisnter = (io, userMiddleware) => {
    io.on("connection", async (socket) => {
        console.log('game socket connected: ', socket.id);

        /**
         * get all tanks 
         */
        socket.on(securityCode['getAlltanks'], async (req) => {
            try {
                var tanks = await TanksController.finds({});
                socket.emit(securityCode["all-tanks"], { data: encryptFromJson({ tanks: tanks }) });
            } catch (err) {
                console.log("game/api-socket/gameLisnter: ", err.message);
                socket.emit(securityCode["error"], { data: encryptFromJson({ error: err.message }) });
            }
        });
        /**
         * get all tanks 
         * @param {String} socketId
         */
        socket.on(securityCode['getUsertanks'], async (req) => {
            try {
                var { socketId } = decryptToJson(req);
                // get user info
                var user = global.users[socketId];
                var tanks = await TanksController.finds({ owner: String(user.address).toUpperCase() });
                socket.emit(securityCode["user-tanks"], { data: encryptFromJson({ tanks: tanks }) });
            } catch (err) {
                console.log("game/api-socket/gameLisnter: ", err.message);
                socket.emit(securityCode["error"], { data: encryptFromJson({ error: err.message }) });
            }
        });
        /**
         * get all tanks 
         * @param {String} id // tank id
         * @param {exp} id // tank id
         */
        socket.on(securityCode['addExperience'], async (req) => {
            try {
                const { id, exp } = decryptToJson(req);
                await TanksController.upgrade({ id: id }, { $inc: { experience: exp } });
                await TanksController.updateLevel({ id: id })
            } catch (err) {
                console.log("game/api-socket/addExperience: ", err.message);
                socket.emit(securityCode["error"], { data: encryptFromJson({ error: err.message }) });
            }
        });
        socket.on(securityCode['killed'], async (req) => {
            try {
                const { id } = decryptToJson(req);
                var tank = await TanksController.updateEnergy();
                await TanksController.upgrade({ id: id }, { $inc: { energy: -1 * tank.health } });
            } catch (err) {
                console.log("game/api-socket/killed: ", err.message);
                socket.emit(securityCode["error"], { data: encryptFromJson({ error: err.message }) });
            }
        });
    })
}

module.exports = GameLisnter;