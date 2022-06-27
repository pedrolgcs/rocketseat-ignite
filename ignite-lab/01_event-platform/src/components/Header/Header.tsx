import React from 'react';
import { Link } from 'react-router-dom';
import logoImg from '../../assets/images/logo.svg';

const Header: React.FC = () => {
  return (
    <header className="w-full py-5 flex items-center justify-center bg-gray-700 border-b border-gray-600">
      <Link to="/">
        <img src={logoImg} alt="ignite-lab" />
      </Link>
    </header>
  );
};

export { Header };
