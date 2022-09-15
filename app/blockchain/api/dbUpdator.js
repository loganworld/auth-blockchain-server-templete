const { TanksController } = require("../controllers");

const cron = require("node-cron");
const dbUpdator = async () => {
  try {
    cron.schedule(`*/30 * * * * *`, async () => {
      console.log(`running a dbUpdator  every 30 second`);
      await TanksController.updateAllTankEnergy();
    });
  } catch (err) {
    console.log("blockchain/api/dbupdator", err.message)
  }
}

module.exports = { dbUpdator };