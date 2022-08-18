const jwt = require("jsonwebtoken");
const ethers = require("ethers");
const { TanksController } = require("../../blockchain/controllers");

const gameApi = {
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

module.exports = gameApi;