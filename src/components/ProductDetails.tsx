import { GiftIcon, ShoppingCartIcon } from '@heroicons/react/24/outline'
import { ActionFunctionArgs, useFetcher } from "react-router-dom"
import { toast } from 'react-toastify'
import { addProductCart } from '../services/ProductService'
import { Product } from "../types"
import { formatCurrency } from "../utils"

type ProductDetailsProps = {
    product: Product
}

export async function action({ request }: ActionFunctionArgs) {
    if (request.method === 'POST') {
        const formData = await request.formData()
        const product = JSON.parse(formData.get('product') as string)
        addProductCart(product)
        // Mandamos una retroalimentación
        toast.success('Producto agregado al carrito')
    }
}

export default function ProductDetails({product} : ProductDetailsProps) {
    const fetcher = useFetcher()

  return (
    <>
        <div className=' flex flex-col shadow-item p-5 min-w-40 max-h-80'>
            <div className=" flex relative justify-center items-center h-28">
                <GiftIcon
                    className='font-bold h-20 w-20 text-green-700'
                />
            </div>
            <p className=" h-6 overflow-y-auto font-bold name-product">{product.idProduct}. <span>{product.name}</span></p>
            <p className=" description-product h-16 overflow-y-auto">{product.description}</p>
            <div className=" w-full flex justify-between">
                <p className=" font-bold">{formatCurrency(product.price)}</p>
                <ShoppingCartIcon
                    className='font-bold h-8 w-8 text-green-700 cursor-pointer'
                    onClick={() => fetcher.submit(
                        { product: JSON.stringify(product) },
                        { method: 'POST', action: '' }
                    )}
                />
            </div>
        </div>
    </>
  )
}
