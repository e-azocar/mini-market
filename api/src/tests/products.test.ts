import request from 'supertest'
import app from '../app'
import connectDB from '../config/db'
import mongoose from 'mongoose'
import Product from '../models/Product'

beforeAll(async () => {
  await connectDB()
})

afterAll(async () => {
  await mongoose.connection.close()
})

describe('Product API', () => {
  let productId: string
  beforeAll(async () => {
    const product = await Product.create({
      name: 'Test Product',
      price: 10,
      category: 'Test',
      image: 'test.jpg',
      isAvailable: true,
    })
    productId = product._id.toString()
  })

  afterAll(async () => {
    await Product.deleteOne({ _id: productId })
  })

  it('should return a list of products', async () => {
    const res = await request(app).get('/api/product')
    expect(res.status).toBe(200)
    expect(res.body).toBeInstanceOf(Array)
  })

  it('should return a single product by ID', async () => {
    const res = await request(app).get(`/api/product/${productId}`)
    expect(res.status).toBe(200)
    expect(res.body).toBeInstanceOf(Object)
  })
})
