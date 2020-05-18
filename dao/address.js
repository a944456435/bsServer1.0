//封装方法，编写不同的sql语句，处理不同的数据逻辑
const pool = require("../pool");
/**
 * 查找某个用户的所有地址信息
 * @param {Function} handle
 */
let findAll = (param, handle) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;
    let sql = "select * from address where user_id=?";
    conn.query(sql, [param], (err, results) => {
      if (err) throw err;
      handle(results);
      conn.release();
    });
  });
};
/**
 * 通过id查找某个地址信息
 * @param {Object} param {id}
 * @param {Function} handle
 */
let findById = (param, handle) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;
    let sql = "select * from address  where id=?";
    conn.query(sql, [param.id], (err, results) => {
      if (err) throw err;
      handle(results);
      conn.release();
    });
  });
};

/**
 * 通过id删除地址信息
 * @param {Object} param {id}
 * @param {Function} handle
 */
let deleteById = (param, handle) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;
    let sql = "delete from address where id=?";
    conn.query(sql, [param.id], (err, results) => {
      if (err) throw err;
      handle(results);
      conn.release();
    });
  });
};
/**
 * 保存或更新地址信息
 * @param {Object} param {id,……}
 * @param {Function} handle
 */
let saveOrUpdate = (param, handle) => {
  console.log("address dao param", param);
  pool.getConnection((err, conn) => {
    if (err) throw err;
    let sql = "";
    if (param.id) {
      //更新
      sql =
        "update address set name=?,telphone=?,province=?,city=?,area=?,address=?,user_id=? where id=?";
    } else {
      //新增
      sql =
        "insert into address(name,telphone,province,city,area,address,user_id) value(?,?,?,?,?,?,?)";
    }
    conn.query(
      sql,
      [
        param.name,
        param.telphone,
        param.province,
        param.city,
        param.area,
        param.address,
        param.user_id + "",
        param.id,
      ],
      (err, results) => {
        if (err) throw err;
        handle(results);
        conn.release();
      }
    );
  });
};
module.exports = {
  findAll,
  findById,
  deleteById,
  saveOrUpdate,
};
