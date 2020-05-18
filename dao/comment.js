//封装方法，编写不同的sql语句，处理不同的数据逻辑
const pool = require("../pool");
/**
 * 查找所有评论信息
 * @param {Function} handle
 */
let findAll = (handle) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;
    let sql = "select * from comment";
    conn.query(sql, [], (err, results) => {
      if (err) throw err;
      handle(results);
      conn.release();
    });
  });
};
/**
 * 通过recommend id查找评论信息
 * @param {Object} param {id}
 * @param {Function} handle
 */
let findByRecommendId = (param, handle) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;
    let sql =
      "select * from comment  left join user  on comment.user_id=user.id where comment.recommend_id=?  ORDER BY comment.time desc";
    conn.query({ sql, nestTables: true }, [param.id], (err, results) => {
      if (err) throw err;
      handle(results);
      conn.release();
    });
  });
};
/**
 * 通过Cookbook id查找评论信息
 * @param {Object} param {id}
 * @param {Function} handle
 */
let findByCookbookId = (param, handle) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;
    let sql =
      "select * from comment  left join user  on comment.user_id=user.id where comment.cook_id=?  ORDER BY comment.time desc";
    conn.query({ sql, nestTables: true }, [param.id], (err, results) => {
      if (err) throw err;
      handle(results);
      conn.release();
    });
  });
};
/**
 * 通过id删除评论信息
 * @param {Object} param {id}
 * @param {Function} handle
 */
let deleteById = (param, handle) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;
    let sql = "delete from comment where id=?";
    conn.query(sql, [param.id], (err, results) => {
      if (err) throw err;
      handle(results);
      conn.release();
    });
  });
};
/**
 * 保存或更新评论信息
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
        "update comment set content=?,time=?,cook_id=?,user_id=?,recommend_id=?,mall_id=? where id=?";
    } else {
      //新增
      sql =
        "insert into comment(content,time,cook_id,user_id,recommend_id,mall_id) value(?,?,?,?,?,?)";
    }
    conn.query(
      sql,
      [
        param.content,
        param.time,
        param.cook_id,
        param.user_id + "",
        param.recommend_id,
        param.mall_id,
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
  findByRecommendId,
  findByCookbookId,
  deleteById,
  saveOrUpdate,
};
