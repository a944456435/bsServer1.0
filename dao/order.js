//封装方法，编写不同的sql语句，处理不同的数据逻辑
const pool = require("../pool");
/**
 * 查找所有订单信息
 * @param {Function} handle
 */
let findAll = (id, handle) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;
    let sql =
      // "select * from `order` left join orderItem on `order`.id=orderItem.order_id  where user_id=?";
      "select * from (`order` left join orderItem on `order`.id=orderItem.order_id  and user_id=?) LEFT JOIN mall on orderItem.mall_id=mall.id LEFT JOIN address ON `order`.address_id=address.id";
    conn.query({ sql, nestTables: true }, [id + ""], (err, results) => {
      if (err) throw err;
      handle(results);
      conn.release();
    });
  });
};
/**
 * 通过id查找订单信息
 * @param {Object} param {id}
 * @param {Function} handle
 */
let findById = (param, handle) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;
    let sql = "select * from `order`  where id=?";
    conn.query(sql, [param.id], (err, results) => {
      if (err) throw err;
      handle(results);
      conn.release();
    });
  });
};

/**
 * 通过id删除订单信息
 * @param {Object} param {id}
 * @param {Function} handle
 */
let deleteById = (param, handle) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;
    let sql = "delete from `order` where id=?";
    conn.query(sql, [param.id], (err, results) => {
      if (err) throw err;
      handle(results);
      conn.release();
    });
  });
};
/**
 * 保存或更新订单信息
 * @param {Object} param {id,……}
 * @param {Function} handle
 */
let save = (param, handle) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;
    let sql =
      "insert into `order`(orderTime,total,user_id,address_id) value(?,?,?,?)";
    conn.query(
      sql,
      [param.orderTime, param.total, param.user_id + "", param.address_id],
      (err, results) => {
        if (err) throw err;
        let sql2 = "select LAST_INSERT_ID()"; //获得最后添加的自增id
        conn.query(sql2, [], (result2) => {
          if (err) throw err;
          console.log("order得到的id result2：", result2);
          //克隆一份上个sql语句的结果和当前结果重新作为结果
          let result = Object.assign({}, results, result2);
          console.log("增加数据成功后包含了返回自增id的结果：", result);
          handle(result);
          conn.release();
        });
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
