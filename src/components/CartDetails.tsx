import { MinusIcon, PlusIcon, ShoppingCartIcon, TrashIcon } from "@heroicons/react/24/outline"
import { ActionFunctionArgs, useFetcher } from "react-router-dom"
import { decreaseQuantity, deleteProductCart, increaseQuantity } from "../services/CartService"
import { CartType } from "../types"
import { formatCurrency } from "../utils"

type CartDetailsProps = {
    product: CartType
}

export async function action({ request }: ActionFunctionArgs) {
    if (request.method === 'PATCH') {
        const formData = await request.formData()
        const idProduct = formData.get('idProduct')
        const actionType = formData.get("actionType")
        const productId = Number(idProduct)
        // Llamar a tu servicio para eliminar el producto
        if (actionType === "increase") {
            await increaseQuantity(productId)
        } else if (actionType === "decrease") {
            await decreaseQuantity(productId)
        }
    }else if(request.method === 'DELETE'){
        const formData = await request.formData()
        const idProduct = formData.get('idProduct')
        const productId = Number(idProduct)
        await deleteProductCart(productId)
    }
}

export default function CartDetails({product} : CartDetailsProps) {

    const fetcher = useFetcher()

  return (
    <>
        <div className="flex flex-col shadow-item-cart p-5 w-full">
            <div className=" flex flex-col-reverse md:flex-row justify-between">
                <div className=" w-full md:w-auto flex flex-col md:flex-row gap-4 ">
                    <div className=" mb-3 md:mb-0 flex items-center justify-center">
                        <ShoppingCartIcon
                            className='font-bold h-20 w-20 text-green-700 '
                        />
                    </div>
                    <div className=" flex flex-col justify-between">
                        <p className=" text-sm font-bold">{product.quantity+' '} 
                            <span className="font-normal">x{' '}{product.name+' '}{<span className="font-bold">{formatCurrency(product.price)+' '}c/u</span>}
                            </span>
                        </p>
                        <div className=" flex items-center h-10">
                            <MinusIcon
                                className=" font-bold icon h-5 w-5 bg-green-800 text-white rounded-full cursor-pointer"
                                onClick={() => fetcher.submit(
                                    { idProduct: product.idProduct, actionType: "decrease" },
                                    { method: 'PATCH', action: '/carrito' }
                                )}
                            />
                            <span className="text-sm px-4">{product.quantity}</span>
                            <PlusIcon
                                className=" font-bold icon h-5 w-5 bg-green-800 text-white rounded-full cursor-pointer"
                                onClick={() => fetcher.submit(
                                    { idProduct: product.idProduct, actionType: "increase" },
                                    { method: 'PATCH', action: '/carrito' }
                                )}
                            />
                        </div>
                        <p className=" text-sm">Subtotal ({product.quantity}{' '}{product.quantity === 1 ? <span>producto</span> : <span>productos</span>}): 
                            <span className=" text-sm font-bold"> {formatCurrency(product.price*product.quantity)}</span>
                        </p>
                    </div>
                </div>
                <div className=" mb-5 md:mb-0 flex flex-row gap-8 justify-between">
                    <div className="flex flex-col justify-end">
                        <p className=" text-sm w-[]">Abono Semanal: <span className=" text-sm font-bold">{formatCurrency(product.abonoNormal)}</span></p>
                        <p className=" text-sm w-[]">Abono Puntual: <span className=" text-sm font-bold">{formatCurrency(product.abonoPuntual)}</span></p>
                    </div>
                    <div className="flex items-start md:items-end">
                        <TrashIcon
                            className=" font-bold icon h-7 w-7 text-red-700 cursor-pointer"
                            onClick={() => fetcher.submit(
                                { idProduct: product.idProduct },
                                { method: 'DELETE', action: '/carrito' }
                            )}
                        />
                    </div>
                </div>
            </div>
        </div> 
    </>
  )
}
