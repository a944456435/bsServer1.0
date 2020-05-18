//封装方法，编写不同的sql语句，处理不同的数据逻辑
const pool = require("../pool");
/**
 * 查找所有订单项信息
 * @param {Function} handle
 */
let findAll = (id, handle) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;
    let sql =
      // "select * from (orderItem LEFT JOIN `order` on `order`.id=orderItem.order_id)  LEFT JOIN mall ON orderItem.mall_id=mall.id WHERE mall.user_id=?";
      " select * from (orderItem LEFT JOIN `order` on `order`.id=orderItem.order_id LEFT JOIN `user` ON `order`.user_id=`user`.id  LEFT JOIN address ON `order`.address_id=address.id)  LEFT JOIN mall ON orderItem.mall_id=mall.id WHERE mall.user_id=?";

    conn.query({ sql, nestTables: true }, [id + ""], (err, results) => {
      if (err) throw err;
      handle(results);
      conn.release();
    });
  });
};
/**
 * 通过id查找订单项信息
 * @param {Object} param {id}
 * @param {Function} handle
 */
let findById = (param, handle) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;
    let sql = "select * from orderItem where id=?";
    conn.query(sql, [param.id], (err, results) => {
      if (err) throw err;
      handle(results);
      conn.release();
    });
  });
};

/**
 * 通过id删除订单项信息
 * @param {Object} param {id}
 * @param {Function} handle
 */
let deleteById = (param, handle) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;
    let sql = "delete from orderItem where id=?";
    conn.query(sql, [param.id], (err, results) => {
      if (err) throw err;
      handle(results);
      conn.release();
    });
  });
};
/**
 * 保存或更新订单项信息
 * @param {Object} param {id,……}
 * @param {Function} handle
 */
let save = (param, handle) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;
    let sql = "insert into orderItem(number,order_id,mall_id) value(?,?,?)";
    conn.query(
      sql,
      [param.number, param.order_id, param.mall_id],
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
  save,
};
