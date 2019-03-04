import React, { Component } from 'react';
import Scene from '../../Scene';
import assets, { Breakroom, Balloon } from '../../../assets';
import Sprite from '../../Sprite';
import styles from './styles.scss';

export default class LunchRushScene extends Component {
  render() {
    const { story } = this.props;

    const character = assets[story.get('character')];

    return (
      <Scene background={Breakroom.src}>
        <Sprite sprite={character} x={200} y={73} animation="sitting" />
        {!story.get('did_exercise') && (
          <Sprite
            sprite={Balloon}
            x={194}
            y={44}
            className={styles.sine}
            animation={`tired${story.get('character') === 'Person3' ? '2' : ''}`}
          />
        )}
      </Scene>
    );
  }
}
