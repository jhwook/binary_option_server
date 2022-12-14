var express = require("express");
let { respok, resperr } = require("../utils/rest");
const jwt = require('jsonwebtoken');
const { softauth, auth } = require('../utils/authMiddleware');
const db = require('../models')
var crypto = require('crypto');
const LOGGER = console.log;

var router = express.Router();

router.get("/", function (req, res, next) {
    res.send("respond with a resource");
});

router.post('/:type/:targetId', auth, async (req, res) => {
    let { type, targetId } = req.params;
    let { id } = req.decoded;
    // console.log('bookmark id',id);
    if(id) {

    if (type == "assets") {
        let findAsset = await db['assets'].findOne({
            where:{
                id: targetId
            }
        })
        if(!findAsset){resperr(res, 'NO-ASSET-FOUND'); return;}
        db['bookmarks']
            .findOne({
                where: {
                    uid: id,
                    assetsId: targetId
                },
                raw: true
            })
            .then(result => {
                if (result) {
                    db['bookmarks']
                        .destroy({
                            where: {
                                uid: id,
                                assetsId: targetId
                            },
                        })
                        .then(_ => {
                            respok(res, null, null, { status: 0 })
                        })
                } else {
                    db['bookmarks']
                        .create({
                            uid: id,
                            assetsId: targetId,
                            typestr: 'ASSETS'
                        })
                        .then(_ => {
                            respok(res, null, null, { status: 1 })
                        })
                }
            })
    }
}
})

router.get('/my', auth, async(req, res)=>{
    let{id} = req.decoded;
    // console.log('bookmark/my id', id);
    if(id) {
        db['bookmarks'].findAll({
            where:{
                uid: id
            },
            include:[{
                model: db['assets']
            }]
        })
        .then(respdata=>{
            respok(res, null, null, {respdata})
        })
    }
})

module.exports = router;