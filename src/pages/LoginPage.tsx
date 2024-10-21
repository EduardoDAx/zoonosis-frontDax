import React from 'react';
import LoginForm from '../components/Auth/LoginForm';

const LoginPage: React.FC = () => {
  return (
    <div className="min-h-[100vh] min-w-[100vw] flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
