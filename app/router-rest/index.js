// by Logan <https://github.com/loganworld>
// at 19/08/2022
const UserApi = require("../auth/api");
const { initHandler } = require("../blockchain/api");
const gameApi = require("../game/api");
initHandler();

module.exports = (router) => {
    // User API
    router.post("/auth/signup", UserApi.signUp);
    router.post("/auth/login", UserApi.logIn);
    router.post("/tanks/all-tanks", gameApi.getAlltanks);
    router.post("/tanks/user-tanks", gameApi.getUsertanks);
    router.post("/tanks/get-tanks", gameApi.getTanks);

    router.post("/tanks/get-sign", gameApi.getUpgradeSign);

    router.post("/tanks/:id", gameApi.metadata);
};