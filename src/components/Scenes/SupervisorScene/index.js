import React, { Component } from 'react';
import Scene from '../../Scene';
import Sprite from '../../Sprite';
import assets, { WarehouseAside, Supervisor, Balloon } from '../../../assets';
import styles from './styles.scss';

export default class SupervisorScene extends Component {
  render() {
    const { story } = this.props;
    const character = assets[story.get('character') + 'Trolley'];

    return (
      <Scene background={WarehouseAside}>
        <Sprite sprite={character} x={200} y={40} animation="idle" />
        <Sprite sprite={Supervisor} x={183} y={52} animation="idle" />
        <Sprite
          sprite={Balloon}
          x={199}
          y={15}
          animation={'anxious' + (story.get('character') === 'Person3' ? '2' : '')}
          className={styles.sine}
        />
      </Scene>
    );
  }
}
