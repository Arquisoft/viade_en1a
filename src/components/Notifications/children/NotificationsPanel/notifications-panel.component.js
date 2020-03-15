import React from 'react';
import { NotificationList, Tabs } from './children';
import { Panel, Title } from './notifications-panel.style';
import { Loader } from '@util-components';
import { NavLink } from 'react-router-dom';

type Props = {
  notifications: Array,
  markAsRead: Function,
  deleteNotification: () => void,
  fetchNewNotifications: () => void,
  filterNotification: () => void,
  tabs: Array<Object>,
  isLoading: boolean
};

const style = {
  background: 'linear-gradient(45deg, #cad4ed 30%, #b3e9f5 90%)',
  borderRadius: 3,
  border: 0,
  color: 'black',
  height: 48,
  padding: '15px 30px',
  textDecoration: 'none',
  fontSize: '15px',
  textAlign: 'center',
  fontFamily: 'Raleway', 
};


const NotificationsPanel = ({
  notifications,
  markAsRead,
  deleteNotification,
  filterNotification,
  tabs,
  isLoading
}: Props) => (
  <Panel>
    <Title>Notifications</Title>
    {isLoading ? (
      <Loader absolute />
    ) : (
      <React.Fragment>
        <Tabs {...{ list: tabs, click: filterNotification }} />
        <NotificationList {...{ notifications, markAsRead, deleteNotification }} />
		<NavLink to={'/notifications'} style={style}>
              <span className="label">Ver todas</span>
            </NavLink>
	  </React.Fragment>
    )}
  </Panel>
);

export default NotificationsPanel;
