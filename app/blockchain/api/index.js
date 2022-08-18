const ethers = require("ethers");
const { blockchainHandler } = require("./handleEvents");
const { ClassesController, TanksController } = require("../controllers")
const classes = require("./classes.json");

const initClasses = async () => {
    await ClassesController.dropDB();
    await Promise.all(
        classes.map(async (newClass) => {
            await ClassesController.create({
                id: newClass.id,
                name: newClass.name,
                health: newClass.health,
                fireRate: newClass.fireRate,
                firePower: newClass.firePower,
                speed: newClass.speed,
                healthAdd: newClass.healthAdd,
                fireRateAdd: newClass.fireRateAdd,
                firePowerAdd: newClass.firePowerAdd,
                speedAdd: newClass.speedAdd
            })
        }));
}
const initHandler = async () => {
    // class init
    await initClasses();
    // start block handle
    blockchainHandler();
}

const tanksApi = {
    getAlltanks: async (req, res) => {
        try {
            var tanks = await TanksController.find();
            res.status(200).json({ status: true, tanks: tanks });
        } catch (err) {
            console.error("gameApi/getAlltanks : ", err.message);
            res.status(500).json({ error: err.message });
        }
    },
    getUsertanks: async (req, res) => {
        try {
            const { userAddress } = req.body;
            var tanks = await TanksController.find({ owner: userAddress });
            res.status(200).json({ status: true, tanks: tanks });
        } catch (err) {
            console.error("gameApi/getAlltanks : ", err.message);
            res.status(500).json({ error: err.message });
        }
    }
}

module.exports = { initHandler, tanksApi };