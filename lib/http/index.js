export const DELETE = async (endpoint, values = {}, config = {}) => {
  const data = await fetch(endpoint, {
    method: 'DELETE',
    body: JSON.stringify(values),
    headers: {
      'Content-Type': 'application/json',
    },
    ...config,
  }).then((response) => response.json())

  return data
}

export const POST = async (endpoint, values = {}, config = {}) => {
  const data = await fetch(endpoint, {
    method: 'POST',
    body: JSON.stringify(values),
    headers: {
      'Content-Type': 'application/json',
    },
    ...config,
  }).then((response) => response.json())

  return data
}

export const PUT = async (endpoint, values = {}, config = {}) => {
  const data = await fetch(endpoint, {
    method: 'PUT',
    body: JSON.stringify(values),
    headers: {
      'Content-Type': 'application/json',
    },
    ...config,
  }).then((response) => response.json())

  return data
}
