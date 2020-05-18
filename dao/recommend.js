const pool = require("../pool");

let delteALLById = (param, handle) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;
    let sql = "delete from recommend where user_id=?";
    conn.query(sql, [param.user_id], (err, results) => {
      if (err) throw err;
      handle(results);
      conn.release();
    });
  });
};
let delteById = (param, handle) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;
    let sql = "delete from recommend where id=?";
    conn.query(sql, [param.id], (err, results) => {
      if (err) throw err;
      handle(results);
      conn.release();
    });
  });
};
/**
 * 查找我收藏的作品
 * @param {Function} handle
 */
let getMyFavoriteByRecommend = (param, handle) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;

    let sql2 =
      "select * from recommend where id in (select recommend_id from favorite where user_id=?)";
    conn.query(sql2, [param.user_id], (err, results) => {
      if (err) throw err;

      handle(results);
      conn.release();
    });
  });
};
//查找视频和用户
let findVideo = (param, handle) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;
    //select * from recommend left join user on recommend.user_id=user.id where recommend.id=16
    let sql =
      "select * from recommend left join user on recommend.user_id=user.id where recommend.id=? ";
    conn.query({ sql, nestTables: true }, [param.id], (err, results) => {
      if (err) throw err;
      handle(results);
      conn.release();
    });
  });
};
//查找用户的视频
let findById = (param, handle) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;
    let sql = "select * from recommend where user_id=?";
    conn.query(sql, [param.id], (err, results) => {
      if (err) throw err;
      handle(results);
      conn.release();
    });
  });
};

//通过关键字查询推荐信息
let searchByKey = (param, handle) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;
    let sql =
      "select * from recommend left join user on recommend.user_id=user.id where title like ?  ";
    conn.query(
      { sql, nestTables: true },
      ["%" + param.keyword + "%"],
      (err, results) => {
        if (err) throw err;
        handle(results);
        conn.release();
      }
    );
  });
};
//查看所有的推荐信息
let findAll = (handle) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;
    let sql =
      "select * from recommend  LEFT JOIN user  on recommend.user_id=user.id ORDER BY recommend.time desc ";
    conn.query({ sql, nestTables: true }, [], (err, results) => {
      if (err) throw err;
      handle(results);
      conn.release();
    });
  });
};

/**
 * 保存或更新推荐信息
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
        "update recommend set title=?,resource=?,time=?,user_id=? where id=?";
    } else {
      //新增
      sql = "insert into recommend(title,resource,time,user_id) value(?,?,?,?)";
    }
    conn.query(
      sql,
      [param.title, param.resource, param.time, param.user_id + ""],
      (err, results) => {
        if (err) throw err;
        handle(results);
        conn.release();
      }
    );
  });
};
module.exports = {
  findById,
  findVideo,
  getMyFavoriteByRecommend,
  delteALLById,
  delteById,
  findAll,
  saveOrUpdate,
  searchByKey,
};
