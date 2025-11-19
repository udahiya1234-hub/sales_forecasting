
import React from 'react';

interface FooterProps {
  colabLink: string;
}

const Footer: React.FC<FooterProps> = ({ colabLink }) => {
  return (
    <footer className="text-slate-400 py-12 border-t border-white/10 bg-slate-900 relative z-20">
      <div className="container mx-auto text-center px-4">
        <p className="mb-4 font-medium text-slate-300">&copy; {new Date().getFullYear()} Sales Forecasting Analytics.</p>
        <div className="flex justify-center items-center space-x-2 text-sm">
          <span>Verified with</span>
          <a
            href={colabLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-indigo-400 hover:text-indigo-300 transition-colors font-semibold"
          >
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/d/d0/Google_Colaboratory_SVG_Logo.svg" 
              alt="Colab" 
              className="w-4 h-4 mr-1.5" 
            />
            Google Colab
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
