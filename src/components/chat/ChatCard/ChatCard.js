/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button } from 'antd';
import { getUserId } from '../../../store/selectors';
import { getApiBaseUrl } from '../../../config/envConfig';
import { getAdvertDetail } from '../../../api/adverts';
import { getUserNameFromId } from '../../../api/users';

const ChatCard = ({ adId, otherUserId, room }) => {
  const { t } = useTranslation(['chat']);
  const history = useHistory();
  const userId = useSelector(getUserId);
  const [ad, setAd] = useState(null);
  const [otherUsername, setOtherUsername] = useState('');

  const handleClick = () => {
    history.push(`/chat`, {
      room,
      email: userId,
      adName: ad.name,
      owner: ad.createdBy.username,
    });
  };

  useEffect(async () => {
    const { advert } = await getAdvertDetail(adId);
    const { username } = await getUserNameFromId(otherUserId);
    setAd(advert);
    setOtherUsername(username);
  }, []);

  return (
    ad && (
      <article className="chat-card">
        <h2>{otherUsername}</h2>
        <img
          src={
            ad.thumb
              ? `${getApiBaseUrl()}${ad.thumb}`
              : `${getApiBaseUrl()}/img/adverts/noAdImage.jpg`
          }
          alt={ad.name}
          className="advert-photo"
        />
        <p>{ad.name}</p>
        <Button type="primary" onClick={handleClick}>
          Chat
        </Button>
      </article>
    )
  );
};
ChatCard.propTypes = {
  otherUserId: PropTypes.string.isRequired,
  adId: PropTypes.string.isRequired,
  room: PropTypes.string.isRequired,
};

export default ChatCard;
