import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Modal, Button } from 'antd';

export default function ConfirmButton({
  acceptAction,
  confirmProps,
  typeButton,
  ...buttonProps
}) {
  const [modalVisible, setModalVisible] = useState(false);
  const showModal = () => {
    setModalVisible(true);
  };

  const handleConfirm = () => {
    setModalVisible(false);
    acceptAction();
  };

  const handleCancel = () => {
    setModalVisible(false);
  };
  const { message } = confirmProps;
  return (
    <>
      <Button type={typeButton} onClick={showModal} {...buttonProps} />

      <Modal
        title="Delete Advert"
        visible={modalVisible}
        onOk={handleConfirm}
        onCancel={handleCancel}
        {...confirmProps}
      >
        <p>{message}</p>
      </Modal>
    </>
  );
}

ConfirmButton.propTypes = {
  acceptAction: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  confirmProps: PropTypes.object.isRequired,
  typeButton: PropTypes.string,
};
ConfirmButton.defaultProps = {
  typeButton: 'primary',
};
