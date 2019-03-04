import React, { Component } from 'react';
import Scene from '../../Scene';
import Sprite from '../../Sprite';
import assets, { StartingAreaWithoutVests } from '../../../assets';

export default class TrainingTrolleyScene extends Component {
  render() {
    const { story } = this.props;
    const character = assets[story.get('character') + 'Trolley'];

    let characterAnim = 'idle';

    return (
      <Scene background={StartingAreaWithoutVests}>
        <Sprite sprite={character} x={200 - character.width / 2} y={60} animation={characterAnim} />
      </Scene>
    );
  }
}
