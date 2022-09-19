// by Logan <https://github.com/loganworld>
// at 19/08/2022

const UserSchema = require("./models");
const UserController = {
    /**
     * create user data to db
     * @param {name, email, hashedPassword, address} props
     * @returns
     */
    create: async (props) => {
        const {
            name,
            email,
            address,
            hashedPassword,
            image,
            coverImage,
            description,
            links,
        } = props;
        // valid check
        var user = await UserSchema.findOne({
            $or: [{ name: name }, { email: email }, { address: address }],
        });
        if (user) throw new Error("Account already exist. Please log In");

        const newUser = new UserSchema({
            address: address,
            name: name,
            email: email,
            password: hashedPassword,
            image: image,
            coverImage: coverImage,
            merit: 0,
            description: description,
            links: links,
        });

        let userData = await newUser.save();
        return userData;
    },
    findRank: async (filter) => {
        let user = await UserSchema.findOne(filter);
        if (!user || !user.merit) return -1;
        return await UserSchema.count({ merit: { $gt: user.merit || 0 } });
    },
    find: async (filter) => {
        return await UserSchema.findOne(filter);
    },
    finds: async () => {
        return await UserSchema.find({}, { password: 0 });
    },
    update: async (filter, newData) => {
        return await UserSchema.updateOne(filter, { $set: newData });
    },
    remove: async (filter) => {
        return await UserSchema.findOneAndRemove(filter);
    },
};

module.exports = UserController;
