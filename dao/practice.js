//封装方法，编写不同的sql语句，处理不同的数据逻辑
const pool = require("../pool");
/**
 * 查找所有做法信息
 * @param {Function} handle
 */
let findAll = (handle) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;
    let sql = "select * from practice ";
    conn.query(sql, [], (err, results) => {
      if (err) throw err;
      handle(results);
      conn.release();
    });
  });
};
/**
 * 通过cookId查找做法信息
 * @param {Object} param {id}
 * @param {Function} handle
 */
let findBycookId = (param, handle) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;
    let sql = "select * from practice where cook_id=? ORDER BY step";
    conn.query(sql, [param.id], (err, results) => {
      if (err) throw err;
      handle(results);
      conn.release();
    });
  });
};
/**
 * 通过id删除做法信息
 * @param {Object} param {id}
 * @param {Function} handle
 */
let deleteById = (param, handle) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;
    let sql = "delete from practice where id=?";
    conn.query(sql, [param.id], (err, results) => {
      if (err) throw err;
      handle(results);
      conn.release();
    });
  });
};
/**
 * 保存或更新做法信息
 * @param {Object} param {id,……}
 * @param {Function} handle
 */
let saveOrUpdate = (param, handle) => {
  console.log("步骤表id", param);
  pool.getConnection((err, conn) => {
    if (err) throw err;
    let sql = "";
    if (param.id) {
      //更新
      sql = "update practice set step=?,images=?,text=?,cook_id=? where id=?";
    } else {
      //新增
      sql = "insert into practice(step,images,text,cook_id) value(?,?,?,?)";
    }
    conn.query(
      sql,
      [param.step, param.images, param.text, param.cook_id, param.id],
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
  findBycookId,
  deleteById,
  saveOrUpdate,
};
