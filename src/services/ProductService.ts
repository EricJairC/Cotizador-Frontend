import { safeParse } from "valibot";
import { DraftProductSchema, ProductsSchema, Product, ProductSchema, CartType, DraftCartSchema } from "../types"
import axios from "axios";

type ProductData = {
    [k: string]: FormDataEntryValue;
}

// Comprobamos que los datos son los que necesitamos
export async function addProduct(data : ProductData){
    try {
        const token = localStorage.getItem('AUTH_TOKEN')
        // Pasamos el schema y los datos recuperados para compararlos en valibot
        const result = safeParse(DraftProductSchema, {
            name: data.name,
            description: data.description,
            price: +data.price
        })
        if(result.success){
            // URL a la que mandaremos los datos
            const url = `${import.meta.env.VITE_API_URL}/api/products`
            // Definimos el metodo de axios
            await axios.post(url, {
                // Mandamos los datos que fueron validados de valibot
                name: result.output.name,
                description: result.output.description,
                price: result.output.price
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        }else{
            throw new Error('Datos no válidos')
        }
    } catch (error) {
        console.log(error)
    }
}

export async function getProducts(){
    try {
        const token = localStorage.getItem('AUTH_TOKEN')
        // URL a la que mandaremos los datos
        const url = `${import.meta.env.VITE_API_URL}/api/products`
        const { data } = await axios(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        const result = safeParse(ProductsSchema, data.data)
        if(result.success){
            return result.output
        }else{
            throw new Error('Hubo un error')
        }
    } catch (error) {
        console.log(error)
    }
}

export async function getAllProducts(){
    try {
        // URL a la que mandaremos los datos
        const url = `${import.meta.env.VITE_API_URL}/api/products/getAllProducts`
        const { data } = await axios(url)
        const result = safeParse(ProductsSchema, data.data)
        if(result.success){
            return result.output
        }else{
            throw new Error('Hubo un error')
        }
    } catch (error) {
        console.log(error)
    }
}

export async function getProductById(idProduct : Product['idProduct']){
    try {
        // URL a la que mandaremos los datos
        const url = `${import.meta.env.VITE_API_URL}/api/products/${idProduct}`
        const { data } = await axios(url)
        const result = safeParse(ProductSchema, data.data)
        if(result.success){
            return result.output
        }else{
            throw new Error('Hubo un error')
        }
    } catch (error) {
        console.log(error)
    }
}

export async function updateProduct(data : ProductData, idProduct : Product['idProduct']){
    try {
        const token = localStorage.getItem('AUTH_TOKEN')
        const result = safeParse(ProductSchema, {
            idProduct,
            name: data.name,
            description: data.description, 
            price: +data.price
        })
        if(result.success){
            const url = `${import.meta.env.VITE_API_URL}/api/products/${idProduct}`
            await axios.patch(url, result.output, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        }
    } catch (error) {
        console.log(error)
    }
}

export async function deleteProduct(idProduct: number) {
    try {
        
        const url = `${import.meta.env.VITE_API_URL}/api/products/${idProduct}`
        await axios.delete(url)
    } catch (error) {
        console.log(error)
    }
}

export async function addProductCart(product: CartType){
    try {
        const token = localStorage.getItem('AUTH_TOKEN')
        // Pasamos el schema y los datos recuperados para compararlos en valibot
        const result = safeParse(DraftCartSchema, {
            idProduct: product.idProduct,
            name: product.name,
            quantity: 1,
            description: product.description,
            price: +product.price,
        })
        if (result.success) {
            // URL a la que mandaremos los datos
            const url = `${import.meta.env.VITE_API_URL}/api/cart`
            // Definimos el metodo de axios
            await axios.post(url, {
                // Mandamos los datos que fueron validados de valibot
                idProduct: result.output.idProduct,
                name: result.output.name,
                quantity: result.output.quantity,
                description: result.output.description,
                price: result.output.price,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        }
    } catch (error) {
        console.log(error)
    }
}