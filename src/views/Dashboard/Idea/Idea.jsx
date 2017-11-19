import React, { Component } from 'react';
import LightBulb from 'material-ui/svg-icons/action/lightbulb-outline';
import { IdeaWrapper, IconWrapper } from './Idea_styles';

export default class Idea extends Component {
  render() {
    return (
      <IdeaWrapper>
        {this.props.phase === 2
          ? <IconWrapper><LightBulb /></IconWrapper>
          : this.props.text
        }
      </IdeaWrapper>
    );
  }
}
