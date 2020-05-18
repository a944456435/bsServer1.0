//封装方法，编写不同的sql语句，处理不同的数据逻辑
const pool = require("../pool");
/**
 * 查找所有商品信息
 * @param {Function} handle
 */
let findAll = (handle) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;
    let sql = "select * from mall";
    conn.query(sql, [], (err, results) => {
      if (err) throw err;
      handle(results);
      conn.release();
    });
  });
};
/**
 * 通过id查找商品信息
 * @param {Object} param {id}
 * @param {Function} handle
 */
let findById = (param, handle) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;
    let sql = "select * from mall where id=?";
    conn.query(sql, [param.id], (err, results) => {
      if (err) throw err;
      handle(results);
      conn.release();
    });
  });
};
let findMallByUserId = (id, handle) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;
    let sql = "select * from mall where user_id=?";
    conn.query(sql, [id], (err, results) => {
      if (err) throw err;
      handle(results);
      conn.release();
    });
  });
};
/**
 * 通过id查找商品评论信息
 * @param {Object} param {id}
 * @param {Function} handle
 */
let findCommentById = (param, handle) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;
    let sql =
      "select * from comment left join user on comment.user_id=user.id where mall_id=? ";
    conn.query({ sql, nestedTables: true }, [param.id], (err, results) => {
      if (err) throw err;
      handle(results);
      conn.release();
    });
  });
};
/**
 * 通过id删除商品信息
 * @param {Object} param {id}
 * @param {Function} handle
 */
let deleteById = (param, handle) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;
    let sql = "delete from mall where id=?";
    conn.query(sql, [param.id], (err, results) => {
      if (err) throw err;
      handle(results);
      conn.release();
    });
  });
};
/**
 * 保存或更新商品信息
 * @param {Object} param {id,……}
 * @param {Function} handle
 */
let saveOrUpdate = (param, handle) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;
    let sql = "";
    if (param.id) {
      //更新
      sql =
        "update mall set name=?,price=?,descript=?,images=?,user_id=?,time=?,original_price=?,sale=?,unit=? where id=?";
    } else {
      //新增
      sql =
        "insert into mall(name,price,descript,images,user_id,time,original_price,sale,unit) value(?,?,?,?,?,?,?,?,?)";
    }
    conn.query(
      sql,
      [
        param.name,
        param.price,
        param.descript,
        param.images,
        param.user_id + "",
        param.time,
        param.original_price,
        param.sale || 0,
        param.unit,
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
  findCommentById,
  findMallByUserId,
};
