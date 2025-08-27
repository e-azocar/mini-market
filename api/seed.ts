import mongoose from 'mongoose'
import Product from './src/models/Product'
import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'
import { MONGODB_URI } from './src/config/constants'

dotenv.config()
const dataPath = path.join(__dirname, 'data', 'defaultData.json')

const seedDatabase = async () => {
  try {
    await mongoose.connect(MONGODB_URI)
    const products = JSON.parse(fs.readFileSync(dataPath, 'utf-8'))
    await Product.deleteMany({})
    await Product.insertMany(products)
    console.log('Data seeded successfully')
    mongoose.disconnect()
  } catch (error) {
    console.error('Error seeding data:', error)
    mongoose.disconnect()
    process.exit(1)
  }
}

seedDatabase()
