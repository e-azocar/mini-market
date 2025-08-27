import type { Request, Response } from 'express'
import Product from '../models/Product'

export const getProducts = async (req: Request, res: Response) => {
  const { search, sort, order, page, limit, available } = req.query

  const query: any = {}
  if (search) {
    query.name = { $regex: search, $options: 'i' }
  }
  if (available !== undefined) {
    query.isAvailable = available === 'true'
  }

  const options: any = {
    sort: {},
    page: Number(page) || 1,
    limit: Number(limit) || 10,
  }

  if (sort) {
    options.sort = { [sort as string]: order === 'desc' ? -1 : 1 }
  }

  try {
    const products = await Product.find(query)
      .sort(options.sort)
      .skip((options.page - 1) * options.limit)
      .limit(options.limit)
    res.json(products)
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : 'Unknown error',
    })
  }
}

export const getProductById = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const product = await Product.findById(id)
    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }
    res.json(product)
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : 'Unknown error',
    })
  }
}
