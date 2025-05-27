const BASE = import.meta.env.VITE_API_BASE_URL

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options
  })
  if (!res.ok) throw new Error(`API error: ${res.status}`)
  return res.json()
}

export const api = {
  // отправка e-mail
  sendEmail: ({ email }) =>
    request('/emails', {
      method: 'POST',
      body: JSON.stringify({ email })
    }),
  // получение списка продуктов
  fetchProducts: () => request('/products'),
}
