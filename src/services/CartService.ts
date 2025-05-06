import axios from "axios"
import { safeParse } from "valibot"
import { CartsSchema, CartType } from "../types"

export async function getProducts(){
    try {
        const token = localStorage.getItem('AUTH_TOKEN')
        // URL a la que mandaremos los datos
        const url = `${import.meta.env.VITE_API_URL}/api/cart`
        const { data } = await axios(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        const result = safeParse(CartsSchema, data.data)
        if(result.success){
            
            return result.output
        }else{
            throw new Error('Hubo un error')
        }
    } catch (error) {
        console.log(error)
    }
}

export async function getTotalCart(){
    try {
        const token = localStorage.getItem('AUTH_TOKEN')
        // Llamar a tu servicio para eliminar el producto
        const url = `${import.meta.env.VITE_API_URL}/api/cart/cartTotal`
        return await axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
)
    } catch (error) {
        console.log(error)
    }
}

export async function getTotalNormalInstallment(){
    try {
        const token = localStorage.getItem('AUTH_TOKEN')
        // Llamar a tu servicio para eliminar el producto
        const url = `${import.meta.env.VITE_API_URL}/api/cart/normalInstallment`
        const data = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return data.data.abonoNormal
    } catch (error) {
        console.log(error)
    }
}

export async function getTotalPunctualInstallment(){
    try {
        const token = localStorage.getItem('AUTH_TOKEN')
        // Llamar a tu servicio para eliminar el producto
        const url = `${import.meta.env.VITE_API_URL}/api/cart/punctualInstallment`
        const data = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return data.data.abonoPuntual
    } catch (error) {
        console.log(error)
    }
}

export async function increaseQuantity(idProduct : CartType['idProduct']){
    try {
        const token = localStorage.getItem('AUTH_TOKEN')
        // URL a la que mandaremos los datos
        const url = `${import.meta.env.VITE_API_URL}/api/cart/increaseQuantity/${idProduct}`
        return await axios.patch(url, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    } catch (error) {
        console.log(error)
    }
}

export async function decreaseQuantity(idProduct : CartType['idProduct']){
    try {
        const token = localStorage.getItem('AUTH_TOKEN')
        // URL a la que mandaremos los datos
        const url = `${import.meta.env.VITE_API_URL}/api/cart/decreaseQuantity/${idProduct}`
        return await axios.patch(url, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    } catch (error) {
        console.log(error)
    }
}

export async function deleteProductCart(idProduct: CartType['idProduct']){
    try {
        const token = localStorage.getItem('AUTH_TOKEN')
        // Llamar a tu servicio para eliminar el producto
        const url = `${import.meta.env.VITE_API_URL}/api/cart/${idProduct}`
        return await axios.delete(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    } catch (error) {
        console.log(error)
    }
}

export async function updateDeadline(plazo: CartType['plazoPago']){
    try {
        const token = localStorage.getItem('AUTH_TOKEN')
        const url = `${import.meta.env.VITE_API_URL}/api/cart/plazo`
        return await axios.patch(url, {
            plazo: plazo
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    } catch (error) {
        console.log(error)
    }
}