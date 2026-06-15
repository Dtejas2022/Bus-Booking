const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '')

function buildUrl(path) {
  return `${API_BASE_URL}${path}`
}

async function parseResponse(response) {
  const contentType = response.headers.get('content-type') || ''
  const isJson = contentType.includes('application/json')
  const payload = isJson ? await response.json() : await response.text()

  if (!response.ok) {
    const message =
      payload?.message ||
      payload?.error?.message ||
      payload?.error ||
      payload ||
      'Something went wrong while talking to the server.'

    throw new Error(typeof message === 'string' ? message : 'Request failed.')
  }

  return payload
}

export async function apiRequest(path, options = {}) {
  const requestOptions = {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  }

  const response = await fetch(buildUrl(path), requestOptions)
  return parseResponse(response)
}
