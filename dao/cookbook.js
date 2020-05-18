//封装方法，编写不同的sql语句，处理不同的数据逻辑
const pool = require("../pool");
/**
 * 查找所有菜谱信息
 * @param {Function} handle
 */
let findAll = (handle) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;
    // "select * from recommend as r LEFT JOIN user as u on r.user_id=u.id ORDER BY r.time desc limit 8"
    let sql =
      "select * from cookbook  left join user  on cookbook.user_id=user.id ORDER BY cookbook.time desc";
    conn.query({ sql, nestTables: true }, [], (err, results) => {
      if (err) throw err;
      handle(results);
      conn.release();
    });
  });
};
/**
 * 通过id查找菜谱信息
 * @param {Object} param {id}
 * @param {Function} handle
 */
let findById = (param, handle) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;
    let sql = "select * from cookbook where id=?";
    conn.query(sql, [param.id], (err, results) => {
      if (err) throw err;
      handle(results);
      conn.release();
    });
  });
};
/**
 * 分页查找所有菜谱信息
 * @param {Object} {page,pageSize}
 * @param {Function} handle
 */
let query = (param, handle) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;
    let sql = "select * from cookbook limit ? , ? ";
    conn.query(
      sql,
      [(param.page - 1) * param.pageSize, param.pageSize],
      (err, results) => {
        if (err) throw err;
        handle(results);
        conn.release();
      }
    );
  });
};
/**
 * 通过id查找菜谱信息
 * @param {Object} param {id}
 * @param {Function} handle
 */
let findByUserId = (param, handle) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;
    let sql = "select * from cookbook where user_id=?";
    conn.query(sql, [param.id], (err, results) => {
      if (err) throw err;
      handle(results);
      conn.release();
    });
  });
};
/**
 * 通过分类id查找菜谱信息
 * @param {Object} param {id}
 * @param {Function} handle
 */
let findByCategoryId = (param, handle) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;
    let sql = "select * from cookbook where category_id=?";
    conn.query(sql, [param.id], (err, results) => {
      if (err) throw err;
      handle(results);
      conn.release();
    });
  });
};
/**
 * 通过关键字查找菜谱信息
 * @param {Object} param {id}
 * @param {Function} handle
 */
let searchByKey = (param, handle) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;
    let sql =
      "select * from cookbook left join user on cookbook.user_id=user.id where (name like ? or detail like ?)";
    conn.query(
      { sql, nestTables: true },
      ["%" + param.keyword + "%", "%" + param.keyword + "%"],
      (err, results) => {
        if (err) throw err;
        handle(results);
        conn.release();
      }
    );
  });
};
/**
 * 通过id删除菜谱信息
 * @param {Object} param {id}
 * @param {Function} handle
 */
let deleteById = (param, handle) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;
    let sql = "delete from cookbook where id=?";
    conn.query(sql, [param.id], (err, results) => {
      if (err) throw err;
      handle(results);
      conn.release();
    });
  });
};
/**
 * 批量删除菜谱信息
 * @param {Array} ids []
 * @param {Function} handle
 */
let bathDelete = (param, handle) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;
    // let sql='delete from cookbook where id in (?)'
    let sql = `delete from cookbook where id in(`; //用来拼接
    for (let i = 0; i < param.ids.length - 1; i++) {
      //循环拼接sql
      sql = sql + param.ids[i] + `,`;
    }
    sql = sql + param.ids[param.ids.length - 1] + `)`; //拼接结尾
    conn.query(sql, [param.ids], (err, results) => {
      if (err) throw err;
      handle(results);
      conn.release();
    });

    // conn.query(sql, [param.ids], (err, results) => {
    //   if (err) throw err;
    //   let sql2 = "select LAST_INSERT_ID()"; //获得最后添加的自增id
    //   conn.query(sql2, [], (result2) => {
    //     if (err) throw err;
    //     console.log("cookbook得到的id result2：", result2);
    //     //克隆一份上个sql语句的结果和当前结果重新作为结果
    //     let result = Object.assign({}, results, result2);
    //     console.log("增加数据成功后包含了返回自增id的结果：", result);
    //     handle(result);
    //     conn.release();
    //   });
    // });
  });
};
/**
 * 保存或更新菜谱信息
 * @param {Object} param {id,……}
 * @param {Function} handle
 */
let saveOrUpdate = (param, handle) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;
    let sql = "";
    console.log("dao层中得到的param", param);
    console.log("dao层中得到的param.user_id", param.user_id);

    if (param.id) {
      //更新
      sql =
        "update cookbook set name=?,detail=?,image=?,time=? ,user_id=?,category_id=? where id=?";
    } else {
      //新增
      sql =
        "insert into cookbook(name,detail,image,time,user_id,category_id) value(?,?,?,?,?,?)";
    }
    conn.query(
      sql,
      [
        param.name,
        param.detail,
        param.image,
        param.time,
        param.user_id + "",
        param.id,
        param.category_id,
      ],
      (err, results) => {
        let sql2 = "select LAST_INSERT_ID()"; //获得最后添加的自增id
        conn.query(sql2, [], (result2) => {
          if (err) throw err;
          console.log("cookbook得到的id result2：", result2);
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
  query,
  findById,
  findByUserId,
  findByCategoryId,
  deleteById,
  bathDelete,
  saveOrUpdate,
  searchByKey,
};
