import React, { Component } from 'react';
import Scene from '../../Scene';
import Sprite from '../../Sprite';
import assets, { WarehouseAside, PersonNeedsHelp, Balloon } from '../../../assets';
import styles from './styles.scss';

export default class NeedsHelpScene extends Component {
  render() {
    const { story } = this.props;
    const character = assets[story.get('character') + 'Trolley'];

    let balloon;
    if (story.get('variant') === 'helped') {
      balloon = 'angel' + (story.get('character') === 'Person3' ? '2' : '');
    }
    if (story.get('variant') === 'no_help') {
      balloon = 'sad' + (story.get('character') === 'Person3' ? '2' : '');
    }

    return (
      <Scene background={WarehouseAside}>
        <Sprite sprite={character} x={205} y={53} animation="lookLeft" />
        <Sprite sprite={PersonNeedsHelp} x={165} y={60} />
        {balloon && <Sprite sprite={Balloon} x={205} y={30} animation={balloon} className={styles.sine} />}
      </Scene>
    );
  }
}
