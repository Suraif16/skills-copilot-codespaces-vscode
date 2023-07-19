// create web server
const express = require('express');
// create router
const router = express.Router();
// import comments model
const commentsModel = require('../models/commentsModel');
// import users model
const usersModel = require('../models/usersModel');
// import article model
const articleModel = require('../models/articleModel');
// import moment
const moment = require('moment');
// import data
const data = require('../data.json');
// import multer
const multer = require('multer');
// import path
const path = require('path');
// import fs
const fs = require('fs');

// 创建存储对象
const storage = multer.diskStorage({
    // 目标文件夹
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/images'))
    },
    // 目标文件名
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})
// 创建上传对象
const upload = multer({
    storage: storage
})

// get comments list
router.get('/list', (req, res) => {
    // get params
    const params = req.query;
    // get page
    const page = parseInt(params.page || 1);
    // get size
    const size = parseInt(params.size || 5);
    // get total
    const total = data.comments.length;
    // get total page
    const pages = Math.ceil(total / size);
    // get start
    const start = (page - 1) * size;
    // get end
    const end = page * size;
    // get comments
    const comments = data.comments.slice(start, end);
    // return data
    res.json({
        code: 200,
        msg: 'success',
        data: {
            comments,
            page,
            size,
            total,
            pages
        }
    })
})

// get comment by id
router.get('/detail', (req, res) => {
    // get params
    const params = req.query;
    // get id
    const id = parseInt(params.id);
    // get comment
    const comment = data.comments.find(comment => comment.id === id);
    // return data
    res.json({
        code: 200,
        msg: 'success',
        data: comment
    })
})

// add comment
