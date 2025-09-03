


import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const HomeFooter = (props) => {
  let { settings } = props

  return (
    <div className=' home-footer'>
      <p>© 2025 HealthCare. All rights reserved.
        <a
          href="https://github.com/your-username/your-repo"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>

      </p>
    </div>
  );
};

export default HomeFooter;
