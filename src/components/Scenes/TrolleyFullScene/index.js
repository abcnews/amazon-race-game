import React, { Component } from 'react';
import Scene from '../../Scene';
import Sprite from '../../Sprite';
import assets, { WarehouseAside, Supervisor } from '../../../assets';
import styles from './styles.scss';

export default class TrolleyFullScene extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSupervisorWalking: true
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.story.get('variant') === 'overflowing') {
      this.timeout = setTimeout(() => {
        this.setState(s => ({ isSupervisorWalking: false }));
      }, 1800);
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  render() {
    const { story } = this.props;
    const character = assets[story.get('character') + 'Trolley'];

    let showSupervisor = false;
    let animation = 'fullTrolley';
    if (story.get('variant') === 'overflowing') {
      animation = 'overflowingTrolley';
      showSupervisor = true;
    }
    if (story.get('variant') === 'empty') {
      animation = 'emptyTrolley';
    }

    return (
      <Scene background={WarehouseAside}>
        <Sprite sprite={character} x={200} y={20} animation={animation} />
        {showSupervisor && (
          <Sprite
            sprite={Supervisor}
            x={183}
            y={42}
            animation={this.state.isSupervisorWalking ? 'loopWalkUp' : 'idle'}
            className={styles.walkUp}
          />
        )}
      </Scene>
    );
  }
}
