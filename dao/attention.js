//封装方法，编写不同的sql语句，处理不同的数据逻辑
const pool = require("../pool");
/**
 * 查找所有关注信息
 * @param {Function} handle
 */
let findAll = (handle) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;
    let sql = "select * from attention";
    conn.query(sql, [], (err, results) => {
      if (err) throw err;
      handle(results);
      conn.release();
    });
  });
};
/**
 * 通过id查找关注信息
 * @param id 用户id
 * @param {Function} handle
 */
let findById = (id, handle) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;
    //查找我关注了那些用户

    let sql =
      "select  * from user where id in (select fans_id from attention where user_id=?)";
    //查找  关注了我的粉丝

    // let sql =
    // "select  * from user where id in (select user_id from attention where fans_id=?)";
    conn.query(sql, [id], (err, results) => {
      if (err) throw err;
      handle(results);
      conn.release();
    });
  });
};

/**
 * 查看我是否对该用户进行了关注
 * @param
 * @param {Function} handle
 */
let findIsAttention = (param, handle) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;
    let sql = "select  * from attention where user_id=? and fans_id=?";
    conn.query(sql, [param.user_id, param.fans_id], (err, results) => {
      if (err) throw err;
      handle(results);
      conn.release();
    });
  });
};
/**
 * 通过id删除关注信息
 * @param {Object} param {id}
 * @param {Function} handle
 */
let deleteById = (param, handle) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;
    let sql = "delete from attention where fans_id=? and user_id=?";
    conn.query(sql, [param.fans_id, param.user_id], (err, results) => {
      if (err) throw err;
      handle(results);
      conn.release();
    });
  });
};
/**
 * 保存或更新关注信息
 * @param {Object} param {id,……}
 * @param {Function} handle
 */
let saveAttention = (param, handle) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;
    let sql = "";

    //新增关注
    sql = "insert into attention(user_id,fans_id) value(?,?)";
    conn.query(sql, [param.user_id, param.fans_id], (err, results) => {
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
  saveAttention,
  findIsAttention,
};
