var express = require("express");
var upload = express.Router();
// var multiparty = require("multiparty");
// var util = require("util");
var path = require("path");
var fs = require("fs");
var multer = require("multer");
// 引入七牛模块
var qiniu = require("qiniu");

//初始化上传对象 设置上传的路径
var up = multer({ dest: "./public/upload" });

//单文件上传，调用
upload.post("/uploadImg", up.single("fileimg"), (req, res) => {
  console.log("表单内容-", req.file);
  console.log("表单其它字段-", req.body.imgArrIndex);
  //获得是第几步步骤的图片
  let sortImg = req.body.imgArrIndex;
  //文件改名
  let oldPath = req.file.destination + "/" + req.file.filename;
  let extname = path.extname(req.file.originalname);
  console.log("后缀名：", extname);
  let newPath =
    req.file.destination + "/" + req.file.filename + req.file.originalname;
  fs.rename(oldPath, newPath, (err) => {
    console.log("rename err", err);
    console.log("原文件名:" + oldPath);
    console.log("改名！！", newPath);
  });

  if (extname == ".mp4") {
    //视频上传到七牛云的空间zcsdapp04-mp4
    qN_upload(newPath, "zcsdapp04-mp4");
    //视频的外链
    var baseUrl = "http://q9arqb79d.bkt.clouddn.com/";
  } else {
    //图片上传到七牛云的空间zcsdapp04-img
    qN_upload(newPath, "zcsdapp04-img");
    //图片的外链;
    var baseUrl = "http://q9ar0mmzo.bkt.clouddn.com/";
  }
  //返回上传成功的图片地址地址
  let url = req.file.filename + req.file.originalname;
  // var baseImageUrl = "http://q7omf6b37.bkt.clouddn.com"; // 域名名称
  let imgUrl = baseUrl + url;
  res.json({
    status: 200,
    message: "文件上传成功！",
    data: [{ Sort: sortImg, url: imgUrl }], //返回一个文件地址
    timestamp: Date.now(),
  });
});

//多文件上传
upload.post("/uploadImgs", up.array("files"), (req, res) => {
  console.log("表单内容-", req.files);
  //存放上传成功图片的url数组
  var imgArr = [];
  for (var i = 0; i < req.files.length; i++) {
    console.log("file---------------------------", req.files[i]);
    //文件改名
    let oldPath = req.files[i].destination + "/" + req.files[i].filename;
    let extname = path.extname(req.files[i].originalname);
    console.log("后缀名：", extname);
    let newPath =
      req.files[i].destination +
      "/" +
      req.files[i].filename +
      req.files[i].originalname;
    fs.rename(oldPath, newPath, (err) => {
      console.log("rename err", err);
      console.log("原文件名:" + oldPath);
      console.log("改名！！", newPath);
    });

    if (extname == ".mp4") {
      qN_upload(newPath, "zcsdapp04-mp4");
      var baseUrl = "http://q9arqb79d.bkt.clouddn.com/";
    } else {
      qN_upload(newPath, "zcsdapp04-img");
      var baseUrl = "http://q9ar0mmzo.bkt.clouddn.com/";
    }
    var url = req.files[i].filename + req.files[i].originalname;
    var imgUrl = baseUrl + url;
    imgArr.push(imgUrl);
  }
  console.log("imgArr=====", imgArr);
  res.json({
    status: 200,
    message: "文件上传成功！",
    data: [{ url: imgArr }], //返回一个多文件地址
    timestamp: Date.now(),
  });
});

// 上传七牛云
function qN_upload(destPath, bucket) {
  var bucket = bucket;
  var accessKey = "4DFfiEmSnLvbHeo-zs-TbuEGbZRE2d37R1vO7VAa";
  var secretKey = "IhXeyKerbfpoWN3Yas5l3WED2Vs2pAt-61a5AhDH";
  var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);

  var options = {
    scope: bucket,
  };
  var putPolicy = new qiniu.rs.PutPolicy(options);
  var uploadToken = putPolicy.uploadToken(mac);

  var config = new qiniu.conf.Config();
  config.zone = qiniu.zone.Zone_z0;

  // qiniu.conf.ACCESS_KEY = "sGD53dZN0XfOOtqiCQoR1kIG6qEMgZnmKxxKXVVA";
  // qiniu.conf.SECRET_KEY = "dIdSwlfhpWCiePIi48Lkggfz2w1GKjiUDQxy0ABh";

  //存储本地文件到七牛云中，并返回路径
  // var destPath = destPath; //问题出在上传的图片得不到，变为二进制了
  // var destPath = "./public/upload/123456.jpg";
  var localFile = destPath;
  var key = path.basename(destPath);
  var extra = new qiniu.form_up.PutExtra();
  const config1 = new qiniu.conf.Config();
  const formUploader = new qiniu.form_up.FormUploader(config1);

  console.log("====", uploadToken, key, localFile, extra, "+++");
  formUploader.putFile(uploadToken, key, localFile, extra, function (err, ret) {
    if (!err) {
      console.log("上传七牛云成功ret:", ret);
    } else {
      console.log(err);
    }
  });
}

module.exports = upload;
