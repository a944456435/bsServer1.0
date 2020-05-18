const reconmmendDB = require("../dao/recommend");

const express = require("express");
const router = express.Router();
const isLoginMid = require("../utils/isLogin");
//删除我的全部视频
router.get("/delteALLById", isLoginMid, (req, res) => {
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
    reconmmendDB.delteALLById(newParam, (results) => {
      res.json({
        status: 200,
        message: "success!",
        data: results,
        timestamp: Date.now(),
      });
    });
  }
});
//删除我的某个视频
router.get("/delteById", isLoginMid, (req, res) => {
  if (req.session.userId == undefined) {
    res.json({
      status: 500,
      message: "请重新登陆！",
      data: [],
      timestamp: Date.now(),
    });
  } else {
    reconmmendDB.delteById(req.query, (results) => {
      res.json({
        status: 200,
        message: "success!",
        data: results,
        timestamp: Date.now(),
      });
    });
  }
});
//查看我的收藏（视频）
router.get("/getMyFavoriteByRecommend", isLoginMid, (req, res) => {
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

    reconmmendDB.getMyFavoriteByRecommend(newParam, (results) => {
      res.json({
        status: 200,
        message: "success",
        data: results,
        timestamp: Date.now(),
      });
    });
  }
});
//通过关键字模糊查询视频
router.get("/searchByKey", (req, res) => {
  reconmmendDB.searchByKey(req.query, (results) => {
    res.json({
      status: 200,
      message: "success!",
      data: results,
      timestamp: Date.now(),
    });
  });
});
//查找视频和用户
router.get("/findVideo", (req, res) => {
  reconmmendDB.findVideo(req.query, (results) => {
    res.json({
      status: 200,
      message: "success!",
      data: results,
      timestamp: Date.now(),
    });
  });
});
//查看我的视频
router.get("/findById", (req, res) => {
  reconmmendDB.findById(req.query, (results) => {
    res.json({
      status: 200,
      message: "success!",
      data: results,
      timestamp: Date.now(),
    });
  });
});

router.get("/findAll", (req, res) => {
  reconmmendDB.findAll((results) => {
    res.json({
      status: 200,
      message: "success",
      data: results,
      timestamp: Date.now(),
    });
  });
});

//新增或修改推荐信息接口
router.post("/saveOrUpdate", isLoginMid, (req, res) => {
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
    console.log("newParam", newParam);
    reconmmendDB.saveOrUpdate(newParam, (results) => {
      res.json({
        status: 200,
        message: "success!",
        data: results,
        timestamp: Date.now(),
      });
    });
  }
});
module.exports = router;
