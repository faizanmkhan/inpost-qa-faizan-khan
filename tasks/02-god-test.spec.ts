import { test as base, expect } from "@playwright/test";

/**
 * TASK 02 — Refactor
 *
 * The test below works but is written poorly. Refactor it.
 */

const TOKEN = "test-token-inpost-2026";
const BASE = "http://localhost:3000";
const authHeaders = { Authorization: `Bearer ${TOKEN}` };

type Fixtures = { parcelId: string };

export const test = base.extend<Fixtures>({
  parcelId: async ({ request }, use) => {
    const payload = {
      recipientName: "Jan Kowalski",
      recipientEmail: "jan@example.com",
      size: "A",
      deliveryType: "LOCKER",
      lockerCode: "KRK001",
    };

    const create = await request.post(`${BASE}/api/parcels`, {
      headers: authHeaders,
      data: payload,
    });
    expect(create.status()).toBe(201);
    const created = await create.json();
    expect(created.id).toBeTruthy();

    await use(created.id);

    const del = await request.delete(`${BASE}/api/parcels/${created.id}`, {
      headers: authHeaders,
    });
    expect([200, 204]).toContain(del.status());
  },
});

test("update parcel notes", async ({ request, parcelId }) => {
  const update = await request.patch(`${BASE}/api/parcels/${parcelId}`, {
    headers: authHeaders,
    data: { notes: "Leave at the door" },
  });
  expect(update.status()).toBe(200);
  const body = await update.json();
  expect(body.notes).toBe("Leave at the door");
});

test("set parcel status to IN_TRANSIT", async ({ request, parcelId }) => {
  const res = await request.patch(`${BASE}/api/parcels/${parcelId}/status`, {
    headers: authHeaders,
    data: { status: "IN_TRANSIT" },
  });
  expect(res.status()).toBe(200);
  const body = await res.json();
  expect(body.status).toBe("IN_TRANSIT");
});