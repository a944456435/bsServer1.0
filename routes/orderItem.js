const express = require("express");
const orderItemDB = require("../dao/orderItem");
//创建路由对象
let orderItem = express.Router();
const isLogin = require("../utils/isLogin");

//设置路由
//查找所有订单项信息接口
orderItem.get("/findAll", isLogin, (req, res) => {
  if (req.session.userId == undefined) {
    res.json({
      status: 500,
      message: "请重新登陆！",
      data: [],
      timestamp: Date.now(),
    });
  } else {
    let user_id = req.session.userId;
    orderItemDB.findAll(user_id, (results) => {
      res.json({
        status: 200,
        message: "success",
        data: results,
        timestamp: Date.now(),
      });
    });
  }
});
//通过id获取订单项信息接口
orderItem.get("/findById", (req, res) => {
  //req.query
  //访问dao层，获取数据，响应数据
  orderItemDB.findById(req.query, (results) => {
    res.json({
      status: 200,
      message: "success",
      data: results,
      timestamp: Date.now(),
    });
  });
});
//通过id获取订单项评论信息接口
orderItem.get("/findCommentById", (req, res) => {
  //req.query
  //访问dao层，获取数据，响应数据
  orderItemDB.findCommentById(req.query, (results) => {
    res.json({
      status: 200,
      message: "success",
      data: results,
      timestamp: Date.now(),
    });
  });
});
//通过id删除订单项信息接口
orderItem.get("/deleteById", (req, res) => {
  //req.query
  //访问dao层，获取数据，响应数据
  orderItemDB.deleteById(req.query, (results) => {
    res.json({
      status: 200,
      message: "success",
      data: results,
      timestamp: Date.now(),
    });
  });
});
//新增或修改订单项信息接口
orderItem.post("/save", isLogin, (req, res) => {
  if (req.session.userId == undefined) {
    res.json({
      status: 500,
      message: "请重新登陆！",
      data: [],
      timestamp: Date.now(),
    });
  } else {
    let user_id = req.session.userId;
    //拿到前端传上来的值拷贝一份 并追加user_id
    let newParam = Object.assign({}, req.body, { user_id });
    console.log("orderItem router newParam", newParam);
    orderItemDB.save(newParam, (results) => {
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
module.exports = orderItem;
