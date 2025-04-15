import React from 'react';
import './Extras.css';

const ErrorWarning: React.FC<{ title: string }> = ({ title }) => {
  return (
    <div className='d-flex flex-col justify-center items-center py-12'>
      <img src={'/assets/warning.svg'} alt="Warning" className='white-image w-64 mx-auto' />
      <h2 style={{ color: '#fff', textAlign: 'center', fontSize: '2rem' }}>
        {title}
      </h2>
    </div>
  );
};

export default ErrorWarning;