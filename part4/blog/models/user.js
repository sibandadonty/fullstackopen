const mongoose = require("mongoose");

// username, password and name.

const userSchema = mongoose.Schema({
    username: String,
    name: String,
    passwordHash: String,
    blogs: [
        {
           type: mongoose.Schema.Types.ObjectId,
           ref: "Blog"
        }
    ]
})

userSchema.set("toJSON", {
    transform: function (doc, ret) {
       ret.id = ret._id.toString();
       delete ret._id;
       delete ret.__v;
       delete ret.passwordHash;
       return ret;
    }
})

const User = mongoose.model("User", userSchema);

module.exports = User;