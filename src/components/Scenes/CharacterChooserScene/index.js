import React, { Component } from 'react';
import Sprite from '../../Sprite';
import styles from './styles.scss';
import assets, { AgencyOffice, Balloon } from '../../../assets';
import Scene from '../../Scene';

export default class CharacterChooserScene extends Component {
  constructor(props) {
    super(props);

    this.choose = this.choose.bind(this);

    this.state = {
      chosenIndex: -1
    };
  }

  choose(index) {
    // Stop progressing story on double clicks, etc
    if (this.hasChosen) return;
    this.hasChosen = true;

    this.setState(s => ({ chosenIndex: index }));

    setTimeout(() => {
      this.props.onChoose(index);
    }, 1500);
  }

  render() {
    const { story } = this.props;

    const distanceBetweenCharacters = Math.min(30, (window.innerWidth * 0.3) / 4);

    return (
      <div>
        <Scene background={AgencyOffice.src}>
          {story.currentOptions.map((option, index) => {
            const character = assets[option.text];
            return (
              <div key={option.text} className={styles.character}>
                <Sprite
                  y={90}
                  x={200 - distanceBetweenCharacters + distanceBetweenCharacters * index - character.width / 2}
                  className={styles.sprite}
                  sprite={character}
                  onClick={e => this.choose(index)}
                  animation={this.state.chosenIndex === -1 ? 'loopWaving' : 'idle'}
                />
                <Sprite
                  sprite={Balloon}
                  y={60}
                  x={200 - distanceBetweenCharacters + distanceBetweenCharacters * index - Balloon.width / 2}
                  animation={index === 2 ? 'thumbsUp2' : 'thumbsUp'}
                  className={`${styles.balloon} ${this.state.chosenIndex === index ? styles.chosen : ''}`}
                />
              </div>
            );
          })}
        </Scene>
      </div>
    );
  }
}
