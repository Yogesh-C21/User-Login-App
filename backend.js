
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');



const app = express();
app.use(cors());
app.use(require('express').json());

mongoose.set('strictQuery', true);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log("Connected to MongoDB");
});



const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 3,
        max: 20,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 8,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    desc: {
        type: String,
        max: 50,
        require: true
    }
},
    { timestamps: true }
);

const User = mongoose.model("User", UserSchema);


app.post('/api/signup', async (req, res) => {
    try {

        // checking if the user already exist
        const user = await User.findOne({ username: req.body.username });
        if (user) {
            return res.json("sww_user_already_exist");
        }

        // salt creation for password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // creating new user
        const newUser = new User({
            username: req.body.username,
            password: hashedPassword,
            desc: req.body.description
        });

        //saving the user on db atlas
        const userSaved = await newUser.save();

        // generating response
        res.status(200).json(userSaved);
    } catch (e) {
        return res.json(e);
    }
})


/* LOGIN ROUTE */

app.post('/api/login', async (req, res) => {
    try {

        //checking if the user exist
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            return res.json("sww_not_found");
        }

        // validating password
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if(!validPassword) {
            return res.json("sww_wrong_pwd");
        }

        // object destructure
        const {password, ...otherDetails} = user._doc;
        res.json(otherDetails);

    } catch (e) {
        return res.json(e);
    }

});


app.listen(process.env.PORT, () => {
    console.log(`Connected Successfully on port :: ${process.env.PORT}`);
})