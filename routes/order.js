const express = require("express");
const orderDB = require("../dao/order");
//创建路由对象
let order = express.Router();
const isLogin = require("../utils/isLogin");

//设置路由
//查找所有订单信息接口
order.get("/findAll", isLogin, (req, res) => {
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

    orderDB.findAll(user_id, (results) => {
      res.json({
        status: 200,
        message: "success",
        data: results,
        timestamp: Date.now(),
      });
    });
  }
});
//通过id获取订单信息接口
order.get("/findById", (req, res) => {
  //req.query
  //访问dao层，获取数据，响应数据
  orderDB.findById(req.query, (results) => {
    res.json({
      status: 200,
      message: "success",
      data: results,
      timestamp: Date.now(),
    });
  });
});
//通过id获取订单评论信息接口
order.get("/findCommentById", (req, res) => {
  //req.query
  //访问dao层，获取数据，响应数据
  orderDB.findCommentById(req.query, (results) => {
    res.json({
      status: 200,
      message: "success",
      data: results,
      timestamp: Date.now(),
    });
  });
});
//通过id删除订单信息接口
order.get("/deleteById", (req, res) => {
  //req.query
  //访问dao层，获取数据，响应数据
  orderDB.deleteById(req.query, (results) => {
    res.json({
      status: 200,
      message: "success",
      data: results,
      timestamp: Date.now(),
    });
  });
});
//新增或修改订单信息接口
order.post("/save", isLogin, (req, res) => {
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
    console.log("order router newParam", newParam);
    orderDB.save(newParam, (results) => {
      console.log("订单添加后的id", results);
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
module.exports = order;
