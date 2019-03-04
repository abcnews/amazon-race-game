import React, { Component } from 'react';
import Sprite from '../../Sprite';
import Scene from '../../Scene';
import assets, { StartingArea, People } from '../../../assets';

export default class BringItInScene extends Component {
  render() {
    const { story } = this.props;

    const character = assets[story.get('character')];

    return (
      <Scene background={StartingArea}>
        <Sprite sprite={People} x={190} y={45} animation="idleDown7" />
        <Sprite sprite={character} x={180} y={60} animation="idleUp" />
      </Scene>
    );
  }
}
