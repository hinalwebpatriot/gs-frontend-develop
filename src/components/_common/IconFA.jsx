import { isServer } from '../../utils/isServer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const IconFA = (props) => {
  return isServer ? null : <FontAwesomeIcon {...props}/>
}

export default IconFA
