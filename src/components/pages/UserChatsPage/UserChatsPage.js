/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import MainLayout from '../../layout/MainLayout';
import ChatCard from '../../chat/ChatCard';
import { initChatClient } from '../../../api/chat';
import { getUserId } from '../../../store/selectors';

import '../UserPage/UserPage.css';
import UserPageAside from '../UserPage/UserPageAside';
import './UserChatsPage.css';
import Spinner from '../../shared/Spinner';

function UserChatsPage({ match, currentUsername, currentUserId, isLogged }) {
  const [userChannels, setUserChannels] = useState([]);
  const [loadingChats, setLoadingChats] = useState(true);
  const [userClient, setUserClient] = useState(null);
  const user = match.params.username;
  const userId = useSelector(getUserId);
  const { t } = useTranslation(['userpage']);

  const getUserChannels = async client => {
    const { items } = await client.getPublicChannelDescriptors();
    // console.log(items);
    const uCh = items.filter(
      ch =>
        typeof ch.friendlyName === 'string' && ch.friendlyName.includes(userId),
    );
    console.log(uCh);
    setUserChannels(uCh);
    setLoadingChats(false);
  };

  const handleDeleteChat = async chDesc => {
    setLoadingChats(true);
    const channel = await chDesc.getChannel();
    await channel.leave();
    await getUserChannels(userClient);
  };
  useEffect(async () => {
    const client = await initChatClient(currentUserId);
    setUserClient(client);
    getUserChannels(client);
  }, []);

  const renderChats = () => {
    if (!userChannels) return null;

    return userChannels.map(ch => (
      <ChatCard
        key={ch.sid}
        adId={ch.friendlyName.split('-')[0]}
        room={ch.friendlyName}
        otherUserId={
          ch.friendlyName.split('-')[1] === userId
            ? ch.friendlyName.split('-')[2]
            : ch.friendlyName.split('-')[1]
        }
        onDelete={() => handleDeleteChat(ch)}
      />
    ));
  };

  return (
    <MainLayout title="">
      <div className="userPage">
        <div className="grid-container">
          <aside className="userPage-aside">
            <UserPageAside user={user} />
          </aside>
          <div className="userPage-content">
            {isLogged && currentUsername === user ? (
              <h2>{t('Mis Conversaciones')}</h2>
            ) : null}
            <div className="userPage-chatswrapper flex-container">
              {loadingChats ? <Spinner /> : renderChats()}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

UserChatsPage.propTypes = {
  // eslint-disable-next-line react/require-default-props

  currentUsername: PropTypes.string,
  currentUserId: PropTypes.string.isRequired,
  // currentUserEmail: PropTypes.string,
  isLogged: PropTypes.bool,
  // eslint-disable-next-line react/require-default-props
  match: PropTypes.shape({
    params: PropTypes.shape({
      username: PropTypes.string.isRequired,
    }),
  }),
};

UserChatsPage.defaultProps = {
  currentUsername: '',
  isLogged: false,
};

export default UserChatsPage;
