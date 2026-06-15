import { apiRequest } from '../utils/api'

export function fetchAllUsers() {
  return apiRequest('/api/users/getallusers')
}

export function fetchUserProfile(userId) {
  return apiRequest(`/api/users/getuser/${userId}`)
}

export function updateUserProfile(userId, payload) {
  return apiRequest(`/api/users/getuser/update/${userId}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  })
}

export function fetchBookingHistory(userId) {
  return apiRequest(`/api/users/bookingdetails/${userId}`)
}

export function fetchPassHistory(userId) {
  return apiRequest(`/api/users/pass/${userId}`)
}

export function fetchAllPasses() {
  return apiRequest('/api/users/passses')
}

export function approvePassRequest(passId, passType) {
  return apiRequest(`/api/users/updatePass/update/${passId}`, {
    method: 'PATCH',
    body: JSON.stringify({ pass: passType }),
  })
}
