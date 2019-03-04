import React, { Component } from 'react';
import Scene from '../../Scene';
import Sprite from '../../Sprite';
import { Phone, Home } from '../../../assets';

export default class LockerRoomScene extends Component {
  componentDidMount() {
    this.props.story.set('has_jenny', false);
  }

  render() {
    return (
      <Scene background={Home} verticalAlign="top">
        <Sprite sprite={Phone} x={200 - Phone.width / 2} y={20} animation="loopSad" />
      </Scene>
    );
  }
}
