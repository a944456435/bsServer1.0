//封装方法，编写不同的sql语句，处理不同的数据逻辑
const pool = require("../pool");
/**
 * 降序查找最近的8条动态信息
 * @param {Function} handle
 */
let findAll = (handle) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;
    let sql = "select * from dynamic order by releaseTime desc limit 8";
    conn.query(sql, [], (err, results) => {
      if (err) throw err;
      handle(results);
      conn.release();
    });
  });
};
/**
 * 获取最近动态信息
 * @param {Function} handle
 */
let cascadQuery = (handle) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;
    // let sql='select * from dynamic order by innerreleaseTime desc limit 8'
    let sql =
      "Select *,dynamic.id as dynamic_id,user.id as user_id from dynamic  inner JOIN user ON dynamic.userId = user.id ORDER BY dynamic_id desc";
    conn.query(sql, [], (err, results) => {
      if (err) throw err;
      handle(results);
      conn.release();
    });
  });
};
/**
 * 通过id查找动态信息
 * @param {Object} param {id}
 * @param {Function} handle
 */
let findById = (param, handle) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;
    let sql = "select * from dynamic where id=?";
    conn.query(sql, [param.id], (err, results) => {
      if (err) throw err;
      handle(results);
      conn.release();
    });
  });
};
/**
 * 通过id删除动态信息
 * @param {Object} param {id}
 * @param {Function} handle
 */
let deleteById = (param, handle) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;
    let sql = "delete from dynamic where id=?";
    conn.query(sql, [param.id], (err, results) => {
      if (err) throw err;
      handle(results);
      conn.release();
    });
  });
};
/**
 * 保存或更新动态信息
 * @param {Object} param {id,……}
 * @param {Function} handle
 */
let save = (param, handle) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;
    let sql = "";

    //新增
    sql = "insert into dynamic(text,other,userId) value(?,?,?)";
    conn.query(sql, [param.text, param.other, param.userId], (err, results) => {
      if (err) throw err;
      handle(results);
      conn.release();
    });
  });
};
module.exports = {
  findAll,
  findById,
  deleteById,
  save,
  cascadQuery,
};
