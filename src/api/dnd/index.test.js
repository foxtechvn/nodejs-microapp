import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Dnd } from '.'

const app = () => express(apiRoot, routes)

let dnd

beforeEach(async () => {
  dnd = await Dnd.create({})
})

test('POST /dnds 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
})

test('GET /dnds 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /dnds/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${dnd.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(dnd.id)
})

test('GET /dnds/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /dnds/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${dnd.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(dnd.id)
})

test('PUT /dnds/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('DELETE /dnds/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${dnd.id}`)
  expect(status).toBe(204)
})

test('DELETE /dnds/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
