// @flow
import * as React from 'react';

import Modal from '../components/Modal';

type ContextType = {
  handleModal: (element?: React.Node) => void,
  hideModal: () => void,
  visible: boolean,
  modalContent?: React.Node
};
const ModalContext: React.Context<ContextType> = React.createContext<ContextType>(
  {}
);
const { Provider } = ModalContext;

const ModalProvider = (props: { children: React.Node }) => {
  const [visible, setVisible] = React.useState<boolean>(false);
  const [modalContent, setModalContent] = React.useState<React.Node>(null);

  const handleModal = (element?: React.Node) => {
    setVisible(!visible);
    if (element) {
      setModalContent(element);
    }
  };

  const hideModal = () => {
    setVisible(false);
  };
  return (
    <Provider value={{ handleModal, hideModal, visible, modalContent }}>
      <Modal />
      {props.children}
    </Provider>
  );
};
export { ModalProvider, ModalContext };
