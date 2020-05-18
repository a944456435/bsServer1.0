const mysql = require("mysql");
//创建连接池对象
const pool = mysql.createPool({
  multipleStatements: true, //开放一次执行多个sql语句
  host: "101.132.112.10",
  port: 3306,
  user: "root",
  password: "root",
  database: "newCook",
});
//导出
module.exports = pool;
