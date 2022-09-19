// by Logan <https://github.com/loganworld>
// at 19/08/2022

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const BlockNumber = new Schema({
  id: { type: String },
  latestBlock: { type: Number }
});

const NFTSchema = new Schema({
  id: { type: String, required: true },               // tank id
  owner: { type: String, required: true },            // tank owner
  level: { type: String, default: "0" }               // tank level
})

const TankSchema = new Schema({
  classType: { type: Number, required: true },        // tank class type
  energy: { type: Number, default: 0 },               // remained energy for tank
  energyPool: { type: Number, default: 0 },           // energy pool size
  experience: { type: Number, default: 0 },           // tank experience
  tankLevel: { type: Number, default: 0 },            // current level

  name: { type: String },                             // tank name
  image: { type: String },                            // tank image
  description: { type: String },                      // tank description
  health: { type: Number, default: 0 },               // max health
  fireRate: { type: Number, default: 0 },             // fire Rate
  firePower: { type: Number, default: 0 },            // fire Power
  speed: { type: Number, default: 0 },                //  speed
  borrower: { type: String, default: "" },            // borrower
  followers: [{ type: String }]                       // followers
}, { timestamps: true })

const NFTTankschema = new Schema();
NFTTankschema.add(NFTSchema).add(TankSchema);

const ClassSchema = new Schema({
  id: { type: Number, required: true },
  name: { type: String },
  image: { type: String },
  description: { type: String },                      // tank description
  health: { type: Number },
  fireRate: { type: Number },
  firePower: { type: Number },
  speed: { type: Number },
  healthAdd: { type: Number },
  fireRateAdd: { type: Number },
  firePowerAdd: { type: Number },
  speedAdd: { type: Number },
  price: { type: Number }
}, { timestamps: true })

const AdminSettingSchema = new Schema({
  type: String,
  value: String
})

const TransactionHistorySchema = new Schema({
  type: String,
  value: String
})

const BlockNumbers = mongoose.model("BlockNumbers", BlockNumber);
const NFTTanks = mongoose.model("NFTTanks", NFTTankschema);
const Classes = mongoose.model("Classes", ClassSchema);
const AdminSetting = mongoose.model("AdminSetting", AdminSettingSchema);
const TransactionHistory = mongoose.model("TransactionHistory", TransactionHistorySchema);

module.exports = { BlockNumbers, NFTTanks, Classes, AdminSetting, TransactionHistory }