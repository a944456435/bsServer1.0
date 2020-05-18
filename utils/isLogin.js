//判断是否登陆中间件
function isLoginMid(req, res, next) {
  console.log(req.session.id, "req.session.id");
  console.log(req.session.username, "req.session");
  if (req.session.username == undefined) {
    console.log("isLoginMid : error");

    res.json({
      status: 500,
      message: "请重新登陆！",
      data: [],
      timestamp: Date.now(),
    });
  } else {
    console.log("isLoginMid : success");
    //已登录，进入正常页面
    next();
  }
}
module.exports = isLoginMid;
