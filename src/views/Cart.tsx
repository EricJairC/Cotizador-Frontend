import { ActionFunctionArgs, useFetcher, useLoaderData } from 'react-router-dom';
import CartDetails from '../components/CartDetails';
import Menu from "../components/Menu";
import { getProducts, getTotalCart, getTotalNormalInstallment, getTotalPunctualInstallment, updateDeadline } from '../services/CartService';
import { CartType } from '../types';
import { formatCurrency } from '../utils';
import { deadlines } from '../data';
import { ChangeEvent } from 'react';

export async function loader(){
  const products = await getProducts()
  const resultado = await getTotalCart()
  const totalSemanal = await getTotalNormalInstallment()
  const totalPuntual = await getTotalPunctualInstallment()
  const total = resultado?.data?.montoTotal
  return {products, resultado: total, totalSemanal, totalPuntual}
}

export async function action({ request }: ActionFunctionArgs) {
    const formData = await request.formData()
    const plazo = formData.get('plazo') || 12
    const plazoTransformed = Number(plazo)
    if (!isNaN(plazoTransformed)) {
        await updateDeadline(plazoTransformed);
    } else {
        throw new Error('El plazo no es un número válido');
    }
}

export default function Cart() {

    const fetcher = useFetcher()

    const handleChange = (e:ChangeEvent<HTMLSelectElement>) => {
        const plazo = +e.target.value
        fetcher.submit(
            { plazo },
            { method: 'POST', action: '/carrito/updatePlazo' }
        );
    }

    // Usamos products
    const { products, resultado, totalSemanal, totalPuntual } = useLoaderData() as { products: CartType[], resultado: number, totalSemanal: number, totalPuntual: number };

  return (
    <>
        <div className='flex flex-col lg:flex-row '>
            {/* Menu */}
            <Menu/>
            {/* Title */}
            <div className=' flex flex-col w-full py-0 lg:py-5 lg:pl-10 lg:pr-0 px-0'>
                <div className="flex flex-col md:flex-row justify-between md:relative">
                    <h2 className=' text-3xl font-bold text-slate-500 pt-0 lg:pt-3'>Carrito de compras</h2>
                    <div className=' w-full md:w-auto flex flex-row items-center md:absolute md:right-0 pt-4 lg:pt-0'>
                        {resultado > 0 && (
                        <div className="w-full md:w-auto flex flex-col">
                            <div className=" w-full md:w-auto flex justify-between gap-3">
                                <p className=' text-base'>Abono semanal total: </p><span className='font-bold'>{formatCurrency(totalSemanal)}</span>
                            </div>
                            <div className=" w-full md:w-auto flex justify-between gap-3">
                            <p className=' text-base'>Abono puntual total: </p><span className='font-bold'>{formatCurrency(totalPuntual)}</span>
                            </div>
                            <div className=" w-full md:w-auto flex justify-between gap-3">
                                <p className=' text-base'>Total a pagar: </p><span className='font-bold'>{formatCurrency(resultado)}</span>
                            </div>
                        </div>
                        )}
                        
                    </div>
                </div>
                {/* Products */}
                <div className=' w-full py-4 md:py-8 container-grid-products'>
                    <div className=" flex justify-between">
                        <div className=" flex items-center">
                            <p className=" text-base mr-5">Seleccionar plazo a pagar:</p>
                            <select
                                className=" border border-slate-300 h-[1.5rem] rounded-lg w-auto lg:w-64 bg-white"
                                id="deadline"
                                onChange={handleChange}
                            >
                                {deadlines.map(deadline => (
                                    <option
                                        key={deadline.plazo}
                                        value={deadline.plazo}
                                    >
                                        {`${deadline.plazo} semanas`}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                <div className=" flex flex-col gap-4">
                    {products.length === 0 ?   
                        <h3 className=' mt-6 text-center text-2xl font-bold text-slate-400'>Carrito vacío</h3>
                        :
                        products.map(product =>(
                            <CartDetails
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
