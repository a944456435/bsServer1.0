const express = require("express");
const cookbookDB = require("../dao/cookbook");
const isLogin = require("../utils/isLogin");
//创建路由对象
let cookbook = express.Router();
//设置路由
//查找所有菜谱信息接口
cookbook.get("/findAll", (req, res) => {
  //访问dao层，获取数据，响应数据
  cookbookDB.findAll((results) => {
    res.json({
      status: 200,
      message: "success",
      data: results,
      timestamp: Date.now(),
    });
  });
});
//查找所有菜谱信息接口
cookbook.get("/findById", (req, res) => {
  //访问dao层，获取数据，响应数据
  cookbookDB.findById(req.query, (results) => {
    res.json({
      status: 200,
      message: "success",
      data: results,
      timestamp: Date.now(),
    });
  });
});
//通过关键字模糊查询所有菜谱信息接口
cookbook.get("/searchByKey", (req, res) => {
  //req.body
  //访问dao层，获取数据，响应数据
  cookbookDB.searchByKey(req.query, (results) => {
    res.json({
      status: 200,
      message: "success",
      data: results,
      timestamp: Date.now(),
    });
  });
});
//分页查找所有菜谱信息接口
cookbook.post("/query", (req, res) => {
  //req.body
  //访问dao层，获取数据，响应数据
  cookbookDB.query(req.body, (results) => {
    res.json({
      status: 200,
      message: "success",
      data: results,
      timestamp: Date.now(),
    });
  });
});
//通过id获取菜谱信息接口
cookbook.get("/findByUserId", isLogin, (req, res) => {
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
    console.log("newParam", newParam);
    cookbookDB.findByUserId(newParam, (results) => {
      res.json({
        status: 200,
        message: "success!",
        data: results,
        timestamp: Date.now(),
      });
    });
  }
});
//通过分类id获取菜谱信息接口
cookbook.get("/findByCategoryId", (req, res) => {
  //req.query
  //访问dao层，获取数据，响应数据
  cookbookDB.findByCategoryId(req.query, (results) => {
    res.json({
      status: 200,
      message: "success",
      data: results,
      timestamp: Date.now(),
    });
  });
});

//通过id删除菜谱信息接口
cookbook.get("/deleteById", isLogin, (req, res) => {
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
    console.log("newParam00", newParam);
    cookbookDB.deleteById(newParam, (results) => {
      res.json({
        status: 200,
        message: "success!",
        data: results,
        timestamp: Date.now(),
      });
    });
  }
});
//批量删除菜谱信息接口
cookbook.post("/bathDelete", isLogin, (req, res) => {
  //req.body
  //访问dao层，获取数据，响应数据
  cookbookDB.bathDelete(req.body, (results) => {
    res.json({
      status: 200,
      message: "success",
      data: results,
      timestamp: Date.now(),
    });
  });
});
//新增或修改菜谱信息接口
cookbook.post("/saveOrUpdate", isLogin, (req, res) => {
  if (req.session.userId == undefined) {
    res.json({
      status: 500,
      message: "请重新登陆！",
      data: [],
      timestamp: Date.now(),
    });
  } else {
    //登陆成功状态下
    //访问dao层，获取数据，响应数据
    //拿到session中的用户信息
    let user_id = req.session.userId;
    //拿到前端传上来的值拷贝一份 并追加user_id
    let newParam = Object.assign({}, req.body.payload, { user_id });

    // req.body.payload.use_id = use_id;
    // let newParam = req.body.payload.use_id;
    console.log("newParam", newParam);

    cookbookDB.saveOrUpdate(newParam, (results) => {
      res.json({
        status: 200,
        message: "添加菜谱成功",
        data: results,
        timestamp: Date.now(),
      });
    });
  }
});
//导出
module.exports = cookbook;
