const express = require("express");
const ingredientsDB = require("../dao/ingredients");
//创建路由对象
let ingredients = express.Router();
//设置路由
//查找所有食材信息接口
ingredients.get("/findAll", (req, res) => {
  //访问dao层，获取数据，响应数据
  ingredientsDB.findAll((results) => {
    res.json({
      status: 200,
      message: "success",
      data: results,
      timestamp: Date.now(),
    });
  });
});
//通过id获取食材信息接口
ingredients.get("/findById", (req, res) => {
  //req.query
  //访问dao层，获取数据，响应数据
  ingredientsDB.findById(req.query, (results) => {
    res.json({
      status: 200,
      message: "success",
      data: results,
      timestamp: Date.now(),
    });
  });
});
//通过id删除食材信息接口
ingredients.get("/deleteById", (req, res) => {
  //req.query
  //访问dao层，获取数据，响应数据
  ingredientsDB.deleteById(req.query, (results) => {
    res.json({
      status: 200,
      message: "success",
      data: results,
      timestamp: Date.now(),
    });
  });
});
//新增或修改食材信息接口
ingredients.post("/saveOrUpdate", (req, res) => {
  //req.body
  //访问dao层，获取数据，响应数据
  ingredientsDB.saveOrUpdate(req.body.payload, (results) => {
    res.json({
      status: 200,
      message: "success",
      data: results,
      timestamp: Date.now(),
    });
  });
});
//导出
module.exports = ingredients;
