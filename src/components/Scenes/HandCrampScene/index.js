import React, { Component } from 'react';
import Scene from '../../Scene';
import Sprite from '../../Sprite';
import assets, { WarehouseAside, Balloon } from '../../../assets';
import styles from './styles.scss';

export default class HandCrampScene extends Component {
  render() {
    const { story } = this.props;

    const character = assets[story.get('character') + 'Trolley'];

    let animation = 'handCramp';
    let emotion = 'sad' + (story.get('character') === 'Person3' ? '2' : '');
    if (story.get('did_exercise')) {
      animation = 'loopHandExercise';
      emotion = 'happy' + (story.get('character') === 'Person3' ? '2' : '');
    }

    return (
      <Scene background={WarehouseAside}>
        <Sprite sprite={character} x={190} y={50} animation={animation} />
        <Sprite sprite={Balloon} x={189} y={23} animation={emotion} className={styles.sine} />
      </Scene>
    );
  }
}
