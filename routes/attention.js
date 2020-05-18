const express = require("express");
const attentionDB = require("../dao/attention");
const isLoginMid = require("../utils/isLogin");
//创建路由对象
let attention = express.Router();
//设置路由
//查找所有关注信息接口
// attention.get("/findAll", (req, res) => {
//   //访问dao层，获取数据，响应数据
//   attentionDB.findAll((results) => {
//     res.json({
//       status: 200,
//       message: "success",
//       data: results,
//       timestamp: Date.now(),
//     });
//   });
// });
//通过id获取关注信息接口
attention.get("/findById", isLoginMid, (req, res) => {
  //req.session.userId 登陆成功后的用户id

  if (req.session.userId == undefined) {
    res.json({
      status: 500,
      message: "请重新登陆！",
      data: [],
      timestamp: Date.now(),
    });
  } else {
    //访问dao层，获取数据，响应数据
    attentionDB.findById(req.session.userId, (results) => {
      res.json({
        status: 200,
        message: "success",
        data: results,
        timestamp: Date.now(),
      });
    });
  }
});
//通过我关注的id fans_id删除我的关注信息接口
attention.get("/deleteById", isLoginMid, (req, res) => {
  if (req.session.userId == undefined) {
    res.json({
      status: 500,
      message: "请重新登陆！",
      data: [],
      timestamp: Date.now(),
    });
  } else {
    let user_id = req.session.userId;
    console.log("req.query----", req.query.fans_id);
    let newParam = Object.assign({}, req.query, { user_id });
    console.log("favorite router newParam", newParam);
    attentionDB.deleteById(newParam, (results) => {
      res.json({
        status: 200,
        message: "success",
        data: results,
        timestamp: Date.now(),
      });
    });
  }
});
//新增关注信息接口;
attention.get("/saveAttention", isLoginMid, (req, res) => {
  if (req.session.userId == undefined) {
    res.json({
      status: 500,
      message: "请重新登陆！",
      data: [],
      timestamp: Date.now(),
    });
  } else {
    let user_id = req.session.userId;
    console.log("req.query----", req.query.fans_id);
    let newParam = Object.assign({}, req.query, { user_id });
    console.log("favorite router newParam", newParam);
    attentionDB.saveAttention(newParam, (results) => {
      res.json({
        status: 200,
        message: "success",
        data: results,
        timestamp: Date.now(),
      });
    });
  }
});

//查看我是否对当前用户进行过了关注;
attention.get("/findIsAttention", isLoginMid, (req, res) => {
  if (req.session.userId == undefined) {
    res.json({
      status: 500,
      message: "请重新登陆！",
      data: [],
      timestamp: Date.now(),
    });
  } else {
    let user_id = req.session.userId;
    console.log("req.query----", req.query.fans_id);
    //登陆用户id和fan_id则返回[一些信息]保证不为空
    if (req.query.fans_id == user_id) {
      res.json({
        status: 500,
        message: "当前用户是自己！",
        data: [{ massage: "当前用户是自己" }],
        timestamp: Date.now(),
      });
    } else {
      let newParam = Object.assign({}, req.query, { user_id });
      console.log("favorite router newParam", newParam);

      attentionDB.findIsAttention(newParam, (results) => {
        res.json({
          status: 200,
          message: "success",
          data: results,
          timestamp: Date.now(),
        });
      });
    }
  }
});
//导出
module.exports = attention;
