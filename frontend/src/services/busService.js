import { apiRequest } from '../utils/api'

export function fetchAllBuses() {
  return apiRequest('/api/bus/getallbuses')
}

export function createBusRoute(payload) {
  return apiRequest('/api/bus/createbus', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function deleteBusRoute(busId) {
  return apiRequest(`/api/bus/deletebus/${busId}`, {
    method: 'DELETE',
  })
}

export function bookBusSeat(payload) {
  return apiRequest('/api/bus/bookbus', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function bookBusPass(payload) {
  return apiRequest('/api/bus/bookpass', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}
