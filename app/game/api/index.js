// by Logan <https://github.com/loganworld>
// at 19/08/2022
const jwt = require("jsonwebtoken");
const { TanksController } = require("../../blockchain/controllers");

const gameApi = {
    /**
     * get all tanks
     * @param {*} req 
     * @param {*} res 
     */
    getAlltanks: async (req, res) => {
        try {
            var tanks = await TanksController.finds({});
            res.status(200).json({ status: true, tanks: tanks });
        } catch (err) {
            console.error("gameApi/getAlltanks : ", err.message);
            res.status(500).json({ error: err.message });
        }
    },
    /**
     * get all tanks that owned by user
     * @param {userAddress:Address} req 
     * @param {*} res 
     */
    getUsertanks: async (req, res) => {
        try {
            const { userAddress } = req.body;
            var tanks = await TanksController.finds({ owner: String(userAddress).toUpperCase() });
            res.status(200).json({ status: true, tanks: tanks });
        } catch (err) {
            console.error("gameApi/getAlltanks : ", err.message);
            res.status(500).json({ error: err.message });
        }
    },
    /**
     * get tank infos with ids
     * @param {ids:Array<int>} req 
     * @param {*} res 
     */
    getTanks: async (req, res) => {
        try {
            const { ids } = req.body;
            var tanks = [];
            for (var i = 0; i < ids.length; i++) {
                var tank = await TanksController.find({ id: ids[i] });
                tanks.push(tank);
            }
            res.status(200).json({ status: true, tanks: tanks });
        } catch (err) {
            console.error("gameApi/getTanks : ", err.message);
            res.status(500).json({ error: err.message });
        }
    },
    /**
     * get metadata of token
     * @param {params:{id:sting}} req 
     * @param {*} res 
     */
    metadata: async (req, res) => {
        try {
            var id = req.params.id;
            var tank = await TanksController.find({ id: id });
            res.json({
                "image": tank.image,
                "name": tank.name,
                "description": tank.description,
                "owner": tank.owner,
                attributes: [
                    {
                        trait_type: "health",
                        value: `${tank.health} + ${tank.healthAdd}`,
                    },
                    {
                        trait_type: "fireRate",
                        value: `${tank.fireRate} + ${tank.fireRateAdd}`,
                    },
                    {
                        trait_type: "firePower",
                        value: `${tank.firePower} + ${tank.firePowerAdd}`,
                    },
                    {
                        trait_type: "speed",
                        value: `${tank.speed} + ${tank.speedAdd}`,
                    },
                ]
            })
        } catch (err) {
            res.json({
                "image": "",
                "name": "invalid id",
                "description": "invalid item"
            })
        }
    },
    /**
     * get sign for upgrade NFT
     * @param {tokenId} req 
     * @param {*} res 
     */
    getUpgradeSign: async (req, res) => {
        try {
            const { id } = req.body;
            var sign = await TanksController.getUpgradeSign({ id: id });
            res.status(200).json({ status: true, sign: sign });
        } catch (err) {
            console.error("gameApi/getUpgradeSign : ", err.message);
            res.status(500).json({ error: err.message });
        }
    }
}

module.exports = gameApi;