const User = require("../models/user");
const userRouter = require("express").Router();
const bcrypt = require("bcrypt");

userRouter.post("/", async (request, response) => {
    const { name, username, password } = request.body;
    
    if (!username || username.length < 3) {
        return response.status(400).json({ error: 'Username must be at least 3 characters long' });
    }

    if (!password || password.length < 3) {
        return response.status(400).json({ error: 'Password must be at least 3 characters long' });
    }

    const userExist = await User.findOne({ username });
    if (userExist) {
        return response.status(400).json({ error: 'Username must be unique' });
    }
    
    const salt = 10;

    const passwordHash = await bcrypt.hash(password, salt);
    
    const user = new User({ name, username, passwordHash });

    const savedUser = await user.save();

    response.status(201).json(savedUser);
})

userRouter.get("/", async (request, response) => {
    const users = await User.find({}).populate("blogs", { url: 1, title: 1, author: 1, id: 1 });
    response.json(users);
})

module.exports = userRouter