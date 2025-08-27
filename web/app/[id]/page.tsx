'use client'
import { useState, use, useEffect } from 'react'
import type { Product } from '@/../shared/types'
import { getProductById } from '@/lib/products'
import Link from 'next/link'

const Product = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params)
  const [product, setProduct] = useState<Product | null>(null)
  const [error, setError] = useState<string | null>(null)

  const fetchProduct = async () => {
    try {
      const data = await getProductById(id)
      setProduct(data)
    } catch (error) {
      setError('Failed to fetch product')
    }
  }

  useEffect(() => {
    fetchProduct()
  }, [id])

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-10 bg-white mt-6 rounded-2xl">
      <Link href="/" className="hover:underline">
        Volver a la lista de productos
      </Link>
      <h1 className="text-3xl font-bold mb-6">Detalle del Producto</h1>

      {error ? (
        <p className="text-red-500">
          Producto no encontrado,{' '}
          <Link href="/" className="hover:underline">
            volver a la lista
          </Link>
        </p>
      ) : product ? (
        <div className="grid md:grid-cols-3 gap-10">
          <div className="col-span-2">
            <img
              src={product.image}
              alt={product.name}
              className="mt-4 w-full"
            />
          </div>
          <div className="col-span-2 md:col-span-1">
            <h2 className="text-xl font-bold">{product.name}</h2>
            <p className="text-lg">Precio: ${product.price}</p>
            <p className="text-lg">Categoría: {product.category}</p>
            <span
              className={`inline-block mt-2 px-2 py-1 rounded-full text-[12px] font-medium ${
                product.isAvailable
                  ? 'bg-green-100 text-green-700'
                  : 'bg-gray-200 text-gray-600'
              }`}
            >
              {product.isAvailable ? 'En stock' : 'Sin stock'}
            </span>
            <button className="bg-indigo-900 hover:bg-indigo-800 cursor-pointer text-white px-4 py-2 rounded w-full mt-4">
              Añadir a favoritos
            </button>
          </div>
        </div>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  )
}

export default Product
