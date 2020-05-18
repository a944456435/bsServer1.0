const express = require("express");
const categoryDB = require("../dao/category");
//创建路由对象
let category = express.Router();
//设置路由
//查找所有栏目信息接口
category.get("/findAll", (req, res) => {
  //访问dao层，获取数据，响应数据
  categoryDB.findAll((results) => {
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
//通过id获取栏目信息接口
category.get("/findById", (req, res) => {
  //req.query
  //访问dao层，获取数据，响应数据
  categoryDB.findById(req.query, (results) => {
    res.json({
      status: 200,
      message: "success",
      data: results,
      timestamp: Date.now(),
    });
  });
});
//通过id删除栏目信息接口
category.get("/deleteById", (req, res) => {
  //req.query
  //访问dao层，获取数据，响应数据
  categoryDB.deleteById(req.query, (results) => {
    res.json({
      status: 200,
      message: "success",
      data: results,
      timestamp: Date.now(),
    });
  });
});
//新增或修改栏目信息接口
category.post("/saveOrUpdate", (req, res) => {
  //req.body
  //访问dao层，获取数据，响应数据
  categoryDB.saveOrUpdate(req.body, (results) => {
    res.json({
      status: 200,
      message: "success",
      data: results,
      timestamp: Date.now(),
    });
  });
});
//导出
module.exports = category;
