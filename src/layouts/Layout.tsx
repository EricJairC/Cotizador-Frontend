import { Outlet, redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { getUser } from '../services/AuthService';

export async function loader() {
    try {
      const user = await getUser()
      return user
    } catch (error) {
      return redirect('/auth/login')
    }
  }

export default function Layout() {

  return (
    <>
        <header className=' w-full bg-green-800'>
            <div className=' mx-3 md:mx-5 lg:mx-auto lg:w-9/12 lg:min-w-[950px] py-4 md:py-8'>
                <h1 className=' text-2xl md:text-4xl font-bold text-white'>
                    Cotizador de créditos
                </h1>
            </div>
        </header>
        <div className=' mx-3 md:mx-5 lg:mx-0'>
          <main className=' my-5 lg:my-10 w-9/12 min-w-full lg:mx-auto lg:min-w-[950px] p-6 bg-white shadow-lg rounded-md '>
              <Outlet/>
          </main>
        </div>
        <ToastContainer/>
    </>
  )
}
