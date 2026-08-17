import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-blue-600 text-white p-4 text-center mt-10">
      &copy; {new Date().getFullYear()} SuRada Fish. All rights reserved.
    </footer>
  );
};

export default Footer;
