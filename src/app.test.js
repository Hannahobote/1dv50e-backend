import request from 'supertest';
import { app } from "./server";
import { describe, expect, test, it } from '@jest/globals';
import dotenv from 'dotenv'
dotenv.config()

let bearerToken = ''

describe('Auth API', () => {
  test(' POST /api/auth/login -> Login a user', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({ username: 'aga240423-19', password: process.env.PASSWORD });
    expect(response.status).toBe(200);
    bearerToken = response.body.accessToken
    expect(response.body).toHaveProperty('msg')
    expect(response.body).toHaveProperty('accessToken')
    expect(response.body).toHaveProperty('user')
  })

  test('POST api/auth -> Should give 404 if user doesnt exist', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({ username: 'lördagsGodis', password: '1234567' });
    expect(response.status).toBe(404);
  })

  test('POST /api/auth -> Should give 401 if credentials are incorrect ', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({ username: 'aga240423-19', password: '1234567' });
    expect(response.status).toBe(401);
  })
})


describe('Orders API', () => {
  test('GET /api/orders -> should return all orders', async () => {
    const response = await request(app)
      .get('/api/orders')
      .set('Authorization', `Bearer ${bearerToken}`)
    expect(response.status).toBe(200);
  })

  test('GET /api/orders -> should not return all orders, becase we are not signed in', async () => {
    const response = await request(app)
      .get('/api/orders')
      //.set('Authorization', `Bearer ${bearerToken}`)
    expect(response.status).toBe(401);
  })

})

describe('Cake orders API', () => {

  test('GET /api/order/cake -> should return all cake orders', async () => {
    const response = await request(app)
      .get('/api/order/cake')
      .set('Authorization', `Bearer ${bearerToken}`)
    expect(response.status).toBe(200);
  })

  test('GET /api/order/cake -> should return 401 because we are not signed in', async () => {
    const response = await request(app)
      .get('/api/order/cake')
     // .set('Authorization', `Bearer ${bearerToken}`)
    expect(response.status).toBe(401);
  })

  test('GET /api/order/cake/:id -> should return one cake order', async () => {
    const response = await request(app)
      .get('/api/order/cake/6627f56ce01eb2a96fd533d3')
      .set('Authorization', `Bearer ${bearerToken}`)
    expect(response.status).toBe(200);
  })

  test('GET /api/order/cake/:id -> should return 404 if cake order does not exist', async () => {
    const response = await request(app)
      .get('/api/order/cake/6446cb61dc92030c315b5744')
      .set('Authorization', `Bearer ${bearerToken}`)
    expect(response.status).toBe(404);
  })

  
  test('PATCH /api/order/cake/:id -> Should not update, should return 401 because we are not signed in', async () => {
    const response = await request(app)
      .patch('/api/order/cake/6627f56ce01eb2a96fd533d3')
    expect(response.status).toBe(401);
  })

  test('DELETE /api/order/cake/:id -> Should not DELETE, should return 401 because we are not signed in', async () => {
    const response = await request(app)
      .delete('/api/order/cake/6627f56ce01eb2a96fd533d3')
    expect(response.status).toBe(401);
  })

})

describe('Cheesecake orders API', () => {

  test('GET /api/order/cheesecake -> should return all Cheesecake orders', async () => {
    const response = await request(app)
      .get('/api/order/cheesecake')
      .set('Authorization', `Bearer ${bearerToken}`)
    expect(response.status).toBe(200);
  })

  test('GET /api/order/cheesecake -> should return 401 because we are not signed in', async () => {
    const response = await request(app)
      .get('/api/order/cheesecake')
     // .set('Authorization', `Bearer ${bearerToken}`)
    expect(response.status).toBe(401);
  })


  test('GET /api/order/cheesecake/:id -> should return one Cheesecake order', async () => {
    const response = await request(app)
      .get('/api/order/cheesecake/6642378e5fb74b5190c56e41')
      .set('Authorization', `Bearer ${bearerToken}`)
    expect(response.status).toBe(200);
  })

  test('GET /api/order/cheesecake/:id -> should return 404 if Cheesecake order does not exist', async () => {
    const response = await request(app)
      .get('/api/order/cheesecake/6446cb61dc92030c315b5744')
      .set('Authorization', `Bearer ${bearerToken}`)
    expect(response.status).toBe(404);
  })

  test('PATCH /api/order/cheesecake/:id -> Should not update, should return 401 because we are not signed in', async () => {
    const response = await request(app)
      .patch('/api/order/cheesecake/6627f56ce01eb2a96fd533d3')
    expect(response.status).toBe(401);
  })

  test('DELETE /api/order/cheesecake/:id -> Should not DELETE, should return 401 because we are not signed in', async () => {
    const response = await request(app)
      .delete('/api/order/cheesecake/6627f56ce01eb2a96fd533d3')
    expect(response.status).toBe(401);
  })

})

