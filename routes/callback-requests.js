let CallbackRequest = require('../models/callback-requests').CallbackRequest;
let express = require('express');
let router = express.Router();
let uniqid = require('uniqid');
let authMiddleware = require('../middleware/auth');

let cr = new CallbackRequest({
    id: '1234',
    phoneNumber: '123456789',
    date: new Date()
})

cr.save();

router.get('/', authMiddleware, async (req,resp) => {
    resp.send(await CallbackRequest.find());
});
router.post('/', async (req,resp) => {
    let reqBody = req.body;
    let newRequest = new CallbackRequest({
        id: uniqid(),
        phoneNumber: reqBody.phoneNumber,
        date: new Date()
    })
    await newRequest.save();
    resp.sendStatus(200);
    
});
router.delete('/:id', authMiddleware, async (req,resp) => {
    await CallbackRequest.deleteOne({id: req.params.id})
    resp.sendStatus(200);
});

module.exports = router;