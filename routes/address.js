const express = require("express");
const addressDB = require("../dao/address");
const isLoginMid = require("../utils/isLogin");
//创建路由对象
let address = express.Router();
//设置路由
address.get("/findAll", isLoginMid, (req, res) => {
  if (req.session.userId == undefined) {
    res.json({
      status: 500,
      message: "请重新登陆！",
      data: [],
      timestamp: Date.now(),
    });
  } else {
    //访问dao层，获取数据，响应数据
    addressDB.findAll(req.session.userId, (results) => {
      res.json({
        status: 200,
        message: "success",
        data: results,
        timestamp: Date.now(),
      });
    });
  }
});
//通过id获取地址信息接口
address.get("/findById", (req, res) => {
  //访问dao层，获取数据，响应数据
  addressDB.findById(req.query, (results) => {
    res.json({
      status: 200,
      message: "success",
      data: results,
      timestamp: Date.now(),
    });
  });
});
//通过我地址的id fans_id删除我的地址信息接口
address.get("/deleteById", isLoginMid, (req, res) => {
  if (req.session.userId == undefined) {
    res.json({
      status: 500,
      message: "请重新登陆！",
      data: [],
      timestamp: Date.now(),
    });
  } else {
    let user_id = req.session.userId;
    let newParam = Object.assign({}, req.query, { user_id });
    console.log("favorite router newParam", newParam);
    addressDB.deleteById(newParam, (results) => {
      res.json({
        status: 200,
        message: "success",
        data: results,
        timestamp: Date.now(),
      });
    });
  }
});
//新增地址信息接口;
address.post("/saveOrUpdate", isLoginMid, (req, res) => {
  if (req.session.userId == undefined) {
    res.json({
      status: 500,
      message: "请重新登陆！",
      data: [],
      timestamp: Date.now(),
    });
  } else {
    let user_id = req.session.userId;
    console.log("req.body", req.body);
    let newParam = Object.assign({}, req.body, { user_id });
    console.log("favorite router newParam", newParam);
    addressDB.saveOrUpdate(newParam, (results) => {
      res.json({
        status: 200,
        message: "success",
        data: results,
        timestamp: Date.now(),
      });
    });
  }
});

//导出
module.exports = address;