describe('Cupcake orders API', () => {

  test('GET /api/order/cupcake -> should return all cupcake orders', async () => {
    const response = await request(app)
      .get('/api/order/cupcake')
      .set('Authorization', `Bearer ${bearerToken}`)
    expect(response.status).toBe(200);
  })

  test('GET /api/order/cupcake -> should return 401 because we are not signed in', async () => {
    const response = await request(app)
      .get('/api/order/cupcake')
     // .set('Authorization', `Bearer ${bearerToken}`)
    expect(response.status).toBe(401);
  })


  test('GET /api/order/cupcake/:id -> should return one cupcake order', async () => {
    const response = await request(app)
      .get('/api/order/cupcake/6648bdc622ac3ee2d0fde0f8')
      .set('Authorization', `Bearer ${bearerToken}`)
    expect(response.status).toBe(200);
  })

  test('GET /api/order/cupcake/:id -> should return 404 if cupcake order does not exist', async () => {
    const response = await request(app)
      .get('/api/order/cupcake/6446cb61dc92030c315b5744')
      .set('Authorization', `Bearer ${bearerToken}`)
    expect(response.status).toBe(404);
  })

  test('PATCH /api/order/cupcake/:id -> Should not update, should return 401 because we are not signed in', async () => {
    const response = await request(app)
      .patch('/api/order/cupcake/6627f56ce01eb2a96fd533d3')
    expect(response.status).toBe(401);
  })

  test('DELETE /api/order/cupcake/:id -> Should not DELETE, should return 401 because we are not signed in', async () => {
    const response = await request(app)
      .delete('/api/order/cupcake/6627f56ce01eb2a96fd533d3')
    expect(response.status).toBe(401);
  })

})

describe('Image API', () => {

  test('GET /api/image -> should return all images', async () => {
    const response = await request(app)
      .get('/api/image')
      .set('Authorization', `Bearer ${bearerToken}`)
    expect(response.status).toBe(200);
  })

  test('GET /api/image/:id -> should return one image adress', async () => {
    const response = await request(app)
      .get('/api/image/663225ce40f6c896050546ab')
      .set('Authorization', `Bearer ${bearerToken}`)
    expect(response.status).toBe(200);
  })

  test('GET /api/image/uploads/:filename -> should return one image from server', async () => {
    const response = await request(app)
      .get('/api/image/uploads/2e148bd8-88be-48d8-af71-40a8477798d3-cake.png')
      .set('Authorization', `Bearer ${bearerToken}`)
    expect(response.status).toBe(200);
  })

  test('GET /api/image/:id -> should return 404 if image does not exist', async () => {
    const response = await request(app)
      .get('/api/image/6446cb61dc92030c315b5744')
      .set('Authorization', `Bearer ${bearerToken}`)
    expect(response.status).toBe(404);
  })

  test('PATCH /api/image/:id -> Should not update, should return 401 because we are not signed in', async () => {
    const response = await request(app)
      .patch('/api/image/6627f56ce01eb2a96fd533d3')
    expect(response.status).toBe(401);
  })

  test('DELETE /api/image/:id -> Should not DELETE, should return 401 because we are not signed in', async () => {
    const response = await request(app)
      .delete('/api/image/6627f56ce01eb2a96fd533d3')
    expect(response.status).toBe(401);
  })

})