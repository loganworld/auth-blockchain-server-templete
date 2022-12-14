// by Logan <https://github.com/loganworld>
// at 19/08/2022

const { ethers } = require("ethers");
const {
  provider,
  multicallProvider,
  NFTTANK,
  EnergyPool,
  TANKTOKEN
} = require("../contracts");
const { BlockNumController, TanksController, ClassesController } = require("../controllers");
const { handleEvent, fromBigNum, toBigNum } = require("../utils");

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
        var tankInfo;
        //temp
        if (txData.isTempType != undefined) tankInfo = { class: txData.isTempType };
        else tankInfo = await NFTTANK.tanks(txData.tokenId);
        //mint 
        const tankType = await ClassesController.find({ id: String(tankInfo.class) });
        if (!tankType) throw new Error("blockchainHandler/transferHandler :invalid type ");
        await TanksController.create({
          id: txData.tokenId,
          owner: String(txData.to).toUpperCase(),
          classType: tankType.id,

          name: "tank" + txData.tokenId,
          image: tankType.image,
          description: tankType.description,
          health: tankType.health,
          fireRate: tankType.fireRate,
          firePower: tankType.firePower,
          speed: tankType.speed,
          borrower: String(txData.to).toUpperCase()
        })
      } else {
        //transfer
        await TanksController.update({ id: txData.tokenId }, { owner: String(txData.to).toUpperCase(), borrower: String(txData.to).toUpperCase() });
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
      await TanksController.update({ id: txData.tokenId }, {
        level: txData.newLevel,
        maxEnergyPool: txData.newLevel * 1000
      });
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
        tokenId: fromBigNum(tx.args.id, 0),
        amount: fromBigNum(tx.args.value, 18)
      };
      await TanksController.updateEnergy({ id: txData.tokenId });
      var totalStake = await EnergyPool.supplies(tx.args.id);
      await TanksController.update(
        { id: txData.tokenId },
        {
          energyPool: Number(fromBigNum(totalStake, 18)),
          maxEnergy: Number(fromBigNum(totalStake, 18)) * 0.2 + 1000,
        });
      await TanksController.updateEnergy({ id: txData.tokenId });
    }

    const handleStart = () => {
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

    const demo = async () => {
      await transferHandler({
        args: {
          from: ethers.constants.AddressZero,
          to: "0xfB4d81A31BcBC5E2024f6c4247DD2Ce913bd7c95",
          tokenId: toBigNum(0, 0),
          isTempType: 1
        }
      })
      await transferHandler({
        args: {
          from: ethers.constants.AddressZero,
          to: "0xfB4d81A31BcBC5E2024f6c4247DD2Ce913bd7c95",
          tokenId: toBigNum(1, 0),
          isTempType: 2
        }
      })
      await transferHandler({
        args: {
          from: ethers.constants.AddressZero,
          to: "0xfB4d81A31BcBC5E2024f6c4247DD2Ce913bd7c99",
          tokenId: toBigNum(2, 0),
          isTempType: 2
        }
      })
      await stakeHandler({
        args: {
          from: ethers.constants.AddressZero,
          to: "0xfB4d81A31BcBC5E2024f6c4247DD2Ce913bd7c95",
          id: toBigNum(0, 0),
          value: toBigNum("100", 18)
        }
      })
      await stakeHandler({
        args: {
          from: "0xfB4d81A31BcBC5E2024f6c4247DD2Ce913bd7c95",
          to: ethers.constants.AddressZero,
          id: toBigNum(0, 0),
          value: toBigNum("100", 18)
        }
      })
    }
    // await demo();
  } catch (err) {
    console.log("blockchainhandler : ", err.message);
  }
}

module.exports = { blockchainHandler };