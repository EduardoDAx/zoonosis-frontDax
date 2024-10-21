import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import api from '../../config/axiosConfig'; // Importamos Axios

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const formik = useFormik<LoginFormValues>({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Formato de email inválido').required('El email es obligatorio'),
      password: Yup.string().min(6, 'La contraseña debe tener al menos 6 caracteres').required('La contraseña es obligatoria'),
    }),
    onSubmit: async (values) => {
      try {
        // Hacemos la petición POST para hacer login
        const response = await api.post('/login', {
          email: values.email,
          password: values.password,
        },{
          withCredentials: true
        });
        alert('Inicio de sesión exitoso: ' + JSON.stringify(response.data, null, 2));
      } catch (error) {
        if (error instanceof Error) {
          alert('Error durante el inicio de sesión: ' + error.message);
        }
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <div className="flex justify-center mb-6">
          <img
            src="https://cdn-icons-png.flaticon.com/512/7432/7432647.png" // Reemplaza con la URL de tu icono de mosquito
            alt="Mosquito Icon"
             className="animate-fly w-16 h-16 "
          />
        </div>
        <h1 className="text-2xl font-bold text-center mb-6 text-black">Iniciar Sesión</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Email:</label>
            <input
              id="email"
              type="email"
              {...formik.getFieldProps('email')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500">{formik.errors.email}</div>
            ) : null}
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">Contraseña:</label>
            <input
              id="password"
              type="password"
              {...formik.getFieldProps('password')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-500">{formik.errors.password}</div>
            ) : null}
          </div>

          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
