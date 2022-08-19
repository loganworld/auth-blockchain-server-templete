// by Logan <https://github.com/loganworld>
// at 19/08/2022

const jwt = require("jsonwebtoken");
const ethers = require("ethers");
const UserController = require("../controller");
const { getHash } = require("../utils")

const AuthApi = {
    signUp: async (req, res) => {
        try {
            const { name, email, password, signature } = req.body;
            var address = "";
            try {
                address = await ethers.utils.verifyMessage("welcome " + name, signature);
            } catch (err) {
                throw new Error("Invalid signature");
            }
            const hashedPassword = getHash(name, password);

            // create user data 
            var userData = await UserController.create({ name, email, hashedPassword, address });

            // return jwt token for auth
            const token = jwt.sign({
                name: userData.name,
                address: userData.address,
                email: userData.email
            }, process.env.TOKEN_SECRET, {
                expiresIn: "144h",
            });
            res.status(200).json({ status: true, token: token });
        } catch (err) {
            console.error("Auth/signUp : ", err.message);
            res.status(500).json({ error: err.message });
        }
    },
    logIn: async (req, res) => {
        try {
            const { name, password } = req.body;
            var userData;
            try {
                if (!name) throw new Error("invalid username");
                userData = await UserController.find({ name: name });
                if (!userData) throw new Error("user data isn't exist");
            } catch (err) {
                throw new Error("Invalid username");
            }

            try {
                const hashedPassword = getHash(name, password);
                if (userData.password != hashedPassword) throw new Error("Invalid password");
            } catch (err) {
                throw new Error("Invalid password");
            }

            const token = jwt.sign({
                name: userData.name,
                address: userData.address,
                email: userData.email
            }, process.env.TOKEN_SECRET, {
                expiresIn: "144h",
            });
            res.status(200).json({ status: true, token: token });
        } catch (err) {
            console.error("Auth/logIn : ", err.message);
            res.status(500).json({ error: err.message });
        }
    },
    middleware: async (req, res, next) => {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[0];
        if (token == null) return res.sendStatus(401);
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, user) => {
            console.error("Auth/middleware : ", err.message);
            if (err) return res.sendStatus(403);
            const userData = await UserController.find({ name: user.name });
            req.user = userData;
            next();
        });
    }
}

module.exports = AuthApi;