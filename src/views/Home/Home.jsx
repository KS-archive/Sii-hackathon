import React, { Component } from 'react';
import connect from 'react-redux/lib/connect/connect';
import bindActionCreators from 'redux/lib/bindActionCreators';
import { createBoard } from '../../actions/board';
import { addNotification } from '../../actions/notifications';
import { inputStyle } from '../../utils/constants/styles';
import { setCookie } from '../../utils/cookies';
import { Container, Middle, Logo, Header, Subheader, Input, Button } from './Home_styles';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      fullname: '',
      time: '',
    };
  }

  createRoom = () => {
    const { name, fullname, time } = this.state;
    this.props.createBoard({
      name, fullname, time, phase: 1,
    }, () => {
      setCookie('admin', fullname);
      window.location.href = `/${name}`;
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
            value={this.state.name}
            onChange={e => this.setState({ name: e.target.value })}
            {...inputStyle}
          />
          <Input
            floatingLabelText="Imię i nazwisko"
            value={this.state.fullname}
            onChange={e => this.setState({ fullname: e.target.value })}
            {...inputStyle}
          />
          <Input
            floatingLabelText="Czas burzy mózgów (w minutach)"
            value={this.state.time}
            onChange={e => this.setState({ time: e.target.value })}
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
