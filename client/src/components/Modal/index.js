// @flow
import React, { useContext } from 'react';
import ReactDOM from 'react-dom';

import { ModalContext } from '../../context/ModalContext';

const Modal = () => {
  const { visible, modalContent } = useContext(ModalContext);
  return visible
    ? ReactDOM.createPortal(
        <div className='ui dimmer modals visible active'>
          <div className='ui standard test modal transition visible active'>
            {modalContent}
          </div>
        </div>,
        document.querySelector('#root-modal')
      )
    : null;
};

export default Modal;
