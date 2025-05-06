import { createBrowserRouter } from 'react-router-dom'
import { action as addProductCart } from './components/ProductDetails'
import Layout from './layouts/Layout'
import EditProduct, { action as editProductAction, loader as editProductLoader } from './views/EditProduct'
import NewProduct, { action as newProductAction } from './views/NewProduct'
import Products, { loader as productsLoader } from './views/Products'
import Store, { action as deleteProductAction, loader as productsUserLoaders } from './views/Store'
import Cart, { loader as cartLoader, action as updatePlazo } from './views/Cart'
import {action as increaseQuantity} from './components/CartDetails'
import AuthLayout from './layouts/AuthLayout'
import LoginView from './views/LoginView'
import RegisterView from './views/RegisterView'
import {action as addUser} from './views/RegisterView'
import {action as login} from './views/LoginView'
import {loader as authLoader } from './layouts/Layout'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout/>,
        loader: authLoader,
        children: [
            {
                index: true,
                element: <Products />,
                loader: productsLoader,
                action: addProductCart
            },
            {
                path: 'productos/nuevo',
                element: <NewProduct/>,
                action: newProductAction
            },
            {
                path:'productos/administrar',
                element: <Store/>,
                loader: productsUserLoaders,
                action: deleteProductAction
            },
            {
                path: 'productos/:idProduct/editar',
                element: <EditProduct/>,
                loader: editProductLoader,
                action: editProductAction
            },
            {
                path: 'carrito',
                element: <Cart/>,
                loader: cartLoader,
                action: increaseQuantity,
                children:[
                    {
                        path: 'updatePlazo',
                        action: updatePlazo
                    }
                ]
            }
        ],
    },
    {
        path: '/auth',
        element: <AuthLayout />,
        children: [
            {
                path: 'login',
                element: <LoginView/>,
                action: login
            },
            {
                path: 'register',
                element: <RegisterView/>,
                action: addUser
            }
        ]
    }
])