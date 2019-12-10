let Email = require('../models/emails').Email;
let express = require('express');
let router = express.Router();
let uniqid = require('uniqid');
let authMiddleware = require('../middleware/auth');


router.get('/', authMiddleware, async (req,resp) => {
    resp.send(await Email.find());
});
router.post('/', async (req,resp) => {
    let reqBody = req.body;
    let newEmail = new Email({
        id: uniqid(),
        date: new Date(),
        name: reqBody.name,
        email: reqBody.email,
        text: reqBody.text
    })
    await newEmail.save();
    resp.sendStatus(200);
    
});
router.delete('/:id', authMiddleware, async (req,resp) => {
    await Email.deleteOne({id: req.params.id})
    resp.sendStatus(200);
});

module.exports = router;