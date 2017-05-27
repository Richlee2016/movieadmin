import * as usersService from '../services/users';
export default {
  namespace: 'login',
  state: {
    loadStyle:false
  },
  reducers: {
    overLoad(state){
      return {
        ...state,
        loadStyle:false
      }
    },
    isLoading(state){
      return {
        ...state,
        loadStyle:true
      }
    }
  },
  effects: {
    
  },
  subscriptions: {
   
  },
};
