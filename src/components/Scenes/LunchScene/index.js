import React, { Component } from 'react';
import Scene from '../../Scene';
import assets, { Breakroom, LunchPeople, Balloon } from '../../../assets';
import Sprite from '../../Sprite';
import styles from './styles.scss';

export default class LunchScene extends Component {
  render() {
    const { story, client } = this.props;

    const character = assets[story.get('character')];

    let animation = 'idle1';
    let onClick = () => {};
    if (story.get('scene') === 'youtube') {
      animation = 'phone1';
    }
    if (story.get('variant') === 'is_watching') {
      animation = 'phoneShare1';
      if (typeof window.__VIDEO_URL !== 'undefined') {
        onClick = () => {
          client.increment({ question: 'day_2_lunch', answer: 'Watched the actual video' });
          window.open(window.__VIDEO_URL, '_blank');
        };
      }
    }

    return (
      <Scene background={Breakroom.src}>
        <Sprite sprite={character} x={200} y={73} animation="sitting" />
        <Sprite sprite={LunchPeople} x={213} y={73} animation={animation} onClick={onClick} />

        {story.get('variant') === 'is_watching' && (
          <Sprite
            sprite={Balloon}
            x={194}
            y={43}
            animation={'happy' + (story.get('character') === 'Person3' ? '2' : '')}
            className={styles.sine}
          />
        )}
      </Scene>
    );
  }
}
