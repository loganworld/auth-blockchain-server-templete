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
        const { socketID, nft_id, level } = decryptToJson(req.data);
        var user = global.users[socketID];
        const tank = await TanksController.find({ id: nft_id })
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
        var tanks = await TanksController.finds({ borrower: String(user.address).toUpperCase() });
        var sendDataList = [];
        for (const i of tanks) {
          await TanksController.updateEnergy({ id: i.id });
        }
        tanks = await TanksController.finds({ borrower: String(user.address).toUpperCase() });
        tanks.forEach(i => {
          const tank = {
            id: i.id,
            ownerNickName: user.name,
            classType: i.classType,
            experience: i.experience,
            tankLevel: i.tankLevel,
            health: i.health,
            fireRate: i.fireRate,
            firePower: i.firePower,
            speed: i.speed,
            energyPool: Math.round(i.energyPool),
            energy: Math.round(i.energy)
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
        const { socketID, nft_id, level } = decryptToJson(req.data);
        let exp = (level + 1) * 1000;
        var user = global.users[socketID];
        await TanksController.upgrade({ id: nft_id }, { experience: exp });
        await TanksController.updateLevel({ id: nft_id })
        const UpdatedTank = await TanksController.find({ id: nft_id })
        socket.emit(securityCode["update-tank"], {
          data: encryptFromJson({
            id: UpdatedTank.id,
            ownerNickName: user.name,
            classType: UpdatedTank.classType,
            experience: UpdatedTank.experience,
            tankLevel: UpdatedTank.tankLevel,
            health: UpdatedTank.health,
            fireRate: UpdatedTank.fireRate,
            firePower: UpdatedTank.firePower,
            speed: UpdatedTank.speed,
            energyPool: Math.round(UpdatedTank.energyPool),
            energy: Math.round(UpdatedTank.energy)
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
        const tank = await TanksController.updateEnergy({ id: nft_id });
        
        if (Number(tank.energy) > Number(tank.health))
          await TanksController.upgrade({ id: nft_id }, { energy: -1 * tank.health });
        const UpdatedTank = await TanksController.find({ id: nft_id })
        socket.emit(securityCode["killed"], {
          data: encryptFromJson({
            id: UpdatedTank.id,
            ownerNickName: user.name,
            classType: UpdatedTank.classType,
            experience: UpdatedTank.experience,
            tankLevel: UpdatedTank.tankLevel,
            health: UpdatedTank.health,
            fireRate: UpdatedTank.fireRate,
            firePower: UpdatedTank.firePower,
            speed: UpdatedTank.speed,
            energyPool: Math.round(UpdatedTank.energyPool),
            energy: Math.round(UpdatedTank.energy)
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