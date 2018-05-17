import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { DoCharge } from '.'

const app = () => express(apiRoot, routes)

let userSession, adminSession, doCharge

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const admin = await User.create({ email: 'c@c.com', password: '123456', role: 'admin' })
  userSession = signSync(user.id)
  adminSession = signSync(admin.id)
  doCharge = await DoCharge.create({})
})

test('POST /do-charges 201 (admin)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: adminSession, serviceName: 'test', msisdn: 'test', amount: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.serviceName).toEqual('test')
  expect(body.msisdn).toEqual('test')
  expect(body.amount).toEqual('test')
})

test('POST /do-charges 401 (user)', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('POST /do-charges 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /do-charges 200 (admin)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: adminSession })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /do-charges 401 (user)', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('GET /do-charges 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /do-charges/:id 200 (admin)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${doCharge.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(doCharge.id)
})

test('GET /do-charges/:id 401 (user)', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${doCharge.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('GET /do-charges/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${doCharge.id}`)
  expect(status).toBe(401)
})

test('GET /do-charges/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})

test('PUT /do-charges/:id 200 (admin)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${doCharge.id}`)
    .send({ access_token: adminSession, serviceName: 'test', msisdn: 'test', amount: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(doCharge.id)
  expect(body.serviceName).toEqual('test')
  expect(body.msisdn).toEqual('test')
  expect(body.amount).toEqual('test')
})

test('PUT /do-charges/:id 401 (user)', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${doCharge.id}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('PUT /do-charges/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${doCharge.id}`)
  expect(status).toBe(401)
})

test('PUT /do-charges/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: adminSession, serviceName: 'test', msisdn: 'test', amount: 'test' })
  expect(status).toBe(404)
})

test('DELETE /do-charges/:id 204 (admin)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${doCharge.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(204)
})

test('DELETE /do-charges/:id 401 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${doCharge.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('DELETE /do-charges/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${doCharge.id}`)
  expect(status).toBe(401)
})

test('DELETE /do-charges/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})
