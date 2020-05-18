//封装方法，编写不同的sql语句，处理不同的数据逻辑
const pool = require("../pool");
/**
 * 查找我收藏的作品(菜谱)
 * @param {Function} handle
 */
let getMyFavoriteByCookbook = (param, handle) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;
    let sql1 =
      "select * from cookbook WHERE id in (select cook_id from favorite where user_id=?)";
    // let sql2 =
    //   "select * from recommend where id in (select recommend_id from favorite where user_id=?)";
    conn.query(sql1, [param.user_id], (err, results) => {
      if (err) throw err;

      handle(results);
      conn.release();
    });
  });
};
/**
 * 查找所有收藏信息
 * @param {Function} handle
 */
let findAll = (param, handle) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;
    let sql = "select * from favorite where cook_id=? or recommend_id=?";
    conn.query(sql, [param.cook_id, param.recommend_id], (err, results) => {
      if (err) throw err;
      handle(results);
      conn.release();
    });
  });
};
/**
 * 通过id查找收藏信息
 * @param {Object} param {id}
 * @param {Function} handle
 */
let findById = (param, handle) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;
    //判断当前用户是否收藏了当前视频、菜谱
    let sql =
      "select * from favorite WHERE user_id=? AND (cook_id=? or recommend_id=?)";
    conn.query(
      sql,
      [param.user_id, param.cook_id, param.recommend_id],
      (err, results) => {
        if (err) throw err;
        handle(results);
        conn.release();
      }
    );
  });
};
/**
 * 通过id删除收藏信息
 * @param {Object} param {id}
 * @param {Function} handle
 */
let deleteById = (param, handle) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;

    let sql =
      "delete from favorite where user_id=? AND (cook_id=? or recommend_id=?)";
    conn.query(
      sql,
      [param.user_id, param.cook_id, param.recommend_id],
      (err, results) => {
        if (err) throw err;
        handle(results);
        conn.release();
      }
    );
  });
};

/**
 * 保存或更新收藏信息
 * @param {Object} param {id,……}
 * @param {Function} handle
 */
let saveFavorite = (param, handle) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;
    let sql = "";

    //新增user_idcook_id
    sql =
      "insert into favorite(time,user_id,cook_id,recommend_id) value(?,?,?,?)";

    conn.query(
      sql,
      [param.time, param.user_id + "", param.cook_id, param.recommend_id],
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
  getMyFavoriteByCookbook,
  deleteById,
  saveFavorite,
};
