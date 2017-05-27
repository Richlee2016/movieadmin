import * as usersService from '../services/users';
export default {
  namespace: 'users',
  state: {
    list:[],
    page:1
  },
  reducers: {
    setData(state,{ payload: { list }}){
      console.log(list);
      return {...state,list}
    }
  },
  effects: {
    *getData( _, { put, call } ){
        let data = yield call(usersService.list);
        let list = data.data.results;
        yield put({
          type:'setData',
          payload:{
            list
          }
      });
    }
  },
  subscriptions: {
    setup({dispatch, history}){
      return history.listen(( {pathname, query }) => {
        if(pathname === '/users'){
          dispatch({ type:'getData'})
        };
      });
    }
  },
};
