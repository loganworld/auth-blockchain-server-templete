const { ethers } = require("ethers");
const {
    provider,
    multicallProvider,
    NFTTANK,
    EnergyPool,
    TANKTOKEN
} = require("../contracts");
const { BlockNumController, TanksController, ClassesController } = require("../controllers");
const { handleEvent, fromBigNum } = require("../utils");

const blockchainHandler = async () => {
    try {
        /**
         * Handle transfer event, mint + transfer
         * Event : "Transfer"
         * @param {from,to,tokenId} tx 
         * @param {Transfer} id 
         */
        const transferHandler = async (tx, id) => {
            let txData = {
                from: tx.args.from,
                to: tx.args.to,
                tokenId: fromBigNum(tx.args.tokenId, 0)
            };
            if (txData.from == ethers.constants.AddressZero) {
                //mint 
                const classType = await NFTTANK.classInfos(txData.tokenId);
                const tankType = await ClassesController.find({ id: String(classType.id) });
                if (!tankType) throw new Error("blockchainHandler/transferHandler :invalid type ");
                await TanksController.create({
                    id: txData.tokenId,
                    owner: txData.to,
                    classType: classType.id,
                    health: tankType.health,
                    fireRate: tankType.fireRate,
                    firePower: tankType.firePower,
                    speed: tankType.speed
                })
            } else {
                //transfer
                await TanksController.update({ id: txData.tokenId }, { owner: txData.to });
            }
        }
        /**
         * handle level upgrade
         * Event : "LevelUpgrade"
         * @param {tokenId, level} tx
         * @param {"LevelUpgrade"} id
         */
        const upgradeHandler = async (tx, id) => {
            let txData = {
                tokenId: fromBigNum(tx.args.tokenId, 0),
                newLevel: Number(tx.args.level)
            };
            await TanksController.upgrade({ id: txData.tokenId }, { level: txData.newLevel * 10 });
        }
        /**
         * handle stake and unstake
         * Event : "TransferSingle"
         * @param {from, to, id, value} tx
         * @param {"TransferSingle"} id
         */
        const stakeHandler = async (tx, id) => {
            let txData = {
                from: tx.args.from,
                to: tx.args.to,
                tokenId: fromBigNum(tx.args.tokenId, 0),
                amount: fromBigNum(tx.args.value, 18)
            };
            if (txData.from == ethers.constants.AddressZero) {
                // stake 
                var tank = await TanksController.find({ id: txData.tokenId });
                await TanksController.update({ id: txData.tokenId }, { energyPool: tank.energyPool + txData.amount });
            } else if (txData.to == ethers.constants.AddressZero) {
                // unstake 
                var tank = await TanksController.find({ id: txData.tokenId });
                await TanksController.update({ id: txData.tokenId }, { energyPool: tank.energyPool - txData.amount })
            }
        }

        const handleStart = async () => {
            handleEvent({
                id: "Transfer",
                provider: provider,
                contract: NFTTANK,
                event: "Transfer",
                times: 15,
                handler: transferHandler,
                BlockNumController: BlockNumController,
            });
            handleEvent({
                id: "LevelUpgrade",
                provider: provider,
                contract: NFTTANK,
                event: "LevelUpgrade",
                times: 15,
                handler: upgradeHandler,
                BlockNumController: BlockNumController,
            });
            handleEvent({
                id: "TransferSingle",
                provider: provider,
                contract: EnergyPool,
                event: "TransferSingle",
                times: 15,
                handler: stakeHandler,
                BlockNumController: BlockNumController,
            });
        }
        handleStart();
    } catch (err) {
        console.log("blockchainhandler : ", err.message);
    }
}

module.exports = { blockchainHandler };