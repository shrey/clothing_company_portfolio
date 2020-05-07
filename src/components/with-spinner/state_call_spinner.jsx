import React from 'react';

import { SpinnerContainer, SpinnerOverlay } from './with-spinner.styles';


  const StateSpinner = () => {
    return  (
      <SpinnerOverlay>
        <SpinnerContainer />
      </SpinnerOverlay>
    )
  };
  

export default StateSpinner;