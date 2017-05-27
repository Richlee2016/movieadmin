import request from '../utils/request';

export async function list() {
  return request('/api/users/list');
}

