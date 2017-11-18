import React, { Component } from 'react';
import { withRouter } from 'react-router';
import NotificationSystem from 'react-notification-system';
import connect from 'react-redux/lib/connect/connect';
import { AppName, Container, Body } from './Index_styles';


@withRouter
class Index extends Component {
  componentDidMount() {
    this._notificationSystem = this.notificationSystem;
  }

  componentWillReceiveProps(nextProps) {
    const notification = nextProps.notifications[nextProps.notifications.length - 1];
    if (this.props.notifications !== nextProps.notifications) this.addNotification(notification);
  }

  addNotification = (notification) => {
    this._notificationSystem.addNotification({
      ...notification,
      position: 'tc',
      autoDismiss: 5,
    });
  };

  render() {
    return (
      <Container>
        <AppName key="AppName">Brainstorm.io</AppName>
        <Body>
          {this.props.children}
        </Body>
        <NotificationSystem ref={(c) => { this.notificationSystem = c; }} />
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    notifications: state.notifications,
  };
}

export default connect(mapStateToProps)(Index);
