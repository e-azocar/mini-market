import { Product } from '../../shared/types'

const API_URL = process.env.NEXT_PUBLIC_API_URL
export const getProducts = async (
  page: number = 1,
  limit: number = 12,
  sort?: 'name' | 'price',
  order?: 'asc' | 'desc',
  available?: boolean
): Promise<Product[]> => {
  console.log(available)
  const res = await fetch(
    `${API_URL}/product?page=${page}&limit=${limit}&sort=${sort}&order=${order}&available=${
      available === undefined ? '' : available
    }`
  )
  if (!res.ok) throw new Error('Failed to fetch products')
  return res.json()
}

export const getProductById = async (id: string): Promise<Product> => {
  const res = await fetch(`${API_URL}/product/${id}`)
  if (!res.ok) throw new Error('Failed to fetch product')
  return res.json()
}

export const getTopCheapestAvailableProducts = async (
  n: number = 3
): Promise<Product[]> => {
  const res = await fetch(`${API_URL}/product/cheapest?n=${n}`)
  if (!res.ok)
    throw new Error('Failed to fetch top cheapest available products')
  return res.json()
}
