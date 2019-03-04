import React, { Component } from 'react';
import Scene from '../../Scene';
import Sprite from '../../Sprite';
import assets, { Breakroom, UnionPeople, LunchPeople, Balloon } from '../../../assets';
import styles from './styles.scss';

export default class UnionScene extends Component {
  render() {
    const { story } = this.props;

    const character = assets[story.get('character')];

    return (
      <Scene background={Breakroom}>
        <Sprite sprite={UnionPeople} x={166} y={46} animation="idle" />
        <Sprite sprite={character} x={200} y={73} animation="sitting" />

        {window.innerWidth < 500 && (
          <div>
            <Sprite sprite={LunchPeople} x={198} y={152} animation="manager1" />
            <Sprite sprite={LunchPeople} x={212} y={152} animation="manager2" />
          </div>
        )}

        {window.innerWidth >= 500 && (
          <div>
            <Sprite sprite={LunchPeople} x={58} y={73} animation="manager1" />
            <Sprite sprite={LunchPeople} x={81} y={73} animation="manager2" />
          </div>
        )}

        {story.get('variant') === 'spoke_up' && (
          <Sprite
            sprite={Balloon}
            x={194}
            y={44}
            animation={'unhappy' + (story.get('character') === 'Person3' ? '2' : '')}
            className={styles.sine}
          />
        )}
      </Scene>
    );
  }
}
