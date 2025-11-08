
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6 shadow-lg">
      <div className="container mx-auto">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center tracking-tight">
          Sales Forecasting Model Dashboard
        </h1>
        <p className="mt-2 text-md sm:text-lg text-center opacity-90">
          Comparing Scaled Linear Regression and Scaled Lasso Models
        </p>
      </div>
    </header>
  );
};

export default Header;
