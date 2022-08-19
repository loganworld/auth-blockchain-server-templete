// by Logan <https://github.com/loganworld>
// at 19/08/2022

const mongoose = require("mongoose");
const Schema = mongoose.Schema;


// Create Schema
const UserBasicSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
    },
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    address: {
        type: String,
    },
    image: {
        type: String,
    },
});


const UserSchema = new Schema();
UserSchema.add(UserBasicSchema);

module.exports = Users = mongoose.model("users", UserSchema);