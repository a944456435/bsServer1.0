//封装方法，编写不同的sql语句，处理不同的数据逻辑
const pool = require("../pool");
/**
 * 用户登陆
 * @param {loginname,password}
 * @param {Function} handle
 */
let login = (param, handle) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;
    let sql = "select * from user where loginname=? and password=?";
    conn.query(sql, [param.loginname, param.password], (err, results) => {
      if (err) throw err;
      handle(results);
      conn.release();
    });
  });
};
/**
 * 查找所有用户信息
 * @param {Function} handle
 */
let findAll = (handle) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;
    let sql = "select * from user";
    // let sql='select * from ej_category'
    conn.query(sql, [], (err, results) => {
      if (err) throw err;
      handle(results);
      conn.release();
    });
  });
};
let findUserById = (param, handle) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;
    let sql = "select * from user where id=?";
    conn.query(sql, [param.id], (err, results) => {
      if (err) throw err;
      handle(results);
      conn.release();
    });
  });
};
/**
 * 通过id查找用户信息
 * @param {Object} param {id}
 * @param {Function} handle
 */
let findById = (id, handle) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;
    let sql = "select * from user where id=?";
    conn.query(sql, [id], (err, results) => {
      if (err) throw err;
      handle(results);
      conn.release();
    });
  });
};
/**
 * 通过关键字模糊查询用户信息
 * @param {Object} param {id}
 * @param {Function} handle
 */
let searchByKey = (param, handle) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;
    let sql =
      "select * from user where (username like ? or city like ? or sex like ? or occupation like ?)";
    conn.query(
      sql,
      [
        "%" + param.keyword + "%",
        "%" + param.keyword + "%",
        "%" + param.keyword + "%",
        "%" + param.keyword + "%",
      ],
      (err, results) => {
        if (err) throw err;
        handle(results);
        conn.release();
      }
    );
  });
};
/**
 * 通过id删除用户信息
 * @param {Object} param {id}
 * @param {Function} handle
 */
let deleteById = (param, handle) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;
    let sql = "delete from user where id=?";
    conn.query(sql, [param.id], (err, results) => {
      if (err) throw err;
      handle(results);
      conn.release();
    });
  });
};
/**
 * 保存或更新用户信息
 * @param {Object} param {id,……}
 * @param {Function} handle
 */
let saveOrUpdate = (param, handle) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;
    let sql = "";
    //先判断当前登录名是否可用
    sql = "select loginname from user where loginname=?";
    console.log("登陆名", param.loginname);
    conn.query(sql, [param.loginname], (err, res) => {
      console.log(
        "select loginname from user语句查询是否存在用户",
        JSON.stringify(res).length > 2
      );
      console.log("注册或修该传来的数据", param);
      // 没有当前loginname则注册，新增用户 res为空

      if (JSON.stringify(res).length > 2) {
        let results = "fail";
        if (param.id) {
          //更新
          sql =
            "update user set username=?,password=?,loginname=?,registrationTime=?,sex=?,Email=?,city=?,photo=?,age=?,occupation=?,description=? where id=?";
          conn.query(
            sql,
            [
              param.username,
              param.password,
              param.loginname,
              param.registrationTime,
              param.sex,
              param.Email,
              param.city,
              param.photo,
              param.age,
              param.occupation,
              param.description,
              param.id,
            ],
            (err, results) => {
              if (err) throw err;
              handle(results);
              conn.release();
            }
          );
        }
        return handle(results);
      }
      //有当前期loginname则修改用户信息 res不为空 res
      //当前用户名可用,进行插入或更新操作
      // if (param.id) {
      //更新
      //   sql =
      //     "update user set username=?,password=?,loginname=?,registrationTime=?,sex=?,Email=?,city=?,photo=?,age=?,occupation=?,description=? where id=?";
      // } else {
      //新增
      sql =
        "insert into user(username,password,loginname,registrationTime) value(?,?,?,?)";
      // }
      conn.query(
        sql,
        [
          param.username,
          param.password,
          param.loginname,
          param.registrationTime,
          param.sex,
          param.Email,
          param.city,
          param.photo,
          param.age,
          param.occupation,
          param.description,
          param.id,
        ],
        (err, results) => {
          if (err) throw err;
          handle(results);
          conn.release();
        }
      );
    });
  });
};
module.exports = {
  login,
  findAll,
  findById,
  findUserById,
  deleteById,
  saveOrUpdate,
  searchByKey,
};
