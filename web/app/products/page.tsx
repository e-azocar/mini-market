'use client'
import ProductCard from '@/components/ProductCard'
import React, { useState, useEffect } from 'react'
import { getProducts, getTopCheapestAvailableProducts } from '@/lib/products'
import type { Product } from '../../../shared/types'

const Products = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [available, setAvailable] = useState<string>('')
  const [nCheapest, setNCheapest] = useState<number>(3)
  const [cheapest, setCheapest] = useState(false)
  const [sort, setSort] = useState<'name' | 'price' | ''>('')
  const [order, setOrder] = useState<'asc' | 'desc'>('asc')
  const [page, setPage] = useState<number>(1)
  const [loading, setLoading] = useState(false)

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const availBool =
        available === '' ? undefined : available === 'available' ? true : false
      const sortVal = sort === '' ? undefined : sort
      const productsData = await getProducts(
        page,
        12,
        sortVal,
        order,
        availBool
      )
      console.log(availBool)
      setProducts(productsData)
    } catch (err) {
      setProducts([])
    }
    setLoading(false)
  }

  const onClickSearch = async () => {
    const cheapestProducts = await getTopCheapestAvailableProducts(nCheapest)
    setProducts(cheapestProducts)
  }

  const onCheckCheapest = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheapest(e.target.checked)
    if (!e.target.checked) {
      await getProducts()
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [available, sort, order, page])

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-10">
      <section>
        <div className="flex gap-4 justify-between flex-col mb-4 bg-white rounded-2xl p-6">
          <h2 className="text-2xl font-bold">Productos</h2>

          <div className="flex flex-col sm:flex-row gap-0 sm:gap-4 items-center">
            <label className="flex flex-col w-full sm:w-auto">
              <span className="mr-2">Disponibilidad:</span>
              <select
                value={available}
                onChange={(e) => setAvailable(e.target.value)}
                className="border border-gray-300 rounded p-2"
              >
                <option value="">Todos</option>
                <option value="available">Disponibles</option>
                <option value="unavailable">No disponibles</option>
              </select>
            </label>

            <label className="flex flex-col w-full sm:w-auto">
              <span className="mr-2">Ordenar por:</span>
              <select
                value={sort}
                onChange={(e) =>
                  setSort(e.target.value as 'name' | 'price' | '')
                }
                className="border border-gray-300 rounded p-2"
              >
                <option value="">Ninguno</option>
                <option value="name">Nombre</option>
                <option value="price">Precio</option>
              </select>
            </label>

            <label className="flex flex-col w-full sm:w-auto">
              <span className="mr-2">Orden:</span>
              <select
                value={order}
                onChange={(e) => setOrder(e.target.value as 'asc' | 'desc')}
                className="border border-gray-300 rounded p-2"
              >
                <option value="asc">Ascendente</option>
                <option value="desc">Descendente</option>
              </select>
            </label>
          </div>

          <label className="w-fit">
            ¿Quieres buscar los N productos más baratos?
            <input
              type="checkbox"
              checked={cheapest}
              onChange={onCheckCheapest}
              className="ml-2"
            />
          </label>
          {cheapest && (
            <div className="flex flex-col gap-2">
              <label>¿Cuántos productos quieres ver?</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={nCheapest}
                  onChange={(e) => setNCheapest(Number(e.target.value))}
                  className="border border-gray-300 rounded p-2 ml-2 flex-1 sm:flex-none"
                />
                <button
                  className="bg-[#101828] hover:bg-[#162138] text-white rounded p-2 cursor-pointer"
                  onClick={onClickSearch}
                >
                  Buscar
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
          {loading ? (
            <div className="col-span-full text-center">Cargando...</div>
          ) : products.length === 0 ? (
            <div className="col-span-full text-center">No hay productos</div>
          ) : (
            products.map((product) => (
              <ProductCard
                key={product.id}
                image={product.image}
                name={product.name}
                price={product.price}
                isAvailable={product.isAvailable}
                category={product.category}
                id={product.id}
              />
            ))
          )}
        </div>

        <div className="flex justify-center mt-8 gap-2">
          <button
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            onClick={() => setPage(page - 1)}
            disabled={page === 1 || loading}
          >
            Anterior
          </button>
          <span className="px-4 py-2">Página {page}</span>
          <button
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            onClick={() => setPage(page + 1)}
            disabled={products.length < 12 || loading}
          >
            Siguiente
          </button>
        </div>
      </section>
    </div>
  )
}

export default Products
