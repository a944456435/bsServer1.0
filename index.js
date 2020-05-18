const express = require("express");
const bodyParser = require("body-parser");
let cookieParser = require("cookie-parser");
const user = require("./routes/user");
const category = require("./routes/category");
const cookbook = require("./routes/cookbook");
const favorite = require("./routes/favorite");
const comment = require("./routes/comment");
const ingredients = require("./routes/ingredients");
const practice = require("./routes/practice");
const upload = require("./routes/upload");
const attention = require("./routes/attention");
const recommend = require("./routes/recommend");
const mall = require("./routes/mall");
const address = require("./routes/address");
const order = require("./routes/order");
const orderItem = require("./routes/orderItem");
let app = express();
// const cookieParser = require("cookie-parser");
const session = require("express-session");

//使用中间件
// app.use(bodyParser.urlencoded({extended:true}))
// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//拦截器,允许跨域
app.all("*", (req, res, next) => {
  res.set({
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "text/plain;chartset=utf-8",
    "Access-Control-Allow-Credentials": true,
  });
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFei"
  );
  // res.header("Access-Control-Allow-Origin", "http://localhost"); //如果要发送Cookie，就不能设为星号，必须指定明确的、与请求网页一致的域名
  // res.header("Access-Control-Allow-Credentials", true); //允许带cookies
  next(); //拦截后记得放行
});

//cookies
app.use(cookieParser("sessiontest")); //secret加密
//session配置
app.use(
  session({
    secret: "sessiontest",
    resave: true, //强制保存
    saveUninitialized: true, //初始化保存
    // cookie: {
    //   maxAge: 7 * 24 * 60 * 60 * 1000, //设置seesion有效期
    //   secure: true,
    // },
  })
);

//使用路由对象
app.use("/user", user);
app.use("/category", category);
app.use("/attention", attention);
app.use("/cookbook", cookbook);
app.use("/favorite", favorite);
app.use("/comment", comment);
app.use("/ingredients", ingredients);
app.use("/practice", practice);
app.use("/upload", upload);
app.use("/recommend", recommend);
app.use("/mall", mall);
app.use("/address", address);
app.use("/order", order);
app.use("/orderItem", orderItem);

var net = require("net");

// 检测端口是否被占用
function portIsOccupied(port) {
  // 创建服务并监听该端口
  var server = net.createServer().listen(port);

  server.on("listening", function () {
    // 执行这块代码说明端口未被占用
    server.close(); // 关闭服务
    console.log("The port【" + port + "】 is available."); // 控制台输出信息
    app.listen(3000, () => {
      console.log("3000端口已经启动。。。");
    });
  });
  server.on("error", function (err) {
    if (err.code === "EADDRINUSE") {
      // 端口已经被使用
      console.log(
        "The port【" + port + "】 is occupied, please change other port."
      );
    }
  });
}

// 执行
portIsOccupied(3000);
