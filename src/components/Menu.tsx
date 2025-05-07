import { ArrowLeftStartOnRectangleIcon, Bars3Icon, PlusIcon, ShoppingBagIcon, TagIcon, WalletIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

export default function Menu() {
    const navigate = useNavigate()

    const logout = () => {
        localStorage.removeItem('AUTH_TOKEN')
        navigate('/auth/login');
    }

    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setMenuOpen(false);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
      <div className=' flex flex-row lg:flex-col justify-between lg:justify-normal pb-4 md:pb-0'>
          <div className=' flex flex-col items-center justify-center md:justify-normal'>
              <img className=' w-10 h-10' src="/Logo.png" alt="" />
              <h2 className=' hidden lg:block text-xl font-bold'>Canal de terceros</h2>
          </div>
          
          {/* Botón hamburguesa visible solo en móvil */}
          <div className="lg:hidden flex items-center justify-end py-0 md:py-4">
              <button onClick={toggleMenu} className="text-gray-800 focus:outline-none">
                  <Bars3Icon className="h-6 w-6" />
              </button>
          </div>

          {/* Menú lateral móvil */}
          <div
              onClick={toggleMenu}
              className={`fixed inset-0 bg-black bg-opacity-40 z-40 transition-opacity duration-300 ${menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
                  }`}
          ></div>
          <div
              className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 flex flex-col p-4 transform transition-transform duration-300 ease-in-out ${menuOpen ? "translate-x-0" : "-translate-x-full"
                  }`}
          >
              <div className="flex justify-between items-center mb-8">
                  <h2 className="text-green-900 font-bold text-2xl">Menú</h2>
                  <button onClick={toggleMenu}>
                      <XMarkIcon className="h-6 w-6 text-gray-800" />
                  </button>
              </div>

              <nav className="flex flex-col gap-5">
                  <Link
                      to="/"
                      className="shadow-person flex flex-row items-center container-button rounded-lg"
                      onClick={toggleMenu}
                  >
                      <button className="shadow-p p-4 flex justify-center items-center rounded-lg button-icon">
                          <TagIcon className="font-bold icon h-5 w-5 text-green-900" />
                      </button>
                      <div className="text-button rounded-md text-base font-medium text-black hover:text-white px-2">
                          Catálogo productos
                      </div>
                  </Link>
                  <Link
                      to="/productos/administrar"
                      className="shadow-person flex flex-row items-center container-button rounded-lg"
                      onClick={toggleMenu}
                  >
                      <button className="shadow-p p-4 flex justify-center items-center rounded-lg button-icon">
                          <WalletIcon className="font-bold icon h-5 w-5 text-green-900" />
                      </button>
                      <div className="text-button rounded-md text-base font-medium text-black hover:text-white px-2">
                          Administrar productos
                      </div>
                  </Link>
                  <Link
                      to="/productos/nuevo"
                      className="shadow-person flex flex-row items-center container-button rounded-lg"
                      onClick={toggleMenu}
                  >
                      <button className="shadow-p p-4 flex justify-center items-center rounded-lg button-icon">
                          <PlusIcon className="font-bold icon h-5 w-5 text-green-900" />
                      </button>
                      <div className="text-button rounded-md text-base font-medium text-black hover:text-white px-2">
                          Agregar producto
                      </div>
                  </Link>
                  <Link
                      to="/carrito"
                      className="shadow-person flex flex-row items-center container-button rounded-lg"
                      onClick={toggleMenu}
                  >
                      <button className="shadow-p p-4 flex justify-center items-center rounded-lg button-icon">
                          <ShoppingBagIcon className="font-bold icon h-5 w-5 text-green-900" />
                      </button>
                      <div className="text-button rounded-md text-base font-medium text-black hover:text-white px-2">
                          Ver carrito
                      </div>
                  </Link>
                  <div
                      className="shadow-person flex flex-row items-center container-button rounded-lg cursor-pointer"
                      onClick={() => {
                          logout?.();
                          toggleMenu();
                      }}
                  >
                      <button className="shadow-p p-3 flex justify-center items-center rounded-lg button-icon">
                          <ArrowLeftStartOnRectangleIcon className="font-bold icon h-5 w-5 text-green-900" />
                      </button>
                      <div className="text-button rounded-md text-base font-medium text-black hover:text-white px-2">
                          Cerrar Sesión
                      </div>
                  </div>
              </nav>
          </div>

          {/* Menú estático para pantallas grandes */}
          <div className="hidden lg:flex flex-col ">
              <div className=' flex flex-col gap-5 mt-8'>
                  <Link
                      to="/"
                      className=' shadow-person flex flex-row items-center container-button rounded-lg'
                  >
                      <button className='shadow-p p-4 flex justify-center items-center rounded-lg button-icon'>
                          <TagIcon
                              className=' font-bold icon h-5 w-5 text-green-900'
                          />
                      </button>
                      <div

                          className=' text-button rounded-md text-base font-medium text-black hover:text-white px-2'
                      >
                          Catálogo productos
                      </div>
                  </Link>
                  <Link
                      to="/productos/administrar"
                      className=' shadow-person flex flex-row items-center container-button rounded-lg'
                  >
                      <button className='shadow-p p-4 flex justify-center items-center rounded-lg button-icon'>
                          <WalletIcon
                              className=' font-bold icon h-5 w-5 text-green-900'
                          />
                      </button>
                      <div

                          className=' text-button rounded-md text-base font-medium text-black hover:text-white px-2'
                      >
                          Administrar productos
                      </div>
                  </Link>
                  <Link
                      to="/productos/nuevo"
                      className=' shadow-person flex flex-row items-center container-button rounded-lg'
                  >
                      <button className='shadow-p p-4 flex justify-center items-center rounded-lg button-icon'>
                          <PlusIcon
                              className=' font-bold icon h-5 w-5 text-green-900'
                          />
                      </button>
                      <div

                          className=' text-button rounded-md text-base font-medium text-black hover:text-white px-2'
                      >
                          Agregar producto
                      </div>
                  </Link>
                  <Link
                      to="/carrito"
                      className=' shadow-person flex flex-row items-center container-button rounded-lg'
                  >
                      <button className='shadow-p p-4 flex justify-center items-center rounded-lg button-icon'>
                          <ShoppingBagIcon
                              className=' font-bold icon h-5 w-5 text-green-900'
                          />
                      </button>
                      <div
                          className=' text-button rounded-md text-base font-medium text-black hover:text-white px-2'
                      >
                          Ver carrito
                      </div>
                  </Link>
                  <div
                      className=' shadow-person flex flex-row items-center container-button rounded-lg cursor-pointer'
                      onClick={() => {
                          logout?.();
                      }}
                  >
                      <button className='shadow-p p-3 flex justify-center items-center rounded-lg button-icon'>
                          <ArrowLeftStartOnRectangleIcon
                              className=' font-bold icon h-5 w-5 text-green-900'
                          />
                      </button>
                      <div

                          className=' text-button rounded-md text-base font-medium text-black hover:text-white px-2'
                      >
                          Cerrar Sesión
                      </div>
                  </div>
              </div>
          </div>
      </div>
  )
}
