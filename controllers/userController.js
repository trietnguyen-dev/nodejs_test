const User = require("../models/User");
const helpers = require("../untils/helpers");

const { v4: uuidv4 } = require('uuid');

class userController {
    async createAccount(req, res, next) {

        try {
            let { firstname, lastname, age, coordinate } = req.body
            if (!helpers.validateCoordinate(coordinate)) {
                return res.status(400).json({ success: false, msg: "Sai định dạng Coordinate" })
            }
            const checkUser = await User.findOne({ coordinate: coordinate })
            if (checkUser) {
                return res.status(400).json({ success: false, msg: "Đã tồn tại Coordinate" });
            }
            let us = new User({
                id: uuidv4(),
                firstname: firstname,
                lastname: lastname,
                age: parseInt(age),
                coordinate: coordinate,
            });
            await us.save();
            return res.status(200).json({ success: true, data: { us }, error: null });
        } catch (error) {
            return res
                .status(500)
                .json({ success: false, data: null, error: error });
        }
    }

    async readAccount(req, res) {
        try {
            const id = req.query.id;
            const user = await User.findOne({ id: id });
            if (!user) {
                return res.status(404).json({ success: false, msg: "User not found" });
            }
            return res.status(200).json({ success: true, data: user, error: null });
        } catch (error) {
            return res.status(500).json({ success: false, data: null, error: error });
        }
    }

    async searchAccount(req, res) {
        try {
            const name = req.query.name;
            const users = await User.find({ $or: [{ firstname: { $regex: `^${name}`, $options: 'i' } }, { lastname: { $regex: `^${name}`, $options: 'i' } }] }).sort({ firstname: -1 });
            return res.status(200).json({ success: true, data: users, error: null });
        } catch (error) {
            return res.status(500).json({ success: false, data: null, error: error });
        }
    }

    async updateAccount(req, res) {
        const { id } = req.params;
        const { firstname, lastname, age, coordinate } = req.body;

        if (!helpers.validateCoordinate(coordinate)) {
            return res.status(400).json({ msg: "Sai định dạng Coordinate" });
        }
        const existingUser = await User.findOne({ coordinate: coordinate });

        if (existingUser && existingUser.id !== id) {
            return res.status(409).json({ msg: "Đã tồn tại Coordinate" });
        }

        try {
            const user = await User.findOneAndUpdate({ id: id }, {
                $set: {
                    firstname: firstname,
                    lastname: lastname,
                    age: age,
                    coordinate: coordinate,
                }
            },);
            if (!user) {
                return res.status(404).json({ success: false, msg: "User not found" });
            }

            return res.status(200).json({ success: true, data: { user: user }, error: null });
        } catch (error) {
            return res.status(500).json({ success: false, data: null, error: error });
        }
    }

    async deleteAccount(req, res) {
        const { id } = req.params;
        console.log(id)
        try {
            const user = await User.findOneAndDelete({ id: id });
            if (!user) {
                return res.status(404).json({ success: false, msg: "User không có" });
            }
            return res.status(200).json({ success: true, data: { user: user }, error: null });
        } catch (error) {
            return res.status(500).json({ success: false, data: null, error: error });
        }
    }


    async findNearUsers(req, res) {
        const { n, id } = req.query;
        try {
            const user = await User.findOne({ id: id });

            console.log()
            if (!user) {
                return res.status(404).json({ success: false, msg: "User không có" });
            }

            const nearestUsers = await User.find({
                _id: { $ne: user._id },
                coordinate: { $exists: true }
            })
            const listNearUser = nearestUsers.map((e) => {
                let distance = helpers.distanceLocations(user.coordinate, e.coordinate)
                return { userID: e.id, distance }
            })

            listNearUser.sort(function (a, b) {
                return a.distance - b.distance;
            })

            const limitUsers = listNearUser.slice(0, n)

            return res.json({ success: true, data: limitUsers, error: null })

        } catch (error) {
            return res.status(500).json({ success: false, data: null, error: error });
        }
    }

}

module.exports = new userController();
