const express = require("express");
const commentDB = require("../dao/comment");
//创建路由对象
let comment = express.Router();
const isLogin = require("../utils/isLogin");
//设置路由
//查找所有评论信息接口
comment.get("/findAll", (req, res) => {
  //访问dao层，获取数据，响应数据
  commentDB.findAll((results) => {
    res.json({
      status: 200,
      message: "success",
      data: results,
      timestamp: Date.now(),
    });
  });
});
//通过Recommend id获取评论信息接口
comment.get("/findByRecommendId", (req, res) => {
  //req.query
  //访问dao层，获取数据，响应数据
  commentDB.findByRecommendId(req.query, (results) => {
    res.json({
      status: 200,
      message: "success",
      data: results,
      timestamp: Date.now(),
    });
  });
});
//通过Cookbook id获取评论信息接口
comment.get("/findByCookbookId", (req, res) => {
  //req.query
  //访问dao层，获取数据，响应数据
  commentDB.findByCookbookId(req.query, (results) => {
    res.json({
      status: 200,
      message: "success",
      data: results,
      timestamp: Date.now(),
    });
  });
});
//通过id删除评论信息接口
comment.get("/deleteById", (req, res) => {
  //req.query
  //访问dao层，获取数据，响应数据
  commentDB.deleteById(req.query, (results) => {
    res.json({
      status: 200,
      message: "success",
      data: results,
      timestamp: Date.now(),
    });
  });
});
//新增或修改评论信息接口 //发布评论需要验证是否登陆
comment.post("/saveOrUpdate", isLogin, (req, res) => {
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
    let newParam = Object.assign({}, req.body.payload, { user_id });
    console.log("comment router newParam", newParam);
    commentDB.saveOrUpdate(newParam, (results) => {
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
module.exports = comment;
