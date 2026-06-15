import { apiRequest } from '../utils/api'

export function registerUser(payload) {
  return apiRequest('/api/users/signup', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function loginUser(payload) {
  return apiRequest('/api/users/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function logoutUser() {
  return apiRequest('/api/users/logout', {
    method: 'GET',
  })
}
