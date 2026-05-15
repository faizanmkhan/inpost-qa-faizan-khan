import { test, expect } from '@playwright/test'

/**
 * TASK 06 — API testing
 *
 * Documentation: http://localhost:3000/challenges/api-testing
 * Auth token: test-token-inpost-2026
 */

// ---------------------------------------------------------------------------
// Version A — Recruitment
// Test the POST /api/parcels endpoint.
// ---------------------------------------------------------------------------

const BASE = 'http://localhost:3000'
const TOKEN = 'test-token-inpost-2026'

async function createParcel(request, data = {}) {
  const now = Date.now()
  const payload = Object.assign({
    recipientName: `API Test ${now}`,
    recipientEmail: `api.test+${now}@example.com`,
    address: '1 Test Street',
    size: 'A',
    weightKg: 1.2,
  }, data)
  const res = await request.post(`${BASE}/api/parcels`, { headers: { Authorization: `Bearer ${TOKEN}` }, data: payload })
  const body = await res.json()
  return { res, body }
}

async function deleteParcel(request, id) {
  return request.delete(`${BASE}/api/parcels/${id}`, { headers: { Authorization: `Bearer ${TOKEN}` } })
}

test.describe('POST /api/parcels', () => {
  test('creates a parcel (auth required) and cleans up', async ({ request }) => {
    const { res, body } = await createParcel(request)
    expect(res.status()).toBeGreaterThanOrEqual(200)
    expect(res.status()).toBeLessThan(300)
    expect(body.id).toBeTruthy()

    // verify GET returns the created parcel
    const get = await request.get(`${BASE}/api/parcels/${body.id}`, { headers: { Authorization: `Bearer ${TOKEN}` } })
    expect(get.status()).toBe(200)
    const got = await get.json()
    expect(got.id).toBe(body.id)

    // cleanup
    const del = await deleteParcel(request, body.id)
    expect(del.status() === 200 || del.status() === 204).toBeTruthy()
  })

  test('rejects unauthenticated POST', async ({ request }) => {
    const res = await request.post(`${BASE}/api/parcels`, { data: { recipientName: 'X' } })
    // API should require auth — accept 401 or 403
    expect(res.status() === 401 || res.status() === 403).toBeTruthy()
  })
})

// ---------------------------------------------------------------------------
// Version B — Internship
// Test the full update flow: create a parcel and update it with PATCH
// ---------------------------------------------------------------------------

test.describe('PATCH /api/parcels', () => {
  test('create -> patch partial fields -> get -> delete', async ({ request }) => {
    const { body } = await createParcel(request)
    const id = body.id

    // Partial update
    const patchRes = await request.patch(`${BASE}/api/parcels/${id}`, { headers: { Authorization: `Bearer ${TOKEN}` }, data: { recipientName: 'Patched Name' } })
    expect(patchRes.status()).toBeGreaterThanOrEqual(200)
    expect(patchRes.status()).toBeLessThan(300)

    const get = await request.get(`${BASE}/api/parcels/${id}`, { headers: { Authorization: `Bearer ${TOKEN}` } })
    expect(get.status()).toBe(200)
    const got = await get.json()
    expect(got.recipientName).toBe('Patched Name')

    // Try status update endpoint if available
    const statusRes = await request.patch(`${BASE}/api/parcels/${id}/status`, { headers: { Authorization: `Bearer ${TOKEN}` }, data: { status: 'In Transit' } })
    if (statusRes.status() >= 200 && statusRes.status() < 300) {
      const after = await request.get(`${BASE}/api/parcels/${id}`, { headers: { Authorization: `Bearer ${TOKEN}` } })
      const afterBody = await after.json()
      expect(afterBody.status).toBeTruthy()
    }

    // cleanup
    const del = await deleteParcel(request, id)
    expect(del.status() === 200 || del.status() === 204).toBeTruthy()
  })
})
