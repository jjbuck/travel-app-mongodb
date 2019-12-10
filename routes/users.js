let User = require('../models/users').User;
let express = require('express');
let router = express.Router();
let bcrypt = require('bcrypt');
let auth = require('../controllers/auth');



router.post('/login', async (req, resp) => {
    let email = req.body.email;
    let password = req.body.password;
    let user = await User.find().where({email: email})
    if (user.length > 0) {
        let comparisonResult = await bcrypt.compare(password, user[0].password);
        if(comparisonResult) {
            let token = auth.generateToken(user[0]);
            resp.cookie('auth_token', token);
            resp.send({
                redirectUrl: '/admin'
            })
        } else {
            resp.status(400);
        }
    } else {
        resp.status(400);
        resp.send('User Not Found');
    }
})

router.post('/register', async (req, resp) => {
    let email = req.body.email;
    let password = req.body.password;
    let user = await User.find().where({email: email});
    console.log(user);
    if (user.length === 0) {
        let encryptedPassword = await bcrypt.hash(password, 6);
        let newUser = new User({
            email: email,
            password: encryptedPassword
        })
        await newUser.save();
        resp.sendStatus(200);
    } else {
        resp.send('Rejected')
    }
})

module.exports = router;