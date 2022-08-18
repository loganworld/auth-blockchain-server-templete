const UserApi = require("../auth/api");
const {initHandler, tanksApi} = require("../blockchain/api");
initHandler();

module.exports = (router) => {
    // User API
    router.post("/auth/signup", UserApi.signUp);
    router.post("/auth/login", UserApi.logIn);
    router.post("/tanks/all-tanks", tanksApi.getAlltanks);
    router.post("/tanks/user-tanks", tanksApi.getUsertanks);
};