var mongoose = require("mongoose"),
    passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    username: String,
    password: String
});
// takes the passport package and add methods to get authentication
UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", UserSchema);