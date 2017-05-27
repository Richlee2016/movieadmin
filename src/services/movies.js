import getAxios from '../utils/getHttp';

export async function list(opt) {
  console.log(opt);
  return getAxios('GET','/api/movies/list',opt);
}

export async function remove(id) {
  return getAxios('POST','/api/movies/remove',{id:id});
}

