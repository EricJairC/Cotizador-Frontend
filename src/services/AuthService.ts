import axios, { isAxiosError } from "axios";
import { safeParse } from "valibot";
import { authLogin, authSchemaForm } from "../types";

type UserData = {
  [k: string]: FormDataEntryValue;
}

// Comprobamos que los datos son los que necesitamos
export async function addUser(data: UserData) {
  try {
    // Pasamos el schema y los datos recuperados para compararlos en valibot
    const result = safeParse(authSchemaForm, {
      name: data.name,
      email: data.email,
      password: data.password,
      password_confirmation: data.password_confirmation
    })
    if (!result.success) {
      return { error: 'Datos no válidos' };
    }
    // URL a la que mandaremos los datos
    const url = `${import.meta.env.VITE_API_URL}/api/auth/create-account`
    // Definimos el metodo de axios
    const response = await axios.post(url, {
      // Mandamos los datos que fueron validados de valibot
      name: result.output.name,
      email: result.output.email,
      password: result.output.password,
      password_confirmation: result.output.password_confirmation,
    })
    return response.data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      const resData = error.response.data;

      if (typeof resData.error === 'string') {
        return { error: resData.error };
      }

      if (Array.isArray(resData.errors) && resData.errors.length > 0) {
        return { error: resData.errors[0].msg };
      }

      return { error: 'Error al intentar acceder' };
    }
  }
}

export async function login(data: UserData) {
  try {
    const result = safeParse(authLogin, {
      email: data.email,
      password: data.password
    });

    if (!result.success) {
      return { error: 'Datos no válidos' };
    }

    const url = `${import.meta.env.VITE_API_URL}/api/auth/login`;
    const response = await axios.post(url, {
      email: result.output.email,
      password: result.output.password
    });

    return response.data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      const resData = error.response.data;

      if (typeof resData.error === 'string') {
        return { error: resData.error };
      }

      if (Array.isArray(resData.errors) && resData.errors.length > 0) {
        return { error: resData.errors[0].msg };
      }

      return { error: 'Error al intentar acceder' };
    }
  }
}

export async function getUser() {
  try {
    const token = localStorage.getItem('AUTH_TOKEN')
    const url = `${import.meta.env.VITE_API_URL}/api/auth/user`;
    const { data } = await axios.get(url, {
      headers: {
          Authorization: `Bearer ${token}`
      }
  })
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}