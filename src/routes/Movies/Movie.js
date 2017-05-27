import React from 'react';
import { connect } from 'dva';
import styles from './Movie.css';
import { Table, Button, Modal } from 'antd'
import { routerRedux } from 'dva/router';
import Detail from '../../components/Movie/Detail'
import {parse} from 'qs'

var confirm = Modal.confirm;

function Movie({ dispatch, list: dataSource, loading, pageSet}) {
  let querySet = (page,pageSize) => {
      dispatch(routerRedux.push({
        pathname:'/movies',
        query:{page,pageSize}
      }));
  }

  let removeMovie = (id) => {
      return () => {
        var box = 0;
        confirm({
          title: '确定要删除吗?',
          okText: '确定',
          cancelText: '取消',
          onOk () {
            dispatch({
              type:'movie/remove',
              payload:id
            })
          },
        })
      }
  }

  var columns = [
    {
      title:'id',
      dataIndex:'id',
      key:'id'
    },
    {
      title:'name',
      dataIndex:'name',
      key:'name'
    },
    {
      title:'catalog',
      dataIndex:'catalog',
      key:'catalog'
    },
    {
      title:'handle',
      key:'handle',
      render:(record) => (
        <span>
          <span/>
          <Detail record={record} >查看</Detail>
          <span className="ant-divider" />
          <a onClick={removeMovie(record._id)}>删除</a>
        </span>
      )
    }            
  ]

  return (
    <div className={styles.normal}>
      <Table
      rowKey={ record => record._id } 
      dataSource={dataSource}
      columns={columns}  
      loading={loading}
      pagination={{
        onChange(a,b){ querySet(a,b) },
        onShowSizeChange(a,b){ querySet(a,b) },
        showSizeChanger: true,
        showQuickJumper: true,
        total:pageSet.total
      }}
       />
    </div>
  );
}

function mapStateToProps(state) {
  var { list, pageSet } = state.movie
  return {
    loading:state.loading.models.movie,
    list,
    pageSet
  };
}

export default connect(mapStateToProps)(Movie);
