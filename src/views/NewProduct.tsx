import { ActionFunctionArgs, Form, redirect, useActionData } from "react-router-dom";
import { toast } from "react-toastify";
import ErrorMessage from "../components/ErrorMessage";
import Menu from "../components/Menu";
import { addProduct } from "../services/ProductService";
import ProductForm from "../components/ProductForm";

export async function action({request} : ActionFunctionArgs){
    const data = Object.fromEntries(await request.formData())
    let error = ''

    if(Object.values(data).includes('')){
        error = 'Todos los campos son obligatorios'
    }

    if(error.length){
        return error
    }
    
    // Llamamdos addProduct y la pasamos data
    await addProduct(data)

    // Mandamos una retroalimentación
    toast.success('Producto agregado con éxito')

    return redirect('/')
}

export default function NewProduct() {
    const error = useActionData() as string
  return (
    <>
        <div className='flex flex-col lg:flex-row '>
        {/* Menu */}
        <Menu/>
        {/* Title */}
        <div className=' flex flex-col w-full py-0 lg:py-5 lg:pl-10 lg:pr-0 px-0'>
          <h2 className=' text-2xl md:text-3xl font-bold text-slate-500 pt-0 lg:pt-3'>Registrar Producto</h2>
          {/* Products */}
          <Form
            method="POST"
            className=" mt-8"
          >
            <ProductForm/>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <input
                type="submit"
                className="mt-5 w-full bg-green-700 p-2 text-white font-bold text-lg cursor-pointer rounded"
                value="Registrar Producto"
            />
          </Form>
        </div>
      </div>
    </>
  )
}
