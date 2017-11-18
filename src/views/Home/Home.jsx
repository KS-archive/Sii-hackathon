import React, { Component } from 'react';
import connect from 'react-redux/lib/connect/connect';
import bindActionCreators from 'redux/lib/bindActionCreators';
import { createBoard } from '../../actions/board';
import { addNotification } from '../../actions/notifications';
import { inputStyle } from '../../utils/constants/styles';
import { Container, Middle, Logo, Header, Subheader, Input, Button } from './Home_styles';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomName: '',
    };
  }

  createRoom = (e) => {
    e.preventDefault();
    const { roomName } = this.state;
    this.props.createBoard(roomName, () => {
      this.props.history.push(`/${roomName}`);
    }, () => {
      this.props.addNotification('Wystąpił błąd', 'Ten pokój jest obecnie zajęty', 'error');
    });
  }

  render() {
    return (
      <Container key="Container">
        <Middle>
          <Logo src="/img/logo.svg" />
          <Header>Burze mózgów na zawołanie</Header>
          <Subheader>Wpisz nazwę pokoju i rozpocznij nawet w 30 sekund</Subheader>
          <Input
            floatingLabelText="Nazwa pokoju"
            value={this.state.roomName}
            onChange={e => this.setState({ roomName: e.target.value })}
            {...inputStyle}
          />
          <Button primary onClick={this.createRoom} label="Utwórz pokój" />
        </Middle>
      </Container>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ createBoard, addNotification }, dispatch);
}

export default connect(null, mapDispatchToProps)(Home);
