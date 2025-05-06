import { ActionFunctionArgs, Form, LoaderFunctionArgs, redirect, useActionData, useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import ErrorMessage from "../components/ErrorMessage";
import Menu from "../components/Menu";
import { getProductById, updateProduct } from "../services/ProductService";
import { Product } from "../types";
import ProductForm from "../components/ProductForm";

export async function loader({params} : LoaderFunctionArgs){
    if(params.idProduct !== undefined){
        const product = await getProductById(+params.idProduct)
        if(!product){
            redirect('/')
            toast.error('El producto no existe')
        }
        return product
    }
}

export async function action({request, params} : ActionFunctionArgs){
    const data = Object.fromEntries(await request.formData())
    let error = ''

    if(Object.values(data).includes('')){
        error = 'Todos los campos son obligatorios'
    }

    if(error.length){
        return error
    }

    if(params.idProduct !== undefined){
        // Llamamdos addProduct y la pasamos data
        await updateProduct(data, +params.idProduct)
        // Mandamos una retroalimentación
        toast.success('Producto editado con éxito')

        return redirect('/productos/administrar')
    }   
}

export default function EditProduct() {
    const error = useActionData() as string

    const product = useLoaderData() as Product

  return (
    <>
        <div className='flex flex-row '>
        {/* Menu */}
        <Menu/>
        {/* Title */}
        <div className=' flex flex-col w-full py-5 pl-10 pr-0'>
          <h2 className=' text-3xl font-bold text-slate-500 pt-3'>Editar Producto</h2>
          {/* Products */}
          <Form
            method="POST"
            className=" mt-8"
          >
            <ProductForm
                product={product}
            />
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <input
                type="submit"
                className="mt-5 w-full bg-green-700 p-2 text-white font-bold text-lg cursor-pointer rounded"
                value="Guardar Cambios"
            />
          </Form>
        </div>
      </div>
    </>
  )
}
