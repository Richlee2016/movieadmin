import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Table, Button, Pagination} from 'antd'
import styles from './Users.css';
// import EditModal from '../../components/Users/UserModal.js'
function Users({dispatch, list: dataSource}) {
  //路由变化
  function pageJump(page){
      dispatch(routerRedux.push({
        pathname:'/users',
        query:{ page },
      }));
  };
  //表格设置
  const columns = [{
                      title: 'id',
                      dataIndex: '_id',
                      key: '_id',
                    },{
                      title: 'username',
                      dataIndex: 'username',
                      key: 'username',
                    },{
                      title: 'createTime',
                      dataIndex: 'createTime',
                      key: 'createTime',
                    },{
                      title:'handle',
                      key:'handle',
                      render:(record) => (
                        <span>
                          <a href="#">
                          </a>
                          <span className="ant-divider" />
                          <a href="#">修改</a>
                          <span className="ant-divider" />
                          <a href="#">删除</a>
                        </span>
                      )
                    }
                    ];            
  return (
    <div className={styles.normal}>
        <h2>User list</h2>
        <Table 
        rowKey={ record => record._id } 
        dataSource={dataSource}
        pagination={{ pageSize:2,onChange(e){ pageJump(e) }}} 
        columns={columns} />
    </div>
  );
}

function mapStateToProps(state) {
  const { list } = state.users;
  return {
    list
  };
}

export default connect(mapStateToProps)(Users);
