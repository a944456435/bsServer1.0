const express = require("express");
const mallDB = require("../dao/mall");
const isLoginMid = require("../utils/isLogin");

//创建路由对象
let mall = express.Router();
//设置路由
//查找所有商品信息接口
mall.get("/findAll", (req, res) => {
  //访问dao层，获取数据，响应数据
  mallDB.findAll((results) => {
    // var results = JSON.stringify(results);
    // console.log("json.tostring", results);
    res.json({
      status: "200",
      message: "success",
      data: results,
      timestamp: Date.now(),
    });
  });
});
//通过id获取商品信息接口
mall.get("/findById", (req, res) => {
  //req.query
  //访问dao层，获取数据，响应数据
  mallDB.findById(req.query, (results) => {
    res.json({
      status: 200,
      message: "success",
      data: results,
      timestamp: Date.now(),
    });
  });
});
//通过用户id查找商品
mall.get("/findMallByUserId", isLoginMid, (req, res) => {
  if (req.session.userId == undefined) {
    res.json({
      status: 500,
      message: "请重新登陆！",
      data: [],
      timestamp: Date.now(),
    });
  } else {
    //访问dao层，获取数据，响应数据
    mallDB.findMallByUserId(req.session.userId, (results) => {
      res.json({
        status: 200,
        message: "success",
        data: results,
        timestamp: Date.now(),
      });
    });
  }
});
//通过id获取商品评论信息接口
mall.get("/findCommentById", (req, res) => {
  //req.query
  //访问dao层，获取数据，响应数据
  mallDB.findCommentById(req.query, (results) => {
    res.json({
      status: 200,
      message: "success",
      data: results,
      timestamp: Date.now(),
    });
  });
});
//通过id删除商品信息接口
mall.get("/deleteById", isLoginMid, (req, res) => {
  //req.query
  if (req.session.userId == undefined) {
    res.json({
      status: 500,
      message: "请重新登陆！",
      data: [],
      timestamp: Date.now(),
    });
  } else {
    //访问dao层，获取数据，响应数据
    mallDB.deleteById(req.query, (results) => {
      res.json({
        status: 200,
        message: "success",
        data: results,
        timestamp: Date.now(),
      });
    });
  }
});
//新增或修改商品信息接口
mall.post("/saveOrUpdate", isLoginMid, (req, res) => {
  if (req.session.userId == undefined) {
    res.json({
      status: 500,
      message: "请重新登陆！",
      data: [],
      timestamp: Date.now(),
    });
  } else {
    //访问dao层，获取数据，响应数据
    let user_id = req.session.userId;
    let newParam = Object.assign({}, req.body, { user_id });
    console.log("favorite router newParam", newParam);
    mallDB.saveOrUpdate(newParam, (results) => {
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
module.exports = mall;
