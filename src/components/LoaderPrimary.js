import React from 'react';
import { Oval } from 'react-loader-spinner';

const LoaderPrimary = () => {
  return (
    <Oval
      ariaLabel="loading-indicator"
      height={80}
      width={80}
      strokeWidth={5}
      strokeWidthSecondary={3}
      color="#6b1d5c"
      secondaryColor="white"
    />
  );
};

export default LoaderPrimary;
