//封装方法，编写不同的sql语句，处理不同的数据逻辑
const pool = require("../pool");
/**
 * 查找所有用户头像
 * @param {Function} handle
 */
let findAll = (handle) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;
    let sql = "select photo from user";
    conn.query(sql, [], (err, results) => {
      if (err) throw err;
      handle(results);
      conn.release();
    });
  });
};
/**
 * 通过id查找用户头像
 * @param {Object} param {id}
 * @param {Function} handle
 */
let findById = (param, handle) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;
    let sql = "select photo from user where id=?";
    conn.query(sql, [param.id], (err, results) => {
      if (err) throw err;
      handle(results);
      conn.release();
    });
  });
};
/**
 * 通过id删除用户头像
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
 * 保存或更新用户头像
 * @param {Object} param {id,……}
 * @param {Function} handle
 */
// let saveOrUpdate=(obj,handle)=>{
//     pool.getConnection((err,conn)=>{
//         if(err) throw err;
//         let sql=''
//         if(obj.id){
//             //更新
//             sql='update user set photo=?, username=? ,password=? where id=?'
//         }else{
//             //新增
//             sql='insert into user(id,username,password,photo) value(?,?,?,?)'
//         }
//         conn.query(sql,[obj.photo,obj.username,obj.password,obj.id],(err,results)=>{
//             if(err) throw err;
//             handle(results)
//             conn.release();
//         })
//     })
// }
module.exports = {
  findAll,
  findById,
  deleteById,
  // saveOrUpdate
};
