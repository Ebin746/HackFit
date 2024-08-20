const router = require("express").Router();
const userModel = require("../models/user");

router.post("/signup", async (req, res) => {
    try {
        const { name, password, phoneNumber, latitude, longitude } = req.body;
        if (!name || !phoneNumber || !password || !latitude || !longitude) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = new userModel({
            name,
            password,
            phoneNumber,
            location: { latitude, longitude }
        });
        await user.save();

        return res.status(201).json({ message: "User created successfully", user });
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

router.post("/login", async (req, res) => {
    try {
        let { phoneNumber, password } = req.body;

        if (!phoneNumber || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        let user = await userModel.findOne({ phoneNumber });

        if (user.password !== password) {
            return res.status(200).json({ message: "wrong password" });
        }

        res.json({ message: "success", user });
    } catch (error) {
        return res.status(500).json({ message: "there is error" });
    }
});

module.exports = router;
