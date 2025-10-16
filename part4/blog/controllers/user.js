const User = require("../models/user");
const userRouter = require("express").Router();
const bcrypt = require("bcrypt");

userRouter.post("/", async (request, response) => {
    const { name, username, password } = request.body;
    
    const salt = 10;

    const passwordHash = await bcrypt.hash(password, salt);
    
    const user = new User({ name, username, passwordHash });

    const savedUser = await user.save();

    response.status(201).json(savedUser);
})

userRouter.get("/", async (request, response) => {
    const users = await User.find({});
    response.json(users);
})

module.exports = userRouter