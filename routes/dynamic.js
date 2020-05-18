const express=require('express')
const dynamicDB=require('../dao/dynamic')
//创建路由对象
let dynamic=express.Router();
//设置路由
//查找所有动态信息接口
dynamic.get('/findAll',(req,res)=>{
    //访问dao层，获取数据，响应数据
    dynamicDB.findAll((results)=>{
        res.json({
            "status": 200,
            "message": "success",
            "data":results,
            "timestamp":Date.now()
        });
    });
})
//通过id获取动态信息接口
dynamic.get('/findById',(req,res)=>{
    //req.query
    //访问dao层，获取数据，响应数据
    dynamicDB.findById(req.query,(results)=>{
        res.json({
            "status": 200,
            "message": "success",
            "data":results,
            "timestamp":Date.now()
        });
    })
})
//通过id删除动态信息接口
dynamic.get('/deleteById',(req,res)=>{
    //req.query
    //访问dao层，获取数据，响应数据
    dynamicDB.deleteById(req.query,(results)=>{
        res.json({
            "status": 200,
            "message": "success",
            "data":results,
            "timestamp":Date.now()
        });
    })
})
//级联用户查询动态信息接口
dynamic.get('/cascadQuery',(req,res)=>{
    //req.query
    //访问dao层，获取数据，响应数据
    dynamicDB.cascadQuery(results=>{
        res.json({
            "status": 200,
            "message": "success",
            "data":results,
            "timestamp":Date.now()
        });
    })
})
//新增或修改动态信息接口
dynamic.post('/save',(req,res)=>{
    //req.body
    //访问dao层，获取数据，响应数据
    dynamicDB.save(req.body,(results)=>{
        res.json({
            "status": 200,
            "message": "success",
            "data":results,
            "timestamp":Date.now()
        });
    })
})
//导出
module.exports=dynamic;
