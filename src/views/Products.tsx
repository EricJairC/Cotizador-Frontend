import { useLoaderData } from 'react-router-dom'
import Menu from '../components/Menu'
import ProductDetails from '../components/ProductDetails'
import { getAllProducts } from '../services/ProductService'
import { Product } from '../types'

export async function loader(){
  const products = await getAllProducts()
  return products
}

export default function Products() {

  // Usamos products
  const products = useLoaderData() as Product[];

  return (
    <>
      <div className='flex flex-col lg:flex-row '>
        {/* Menu */}
        <Menu/>
        {/* Title */}
        <div className=' flex flex-col w-full py-0 lg:py-5 lg:pl-10 lg:pr-0 px-0'>
          <h2 className=' text-2xl md:text-3xl font-bold text-slate-500 pt-0 lg:pt-3'>Catálogo de productos</h2>
          {/* Products */}
          <div className=' w-full pt-4 lg:pt-8 container-grid-products'>
            {products.length === 0 ?  
              <h3 className=' mt-6 text-center text-2xl font-bold text-slate-400'>No hay productos existentes</h3>
              :
              // Recorremos el arreglo
              products.map(product => (
                <ProductDetails
                  key={product.idProduct}
                  product={product}
                />
              )) 
            }
          </div>
        </div>
      </div>
    </>
  )
}
