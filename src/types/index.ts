import { InferOutput, number, object, string, array, pipe, email } from "valibot";

// Creamos el schema de nuestros datos
export const DraftProductSchema = object({
    name: string(),
    description: string(), 
    price: number()
})

// Schema de productos
export const ProductSchema = object({
    idProduct: number(),
    name: string(),
    description: string(), 
    price: number()
})

// Convertimos en un arreglo el schema
export const ProductsSchema = array(ProductSchema)

export type Product = InferOutput<typeof ProductSchema>

// Creamos el schema de productos
export const DraftCartSchema = object({
    idProduct: number(),
    name: string(),
    quantity: number(),
    description: string(), 
    price: number()
})

// Creamos el schema de carrito de compras
export const CartSchema = object({
    idProduct: number(),
    name: string(),
    quantity: number(),
    description: string(), 
    price: number(),
    plazoPago: number(),
    abonoNormal: number(),
    abonoPuntual: number()
})

// Convertimos en un arreglo el schema
export const CartsSchema = array(CartSchema)

export type CartType = InferOutput<typeof CartSchema>

// Opciones plazos
export type Deadline = {
    plazo: number
}

// Creamos el schema de carrito de compras
export const authSchemaForm = object({
    name: string(),
    email: pipe(string(), email()),
    password: string(),
    password_confirmation: string(),
})

export const authLogin = object({
    email: pipe(string(), email()),
    password: string()
})

// Schema de productos
export const authSchema = object({
    idUser: number(),
    name: string(),
    email: pipe(string(), email()),
    password: string(),
    password_confirmation: string(),
})

export type Auth = InferOutput<typeof authSchema>
