import type { Product } from '@/../shared/types'
import { useRouter } from 'next/navigation'
import type { ComponentProps } from 'react'

type ProductCardProps = ComponentProps<'div'> & Product

const ProductCard = ({
  image,
  name,
  price,
  isAvailable,
  id,
  ...props
}: ProductCardProps) => {
  const router = useRouter()

  const onClick = () => {
    router.push(`/${id}`)
  }

  return (
    <div
      className=" rounded-2xl shadow-md overflow-hidden bg-white border border-gray-200 cursor-pointer hover:scale-[1.01] transition-transform"
      onClick={onClick}
      {...props}
    >
      <img
        src={image}
        alt={name}
        className="w-[200px] h-[200px] object-cover mx-auto"
      />

      <div className="p-3">
        <h3 className="text-[16px] font-semibold text-gray-800 truncate">
          {name}
        </h3>

        <p className="text-[14px] text-gray-600">{price}</p>

        <span
          className={`inline-block mt-2 px-2 py-1 rounded-full text-[12px] font-medium ${
            isAvailable
              ? 'bg-green-100 text-green-700'
              : 'bg-gray-200 text-gray-600'
          }`}
        >
          {isAvailable ? 'En stock' : 'Sin stock'}
        </span>
      </div>
    </div>
  )
}

export default ProductCard
