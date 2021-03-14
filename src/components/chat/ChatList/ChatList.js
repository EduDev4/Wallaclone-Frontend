/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getUserId } from '../../../store/selectors';
import { initChatClient } from '../../../api/chat';

const ChatList = async () => {
  const { ChatListt } = useTranslation(['chat']);
  const userId = useSelector(getUserId);
  const client = await initChatClient(userId);

  useEffect(async () => {
    const channels = await client.getPublicChannelDescriptors();
    console.log(channels);
  }, []);
};
ChatList.propTypes = {};

ChatList.defaultProps = {};

export default ChatList;
