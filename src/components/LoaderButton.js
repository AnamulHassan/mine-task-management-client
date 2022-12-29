import React from 'react';
import { Oval } from 'react-loader-spinner';

const LoaderButton = () => {
  return (
    <Oval
      ariaLabel="loading-indicator"
      height={25}
      width={25}
      strokeWidth={5}
      strokeWidthSecondary={3}
      color="#6b1d5c"
      secondaryColor="white"
    />
  );
};

export default LoaderButton;
