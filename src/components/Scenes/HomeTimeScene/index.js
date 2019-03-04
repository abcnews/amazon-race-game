import React, { Component } from 'react';
import Scene from '../../Scene';
import Sprite from '../../Sprite';
import assets, { WarehouseEstablishing, Balloon } from '../../../assets';
import styles from './styles.scss';

export default class HomeTimeScene extends Component {
  componentDidMount() {
    this.props.hidePickRate();
  }

  render() {
    const { story, isTired } = this.props;

    const character = assets[story.get('character')];
    const animation = (isTired ? 'tired' : 'happy') + (story.get('character') === 'Person3' ? '2' : '');

    return (
      <Scene background={WarehouseEstablishing}>
        <Sprite sprite={character} x={195} y={80} animation="loopWalkingDownTiny" className={styles.walkDown} />
        <Sprite sprite={Balloon} x={189} y={58} animation={animation} className={styles.walkDown} />
      </Scene>
    );
  }
}
