const express = require("express");
const practiceDB = require("../dao/practice");
//创建路由对象
let practice = express.Router();
//设置路由
//查找所有做法信息接口
practice.get("/findAll", (req, res) => {
  //访问dao层，获取数据，响应数据
  practiceDB.findAll((results) => {
    res.json({
      status: 200,
      message: "success",
      data: results,
      timestamp: Date.now(),
    });
  });
});
//通过id获取做法信息接口
practice.get("/findBycookId", (req, res) => {
  //req.query
  //访问dao层，获取数据，响应数据
  practiceDB.findBycookId(req.query, (results) => {
    res.json({
      status: 200,
      message: "success",
      data: results,
      timestamp: Date.now(),
    });
  });
});
//通过id删除做法信息接口
practice.get("/deleteById", (req, res) => {
  //req.query
  //访问dao层，获取数据，响应数据
  practiceDB.deleteById(req.query, (results) => {
    res.json({
      status: 200,
      message: "success",
      data: results,
      timestamp: Date.now(),
    });
  });
});
//新增或修改做法信息接口
practice.post("/saveOrUpdate", (req, res) => {
  //req.body
  //访问dao层，获取数据，响应数据
  console.log("步步骤表的router的req：", req.body);
  practiceDB.saveOrUpdate(req.body.payload, (results) => {
    res.json({
      status: 200,
      message: "success",
      data: results,
      timestamp: Date.now(),
    });
  });
});
//导出
module.exports = practice;
