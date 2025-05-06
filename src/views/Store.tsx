import { GiftIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import { ActionFunctionArgs, useFetcher, useLoaderData, useNavigate } from "react-router-dom"
import Menu from "../components/Menu"
import { getProducts } from "../services/ProductService"
import { Product } from "../types"
import { formatCurrency } from "../utils"
import axios from 'axios'
import { toast } from 'react-toastify'

export async function loader(){
  const productsUser = await getProducts()
  return productsUser
}

export async function action({request} : ActionFunctionArgs){
  if (request.method === 'DELETE') {
    const formData = await request.formData()
    const idProduct = formData.get('idProduct')

    // Llamar a tu servicio para eliminar el producto
    const url = `${import.meta.env.VITE_API_URL}/api/products/${idProduct}`
    await axios.delete(url)

    // Mandamos una retroalimentación
    toast.success('Producto eliminado con éxito')
  }
}

export default function Store() {

  const fetcher = useFetcher()

  const navigate = useNavigate()

  // Usamos products
  const productsUser = useLoaderData() as Product[];

  return (
    <>
        <div className='flex flex-col lg:flex-row '>
        {/* Menu */}
        <Menu/>
        {/* Title */}
        <div className=' flex flex-col w-full py-0 lg:py-5 lg:pl-10 lg:pr-0 px-0'>
          <h2 className=' text-2xl md:text-3xl font-bold text-slate-500 pt-0 lg:pt-3'>Administrador de productos</h2>
          {/* Products */}
          <div className='w-full pt-4 lg:pt-8 container-grid-products'>
            {productsUser.length === 0 ?  
              <h3 className=' mt-6 text-center text-2xl font-bold text-slate-400'>No hay productos existentes</h3>
              :
              // Recorremos el arreglo
              productsUser.map(product => (
                <div className=' flex flex-col shadow-item p-5 min-w-40 max-h-80' key={product.idProduct}>
                      <div className=" flex relative justify-center items-center h-28">
                            <GiftIcon
                              className='font-bold h-20 w-20 text-green-700'
                            />
                            <PencilSquareIcon
                                className='font-bold h-6 w-6 text-gray-600 cursor-pointer absolute top-1 right-0 bottom-0 object-left-top'
                                onClick={() => navigate(`/productos/${product.idProduct}/editar`)}
                            />
                            <TrashIcon
                                className='font-bold h-6 w-6 absolute top-9 right-0 bottom-0 object-left-top text-red-700 cursor-pointer'
                                onClick={() => fetcher.submit(
                                  { idProduct: product.idProduct },
                                  { method: 'DELETE', action: '/productos/administrar' }
                                )}
                            />
                      </div>
                      <p className=" h-6 overflow-y-auto font-bold name-product">{product.idProduct}. <span>{product.name}</span></p>
                      <p className=" description-product h-16 overflow-y-auto">{product.description}</p>
                      <div className=" w-full flex justify-between">
                          <p className=" font-bold">{formatCurrency(product.price)}</p>
                      </div>
                  </div>
              )) 
            }
          </div>
        </div>
      </div>        
    </>
  )
}
