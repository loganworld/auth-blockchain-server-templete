// by Logan <https://github.com/loganworld>
// at 19/08/2022

const { BlockNumbers, NFTTanks, Classes } = require("./models");
const ethers = require("ethers");

const BlockNumController = {
  create: async (props) => {
    const { id, latestBlock } = props;
    var result = await BlockNumbers.findOne({ id: id });
    if (!result) {
      const newData = new BlockNumbers({
        id: id,
        latestBlock: latestBlock,
      });
      result = await newData.save();
    } else {
      result.latestBlock = latestBlock;
      await result.save();
    }
    return result;
  },
  find: async (filter) => {
    return await BlockNumbers.findOne(filter);
  },
  update: async (filter, newData) => {
    return await BlockNumbers.updateOne(
      filter,
      { $set: newData }
    );
  },
  remove: async (filter) => {
    return await BlockNumbers.findOneAndDelete(
      filter
    );
  }
};

const TanksController = {
  create: async (props) => {
    const {
      id,
      owner,
      level,
      classType,
      health,
      fireRate,
      firePower,
      speed,
    } = props;
    var result = await NFTTanks.findOne({ id: id });
    if (!result) {
      const newData = new NFTTanks({
        id,
        owner,
        level: 0,
        classType,
        energy: health * 100,
        experience: 0,
        health,
        fireRate,
        firePower,
        speed,
        borrower: owner
      });
      result = await newData.save();
    }
    return result;
  },
  find: async (filter) => {
    return await NFTTanks.findOne(filter);
  },
  finds: async (filter) => {
    return await NFTTanks.find(filter);
  },
  update: async (filter, newData) => {
    return await NFTTanks.updateOne(
      filter,
      { $set: newData }
    );
  },
  upgrade: async (filter, newData) => {
    return await NFTTanks.updateOne(
      filter,
      { $inc: newData }
    );
  },
  remove: async (filter) => {
    return await NFTTanks.findOneAndDelete(
      filter
    );
  },
  // update Energy
  updateEnergy: async (filter) => {
    var tank = await NFTTanks.findOne(filter);
    //update energy
    var now = Date.now();
    var from = new Date(tank.updatedAt);
    var duration = (now - from) / 1000;
    var chargedEnergy = duration * (tank.energyPool + 100) * 10 / 24 / 3600; // duration * (energyPool + init recover power)*changeRate
    var newEnergy = tank.energy + chargedEnergy;
    var maxEnergy = (tank.energyPool + 100) * 10;
    newEnergy = newEnergy > maxEnergy ? maxEnergy : newEnergy;
    tank.energy = Math.round(newEnergy);
    await tank.save();
  },
  // update all tank energy
  updateAllTankEnergy: async () => {
    var tanks = await NFTTanks.find({});
    //update energy
    tanks.map((tank) => {
      var now = Date.now();
      var from = new Date(tank.updatedAt);
      var duration = (now - from) / 1000;
      var chargedEnergy = duration * (tank.energyPool + 100) * 10 / 24 / 3600; // duration * (energyPool + init recover power)*changeRate
      var newEnergy = tank.energy + chargedEnergy;
      var maxEnergy = (tank.energyPool + 100) * 10;
      newEnergy = newEnergy > maxEnergy ? maxEnergy : newEnergy;
      tank.energy = Math.round(newEnergy);
      tank.save();
    })
  },
  // update level
  updateLevel: async (filter) => {
    var tank = await NFTTanks.findOne(filter);
    var tankClassType = await Classes.findOne({ id: tank.classType });
    //update level
    var newLevel = Math.floor(Math.sqrt((tank.experience) / 100));
    if (newLevel <= tank.level) return;

    tank.health += tankClassType.healthAdd * (newLevel - tank.level);
    tank.fireRate -= tankClassType.fireRateAdd * (newLevel - tank.level);
    if (tank.fireRate <= 40) tank.fireRate = 40;
    tank.firePower += tankClassType.firePowerAdd * (newLevel - tank.level);
    tank.speed += tankClassType.speedAdd * (newLevel - tank.level);
    tank.level = newLevel;
    await tank.save();
  },
  // get sign for upgrade NFT
  getUpgradeSign: async (filter) => {
    var tank = await NFTTanks.findOne(filter);
    var availableLevel = Math.floor(tank.tankLevel);
    var signer = new ethers.Wallet(process.env.ADMINWALLET);
    let messageHash = ethers.utils.solidityKeccak256(
      ["uint", "uint"],
      [tank.id, availableLevel]
    );
    let signature = await signer.signMessage(
      ethers.utils.arrayify(messageHash)
    );
    return signature;
  }
};

const ClassesController = {
  create: async (props) => {
    const {
      id,
      name,
      health,
      fireRate,
      firePower,
      speed,
      healthAdd,
      fireRateAdd,
      firePowerAdd,
      speedAdd
    } = props;
    var result = await Classes.findOne({ id: id });
    if (!result) {
      const newData = new Classes({
        id,
        name,
        health,
        fireRate,
        firePower,
        speed,
        healthAdd,
        fireRateAdd,
        firePowerAdd,
        speedAdd
      });
      result = await newData.save();
    }
    return result;
  },
  find: async (filter) => {
    return await Classes.findOne(filter);
  },
  finds: async (filter) => {
    return await Classes.find(filter);
  },
  update: async (filter, newData) => {
    return await Classes.updateOne(
      filter,
      { $set: newData }
    );
  },
  remove: async (filter) => {
    return await Classes.findOneAndDelete(
      filter
    );
  },
  dropDB: async () => {
    return await Classes.deleteMany({});
  }
};

module.exports = { BlockNumController, TanksController, ClassesController };

