const UserSchema = require("./models");

const UserController = {
    /**
     * 
     * @param {name, email, hashedPassword, address} props 
     * @returns 
     */
    create: async (props) => {
        const { name, email, hashedPassword, address } = props;

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
            address: address,
            image: ""
        });

        let userData = await newUser.save();
        return userData;
    },
    find: async (filter) => {
        return await UserSchema.findOne(filter);
    },
    update: async (filter, newData) => {
        return await UserSchema.updateOne(filter, { $set: newData })
    },
    remove: async (filter) => {
        return await UserSchema.findOneAndRemove(filter);
    }
}

module.exports = UserController