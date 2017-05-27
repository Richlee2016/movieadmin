import * as service from '../services/movies'
import { routerRedux } from 'dva/router'
import { parse } from 'qs'
export default {
  namespace: 'movie',
  state: {
    list:[],
    pageSet:{
      page:1,
      pageSize:10,
      total:""
    }
  },
  reducers: {
    setList(state,{ payload:{list,pageSet} }){
      return {...state,list,pageSet}
    }
  },
  effects: {
    *requery({ payload:{page} }, {put}) {
      yield put(routerRedux.push({
        pathname: '/movies',
        query: { page },
      }))
    },
    *getList({payload},{put, call}){
      console.log(0);
      console.log(payload);
        let data = yield call(service.list,payload);
        let {list, total} = data.data;
        yield put({
          type:'setList',
          payload:{
            list,
            pageSet:{
              total
            }
          }
        });
    },
    *remove({payload},{put, call}){
        let isRemove = yield call(service.remove,payload);
        if(isRemove.data.msg === 'OK'){
          yield put({ 
            type: 'requery',
            payload: parse(location.search.substr(1))
          })
        } else {
          throw data
        };
    }
  },
  subscriptions: {
    init({dispatch, history}){
        return history.listen( ( { pathname, query } ) => {
           if(pathname === '/movies'){
              dispatch({ 
                type:'getList',
                payload:parse(location.search.substr(1))
              })
            };
        });
    }
  },
};
