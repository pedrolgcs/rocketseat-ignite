import React from 'react';
import logoImg from '../../assets/images/logo.svg';

const Header: React.FC = () => {
  return (
    <header className="w-full py-5 flex items-center justify-center bg-gray-700 border-b border-gray-600">
      <img src={logoImg} alt="ignite-lab" />
    </header>
  );
};

export { Header };
