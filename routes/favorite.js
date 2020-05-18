const express = require("express");
const favoriteDB = require("../dao/favorite");
//创建路由对象
let favorite = express.Router();
const isLogin = require("../utils/isLogin");

//查看我的收藏（菜谱）
favorite.get("/getMyFavoriteByCookbook", isLogin, (req, res) => {
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
    let newParam = Object.assign({}, req.query, { user_id });
    console.log("comment router newParam", newParam);

    favoriteDB.getMyFavoriteByCookbook(newParam, (results) => {
      res.json({
        status: 200,
        message: "success",
        data: results,
        timestamp: Date.now(),
      });
    });
  }
});

//查找当前视频或菜谱的总收藏数
favorite.get("/getCountFavorite", (req, res) => {
  //访问dao层，获取数据，响应数据
  favoriteDB.findAll(req.query, (results) => {
    res.json({
      status: 200,
      message: "success",
      data: results,
      timestamp: Date.now(),
    });
  });
});
//通过id获取收藏信息接口
favorite.get("/findById", isLogin, (req, res) => {
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
    let newParam = Object.assign({}, req.query, { user_id });
    console.log("comment router newParam", newParam);

    favoriteDB.findById(newParam, (results) => {
      res.json({
        status: 200,
        message: "success",
        data: results,
        timestamp: Date.now(),
      });
    });
  }
});
//通过id删除收藏信息接口
favorite.get("/deleteById", isLogin, (req, res) => {
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
    let newParam = Object.assign({}, req.query, { user_id });
    console.log("comment router newParam", newParam);

    favoriteDB.deleteById(newParam, (results) => {
      res.json({
        status: 200,
        message: "success",
        data: results,
        timestamp: Date.now(),
      });
    });
  }
});

//新增或修改收藏信息接口 //发布评论需要验证是否登陆
favorite.get("/saveFavorite", isLogin, (req, res) => {
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
    let newParam = Object.assign({}, req.query, { user_id });
    console.log("favorite router newParam", newParam);
    favoriteDB.saveFavorite(newParam, (results) => {
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
module.exports = favorite;
