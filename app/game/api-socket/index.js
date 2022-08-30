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

        socket.on(securityCode['getEnegy'], async (req) => {
            try {
                const { socketID, nft_id, level} = decryptToJson(req.data);
                var user = global.users[socketID];
                const tank = await TanksController.find({ owner: user.address.toUpperCase(), _id: nft_id })
                socket.emit(securityCode["update-tank-energy"], {
                    data: encryptFromJson({
                        energy: tank.energy
                    })
                });
            } catch (err) {
                console.log("game/api-socket/addExperience: ", err.message);
                socket.emit(securityCode["error"], { data: encryptFromJson({ error: err.message }) });
            }
        });
        /**
         * get all tanks 
         * @param {String} socketId
         */
        socket.on(securityCode['getUsertanks'], async (req) => {
            try {
                var data = decryptToJson(req.data);
                var { socketId } = data;
                // get user info
                var user = global.users[socketId];
                var tanks = await TanksController.finds({ owner: String(user.address).toUpperCase() });
                var sendDataList = [];
                for(const i of tanks){
                    const tank = await TanksController.updateEnergy({_id : i._id});
                }
                tanks = await TanksController.finds({ owner: String(user.address).toUpperCase() });
                tanks.forEach(i => {
                    const tank = {
                        _id: i._id,
                        ownerNickName: user.name,
                        classType: i.classType,
                        experience: i.experience,
                        tankLevel: i.level,
                        health: i.health,
                        fireRate: i.fireRate,
                        firePower: i.firePower,
                        speed: i.speed,
                        energyPool : i.energyPool,
                        energy : i.energy
                    }
                    sendDataList.push(tank);
                });
                socket.emit(securityCode["user-tanks"], { data: encryptFromJson({ tanks: sendDataList }) });
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
                const { socketID, nft_id, level} = decryptToJson(req.data);
                let exp = (level + 1) * 10;
                var user = global.users[socketID];
                await TanksController.upgrade({ owner: user.address.toUpperCase(), _id: nft_id }, { experience: exp });
                await TanksController.updateLevel({ owner: user.address.toUpperCase(), _id: nft_id })
                const UpdatedTank = await TanksController.find({ owner: user.address.toUpperCase(), _id: nft_id })
                socket.emit(securityCode["update-tank"], {
                    data: encryptFromJson({
                        _id: UpdatedTank._id,
                        ownerNickName: user.name,
                        classType: UpdatedTank.classType,
                        experience: UpdatedTank.experience,
                        tankLevel: UpdatedTank.level,
                        health: UpdatedTank.health,
                        fireRate: UpdatedTank.fireRate,
                        firePower: UpdatedTank.firePower,
                        speed: UpdatedTank.speed,
                        energyPool :UpdatedTank.energyPool,
                        energy : UpdatedTank.energy
                    })
                });
            } catch (err) {
                console.log("game/api-socket/addExperience: ", err.message);
                socket.emit(securityCode["error"], { data: encryptFromJson({ error: err.message }) });
            }
        });
        socket.on(securityCode['killed'], async (req) => {
            try {
                const { socketID, nft_id, level } = decryptToJson(req.data);
                var user = global.users[socketID];
                const tank = await TanksController.updateEnergy({ owner: user.address.toUpperCase(), _id: nft_id });
                await TanksController.upgrade({ owner: user.address.toUpperCase(), _id: nft_id }, {energy: -1 * tank.health });
                const UpdatedTank = await TanksController.find({ owner: user.address.toUpperCase(), _id: nft_id })
                socket.emit(securityCode["killed"], {
                    data: encryptFromJson({
                        _id: UpdatedTank._id,
                        ownerNickName: user.name,
                        classType: UpdatedTank.classType,
                        experience: UpdatedTank.experience,
                        tankLevel: UpdatedTank.level,
                        health: UpdatedTank.health,
                        fireRate: UpdatedTank.fireRate,
                        firePower: UpdatedTank.firePower,
                        speed: UpdatedTank.speed,
                        energyPool : UpdatedTank.energyPool,
                        energy : UpdatedTank.energy
                    })
                });
            } catch (err) {
                console.log("game/api-socket/killed: ", err.message);
                socket.emit(securityCode["error"], { data: encryptFromJson({ error: err.message }) });
            }
        });
    })
}


module.exports = GameLisnter;