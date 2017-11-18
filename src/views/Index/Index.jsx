import React, { Component } from 'react';
import { Container, Body } from './Index_styles';

export default class Index extends Component {
  render() {
    return (
      <Container>
        <Body>
          {this.props.children}
        </Body>
      </Container>
    );
  }
}
