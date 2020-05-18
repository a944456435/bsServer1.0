const express = require("express");
const crypto = require("crypto");
const userDB = require("../dao/user");
//检查是否登陆
const isLoginMid = require("../utils/isLogin");

let secretCookie = {};
//加密
function jiami(str) {
  let password = str + "whq";
  let sf = crypto.createHash("md5");
  //进行加密
  sf.update(password);
  //加密的二进制以字符串方式输出
  let content = sf.digest("hex");
  return content;
}

//设置加密cookie
function setSecretCookie(str, cookieVaule) {
  secretCookie[cookieVaule] = str; //k：经过加密的cookie、v：实际上的cookie
}
//得到解密的cookie
function getSecretCookie(cookieKey) {
  return secretCookie[cookieKey];
}

//创建路由对象
let user = express.Router();

//设置cookie
user.get("/setCookie", (req, res) => {
  //设置有效期，默认，浏览器关闭即失效
  // res.cookie("isLogin", "true", { maxAge: 10000, httpOnly: true });
  //设置加密
  // res.cookie("isLogin", "true", {
  //   signed: true,
  //   maxAge: 100000,
  //   httpOnly: true,
  // });

  let secretStr = jiami("true");
  res.cookie("isLogin", secretStr, {
    signed: true,
    maxAge: 100000,
    httpOnly: true,
  });
  //设置将加密的密文和明文内容放在某个位置
  setSecretCookie("true", secretStr);
  res.send("cookies 加密成功");
});
//获取cookie
user.get("/getCookie", (req, res) => {
  //cookie未加密时
  // console.log("cookie", req.cookies);
  // if (req.cookies.isLogin == "true") {
  //   return res.send("login success");
  // } else {
  //   return res.send("login error");
  // }
  //cookie加密后
  // console.log("cookie", req.signedCookies);
  // if (req.signedCookies.isLogin == "true") {
  //   return res.end("login success");
  // } else {
  //   return res.end("login error");
  // }
  //crypto算法加密
  // let password = "123456";
  // //使用加密算法
  // let sf = crypto.createHash("md5");
  // //进行加密
  // sf.update(password);
  // //加密的二进制以字符串方式输出
  // let content = sf.digest("hex");
  // res.end(content);

  // let strSecret = req.cookies.isLogin;
  // content = secretCookie[strSecret];
  let strSecret = req.signedCookies.isLogin; //加密后的密文
  content = secretCookie[strSecret];
  console.log("解密后isLogin的内容" + content);
  res.end(content);

  // console.log("cookie", req.signedCookies);
  // if (req.signedCookies.isLogin == "true") {
  //   return res.end("login success");
  // } else {
  //   return res.end("login error");
  // }
});
//设置session
user.get("/setSession", (req, res) => {
  //登陆后，能够快速获取用户的姓名，vip等级，是否登陆
  req.session.isLogin = "true";
  req.session.username = "zhangsan";
  req.session.vipLevel = 5;
  req.session.userId = 2;
  req.session.cookie.maxAge = 100000; //重置session有效期
  res.send("登陆状态已设置到session中");
});

//获得session中的数据
user.get("/getSession", (req, res) => {
  // console.log(req.session);
  if (req.session.isLogin) {
    res.send(
      "欢迎等级为" +
        req.session.vipLevel +
        "的" +
        req.session.username +
        "用户id：" +
        req.session.userId
    );
  } else {
    res.send("未登录！");
  }
});

//退出登陆
user.get("/logout", (req, res) => {
  req.session.destroy(() => {
    console.log("销毁完毕");
  });
  res.send("成功推出登陆");
});

//设置路由
//post登陆
user.post("/login", (req, res) => {
  console.log("登陆信息：", req.body);
  userDB.login(req.body, (results) => {
    if (results.length != 0) {
      let {
        username,
        loginname,
        password,
        gender,
        photo,
        Email,
        city,
        registrationTime,
        attentionId,
        id,
      } = results[0];
      req.session.isLogin = "true";
      req.session.username = username;
      req.session.loginname = loginname;
      req.session.password = password;
      req.session.gender = gender;
      req.session.photo = photo;
      req.session.Email = Email;
      req.session.photo = photo;
      req.session.city = city;
      req.session.registrationTime = registrationTime;
      req.session.attentionId = attentionId;
      req.session.userId = id; //用户id
      req.session.cookie.maxAge = 24 * 60 * 60 * 1000; //重置session有效期
      console.log(req.session.id, "登陆时设置的session");
      res.json({
        status: 200,
        message: "login success!",
        data: results,
        timestamp: Date.now(),
      });
    } else {
      //登陆失败
      res.json({
        status: 500,
        message: "login fails!",
        data: results,
        timestamp: Date.now(),
      });
    }
  });
});

//查找所有用户信息接口
user.get("/findAll", (req, res) => {
  //访问dao层，获取数据，响应数据
  userDB.findAll((results) => {
    res.json({
      status: 200,
      message: "success",
      data: results,
      timestamp: Date.now(),
    });
  });
});
//通过id获取用户信息接口(不需要登陆后才查找当前登陆者的信息)
user.get("/findUserById", (req, res) => {
  //访问dao层，获取数据，响应数据
  userDB.findUserById(req.query, (results) => {
    res.json({
      status: 200,
      message: "success",
      data: results,
      timestamp: Date.now(),
    });
  });
});
//通过id获取用户信息接口(验证登陆后才查找当前登陆者的信息)
user.get("/findById", isLoginMid, (req, res) => {
  console.log("req.session.userId++++++++++", req.session.userId);
  if (req.session.userId == undefined) {
    res.json({
      status: 500,
      message: "请重新登陆！",
      data: [],
      timestamp: Date.now(),
    });
  } else {
    //req.query
    //访问dao层，获取数据，响应数据
    userDB.findById(req.session.userId, (results) => {
      res.json({
        status: 200,
        message: "success",
        data: results,
        timestamp: Date.now(),
      });
    });
  }
});

//通过id获取用户信息接口（没有登陆的状态下查找对应的用户信息）
user.get("/findAllUserById", (req, res) => {
  console.log("findAllUserById req:", req.query.user_id);
  userDB.findById(req.query.user_id, (results) => {
    res.json({
      status: 200,
      message: "success",
      data: results,
      timestamp: Date.now(),
    });
  });
});
//通过关键字模糊查询用户信息接口
user.get("/searchByKey", (req, res) => {
  //req.query
  //访问dao层，获取数据，响应数据
  userDB.searchByKey(req.query, (results) => {
    res.json({
      status: 200,
      message: "success",
      data: results,
      timestamp: Date.now(),
    });
  });
});
//通过id删除用户信息接口
user.get("/deleteById", (req, res) => {
  //req.query
  //访问dao层，获取数据，响应数据
  userDB.deleteById(req.query, (results) => {
    res.json({
      status: 200,
      message: "success",
      data: results,
      timestamp: Date.now(),
    });
  });
});
//新增或修改用户信息接口
user.post("/saveOrUpdate", (req, res) => {
  //req.body
  //访问dao层，获取数据，响应数据
  console.log("注册信息：", req.body);
  userDB.saveOrUpdate(req.body, (results) => {
    if (results != "fail") {
      res.json({
        status: 200,
        message: "success",
        data: results,
        timestamp: Date.now(),
      });
    } else if (results == "fail") {
      res.json({
        status: 500,
        message: "登录名重复，请重新输入！",
        data: [],
        timestamp: Date.now(),
      });
    }
  });
});
//导出
module.exports = user;
