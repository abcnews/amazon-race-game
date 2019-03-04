import React, { Component } from 'react';
import Scene from '../../Scene';
import assets, { WarehouseAside } from '../../../assets';
import Sprite from '../../Sprite';

export default class NoYoutubeScene extends Component {
  render() {
    const { story } = this.props;

    const characterTrolley = assets[story.get('character') + 'Trolley'];

    return (
      <Scene background={WarehouseAside.src}>
        <Sprite sprite={characterTrolley} x={183} y={30} animation="idle" />
      </Scene>
    );
  }
}
