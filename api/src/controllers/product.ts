import type { Request, Response } from 'express'
import Product from '../models/Product'

export const getProducts = async (req: Request, res: Response) => {
  const { search, sort, order, page, limit, available } = req.query

  const options: any = {
    sort: {},
    page: Number(page) || 1,
    limit: Number(limit) || 10,
  }

  if (sort) {
    options.sort = { [sort as string]: order === 'desc' ? -1 : 1 }
  }

  try {
    const products = (
      await Product.find(
        available === 'true'
          ? { isAvailable: true }
          : available === 'false'
          ? { isAvailable: false }
          : {}
      )
        .sort(options.sort)
        .skip((options.page - 1) * options.limit)
        .limit(options.limit)
    ).map((product) => product.toJSON())

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
    res.json(product.toJSON())
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : 'Unknown error',
    })
  }
}

export const getTopCheapestAvailableProducts = async (
  req: Request,
  res: Response
) => {
  const { n } = req.query
  try {
    const products = (
      await Product.find({ isAvailable: true })
        .sort({ price: 1 })
        .limit(n ? Number(n) : 5)
    ).map((product) => product.toJSON())

    res.json(products)
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : 'Unknown error',
    })
  }
}
