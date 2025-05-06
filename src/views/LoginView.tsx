import { ActionFunctionArgs, Form, Link, redirect } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login } from '../services/AuthService'

export async function action({request} : ActionFunctionArgs){
  const data = Object.fromEntries(await request.formData())
  let error = ''

  if(Object.values(data).includes('')){
      return error = 'Todos los campos son obligatorios'
      
  }

  const result = await login(data);
  if (result.error) {
    toast.error(result.error);
    return result.error;
  }

  if (result) {
    localStorage.setItem('AUTH_TOKEN', result)
    return redirect('/');
  }
}

export default function LoginView() {

  return (
    <>
      <div className=" flex flex-col bg-white px-3 py-6 items-center rounded-lg shadow-md">
        <h1 className="font-bold text-colorPrimario text-2xl mb-1">Inicio de sesión</h1>
        
        <Form
          method='POST'
          className="space-y-4 w-full px-4"
          noValidate
        >
          <div className="flex flex-col gap-2">
            <label
              className="text-base font-semibold"
              htmlFor="email"
            >Email</label>

            <input
              id="email"
              type="email"
              name="email"
              placeholder="Ej. juan@gmail.com"
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
              placeholder="********"
              className="w-full p-2 text-sm border border-gray-300 rounded-md"
            />
            
          </div>
          
          <input
            type="submit"
            value='Iniciar Sesión'
            className="bg-green-700 hover:bg-green-800 w-full py-1 px-4 text-white font-semibold cursor-pointer transition-colors rounded text-center"
          />
          <nav className=" flex flex-col space-y-1">
            <Link
              to={'/auth/register'}
              className=" text-center text-gray-500 font-normal"
            >¿No tienes cuenta? <span className=" text-colorPrimario font-semibold">Crea una</span>
            </Link>
            <Link
              to="/"
              className="text-center text-gray-500 font-normal"
            >
              Volver al <span className=" text-colorPrimario font-semibold">Inicio</span>
            </Link>
          </nav>
        </Form>
      </div>
    </>
  )
}
