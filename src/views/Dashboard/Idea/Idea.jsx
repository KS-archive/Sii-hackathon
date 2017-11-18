import React, { Component } from 'react';
import { IdeaWrapper } from './Idea_styles';

export default class Idea extends Component {
  render() {
    return (
      <IdeaWrapper>{this.props.text}</IdeaWrapper>
    );
  }
}
