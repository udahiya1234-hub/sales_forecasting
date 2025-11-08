
import React from 'react';

interface FooterProps {
  colabLink: string;
}

const Footer: React.FC<FooterProps> = ({ colabLink }) => {
  return (
    <footer className="bg-gray-800 text-white p-6 mt-10 shadow-inner">
      <div className="container mx-auto text-center text-sm">
        <p className="mb-2">&copy; {new Date().getFullYear()} Sales Forecasting Dashboard. All rights reserved.</p>
        <p>
          View the complete analysis on Google Colab:{" "}
          <a
            href={colabLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-300 hover:text-blue-100 underline transition-colors duration-200"
          >
            Colab Notebook
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
