const { TanksController, AdminSettingController } = require("../controllers");

const cron = require("node-cron");
const UserController = require("../../auth/controller");
const { toBigNum } = require("../utils");
const { RewardPool, TANKTOKEN } = require("../contracts");

const rewardAmounts = [3000, 2700, 2400, 2100, 1800, 1500, 1200, 900, 600, 300];

const rewardHandler = async () => {
    await AdminSettingController.create({ type: "lastReward", value: new Date().toString() });

    const rewardHandle = async () => {
        try {
            console.log(`running a reward  every day`);
            var users = await UserController.findsWithSort({}, { merit: 1 });
            users.splice(10);
            let rewardUsers = users.filter((user) => user.merit > 0);
            // proceed reward
            const rewardUserAddresses = [];
            const rewardUserAmounts = [];
            rewardUsers.map((rewardUser, index) => {
                rewardUserAddresses.push(rewardUser.address);
                rewardUserAmounts.push(toBigNum(rewardAmounts[index]));
            })

            // remove merit for rewarded users
            if (rewardUsers.length == 0) return;
            var tx = await RewardPool.multiSendToken(TANKTOKEN.address, rewardUserAddresses, rewardUserAmounts);
            await tx.wait();

            console.log("reward tx", tx.hash);

            rewardUsers.map((rewardUser) => {
                UserController.update({ address: rewardUser.address }, { merit: 0 });
            });

            await AdminSettingController.update({ type: "lastReward" }, { value: new Date().toString() });
        } catch (err) {
            console.log('blockchain/api/rewardHandler', err.message);
        }
    }
    cron.schedule(`0 0 0 * * *`, rewardHandle, { timezone: "Etc/GMT+0" });
}

const energyUpdateHandler = async () => {
    cron.schedule(`*/30 * * * * *`, async () => {
        console.log(`running a dbUpdator  every 30 second`);
        await TanksController.updateAllTankEnergy();
    });
}

const dbUpdator = async () => {
    try {
        energyUpdateHandler();
        rewardHandler();
    } catch (err) {
        console.log("blockchain/api/dbupdator", err.message)
    }
}

module.exports = { dbUpdator };