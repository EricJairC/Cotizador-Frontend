import { ActionFunctionArgs, Form, Link, redirect, useActionData } from 'react-router-dom'
import { toast } from 'react-toastify'
import ErrorMessage from '../components/ErrorMessage'
import { addUser } from '../services/AuthService'

export async function action({request} : ActionFunctionArgs){
    const data = Object.fromEntries(await request.formData())
    let error = ''

    if(Object.values(data).includes('')){
        error = 'Todos los campos son obligatorios'
        return error
    }

    // Aquí capturamos el error (si lo hay)
    const addUserError = await addUser(data);

    if (addUserError) {
        return addUserError;
    }

    // Mandamos una retroalimentación
    toast.success('Usuario creado correctamente')

    return redirect('/auth/login')
}

export default function RegisterView() {
    const error = useActionData() as string
  return (
    <>
      <div className="flex flex-col bg-white px-3 py-6 items-center rounded-lg shadow-md">
        <h1 className="font-bold text-colorPrimario text-2xl mb-1">Crear Cuenta</h1>
        <Form
          method='POST'
          className="space-y-4 w-full px-4"
        >
          <div className="flex flex-col gap-2">
            <label
              className="text-base font-semibold"
              htmlFor="email"
            >Email</label>
            <input
                id="email"
                type="text"
                placeholder="Email de Registro"
                className="w-full p-2 text-sm border border-gray-300 rounded-md"
                name="email"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              className="text-base font-semibold"
              htmlFor='name'
            >Nombre</label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Nombre de Registro"
              className="w-full p-2 text-sm border border-gray-300 rounded-md"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              className="text-base font-semibold"
              htmlFor='password'
            >Password</label>

            <input
              id="password"
              type="password"
              name="password"
              placeholder="Password de Registro"
              className="w-full p-2 text-sm border border-gray-300 rounded-md"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              className="text-base font-semibold"
              htmlFor='password_confirmation'
            >Repetir Password</label>

            <input
              id="password_confirmation"
              type="password"
              name='password_confirmation'
              placeholder="Repite Password de Registro"
              className="w-full p-2 text-sm border border-gray-300 rounded-md"
            />
          </div>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <input
            type="submit"
            value='Registrarme'
            className="bg-green-700 hover:bg-green-800 w-full py-1 px-4 text-white font-semibold cursor-pointer transition-colors rounded text-center"
          />
        </Form>
        <nav className=" mt-5 flex flex-col space-y-1">
            <Link
              to={'/auth/login'}
              className=" text-center text-gray-500 font-normal"
            >¿Ya tienes cuenta? <span className=" text-colorPrimario font-semibold">Iniciar sesión</span>
            </Link>
            <Link
              to="/"
              className="text-center text-gray-500 font-normal"
            >
              Volver al <span className=" text-colorPrimario font-semibold">Inicio</span>
            </Link>
        </nav>
      </div>
    </>
  )
}
