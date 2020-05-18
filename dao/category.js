//封装方法，编写不同的sql语句，处理不同的数据逻辑
const pool =require('../pool')
/**
 * 查找所有栏目信息
 * @param {Function} handle 
 */
let findAll=(handle)=>{
    pool.getConnection((err,conn)=>{
        if(err) throw err;
        let sql='select * from category'
        conn.query(sql,[],(err,results)=>{
            if(err) throw err;
            handle(results)
            conn.release();
        })
    })
}
/**
 * 通过id查找栏目信息
 * @param {Object} param {id}
 * @param {Function} handle 
 */
let findById=(param,handle)=>{
    pool.getConnection((err,conn)=>{
        if(err) throw err;
        let sql='select * from category where id=?'
        conn.query(sql,[param.id],(err,results)=>{
            if(err) throw err;
            handle(results)
            conn.release();
        })
    })
}
/**
 * 通过id删除栏目信息
 * @param {Object} param {id}
 * @param {Function} handle 
 */
let deleteById=(param,handle)=>{
    pool.getConnection((err,conn)=>{
        if(err) throw err;
        let sql='delete from category where id=?'
        conn.query(sql,[param.id],(err,results)=>{
            if(err) throw err;
            handle(results)
            conn.release();
        })
    })
}
/**
 * 保存或更新栏目信息
 * @param {Object} param {id,……}
 * @param {Function} handle 
 */
let saveOrUpdate=(param,handle)=>{
    pool.getConnection((err,conn)=>{
        if(err) throw err;
        let sql=''
        if(param.id){
            //更新
            sql='update category set name=?,icon=?,parentId=? where id=?'
        }else{
            //新增
            sql='insert into category(name,icon,parentId) value(?,?,?)'
        }
        conn.query(sql,[param.name,param.icon,param.parentId,param.id],(err,results)=>{
            if(err) throw err;
            handle(results)
            conn.release();
        })
    })
}
module.exports={
    findAll,
    findById,
    deleteById,
    saveOrUpdate
}