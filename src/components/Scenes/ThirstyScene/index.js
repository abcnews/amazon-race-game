import React, { Component } from 'react';
import Scene from '../../Scene';
import assets, { WarehouseAside, Balloon } from '../../../assets';
import Sprite from '../../Sprite';
import styles from './styles.scss';

export default class ThirstyScene extends Component {
  render() {
    const { story } = this.props;

    const characterTrolley = assets[story.get('character') + 'Trolley'];

    const animationVersion = story.get('character') === 'Person3' ? '2' : '';

    return (
      <Scene background={WarehouseAside.src}>
        <Sprite
          sprite={characterTrolley}
          x={193}
          y={58}
          animation={story.get('variant') === 'drinking' ? 'drinking' : 'loopThirsty'}
        />
        <Sprite
          sprite={Balloon}
          x={192}
          y={32}
          animation={story.get('variant') === 'drinking' ? 'toilet' + animationVersion : 'thirsty'}
          className={styles.sine}
        />
      </Scene>
    );
  }
}
