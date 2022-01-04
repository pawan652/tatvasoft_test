var express = require('express');
var jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
var router = express.Router();
var config = require('../config/config');
var db = require('../connection');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended : true
}))

var users = require('../controller/users');

router.post('/register', users.register.bind(this, db));
router.post('/login', users.login.bind(this, db));
router.post('/blogsList', ensureWebToken ,users.blogsList.bind(this, db));
router.post('/addBlog', ensureWebToken, users.addBlog.bind(this, db));
router.post('/editBlog', ensureWebToken ,users.editBlog.bind(this, db));
router.post('/deleteBlog',  ensureWebToken,users.deleteBlog.bind(this, db));

function ensureWebToken(req, res, next){
    var access_token = req.headers['authorization'];
    if(typeof access_token !== undefined){
        req.token = access_token;
        verifyJWT(req, res, next);
    }else{
        res.sendStatus(403)
    }
}

function verifyJWT(req, res, next){
    jwt.verify(req.token, config.JWT_SECRET_KEY, async function(err, data){
        if(err){
            res.sendStatus(403)
        }else{
            const _data = await jwt.decode(req.token, {
                complete : true,
                json : true
            });

            req.user = _data['payload'];
            console.log(req.user.email);
            if(req.user.email != req.body.email){
                return res.sendStatus(403)
            }
            next();
        }
    });
}

module.exports.routes = router;