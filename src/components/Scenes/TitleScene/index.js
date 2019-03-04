import React, { Component } from 'react';
import Scene from '../../Scene';
import styles from './styles.scss';
import assets, { WarehouseEstablishing, Couch, Bird, PersonCouch, Balloon } from '../../../assets';
import Knot from '../../Knot';
import Sprite from '../../Sprite';

const DAYS = ['Training Day', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Monday', 'Tuesday', 'Wednesday'];

export default class TitleScene extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: DAYS[parseInt(props.story.get('day'), 10) - 1],
      knotIsOpen: false,
      birdIsFlying: false
    };
  }

  componentDidMount() {
    if (this.props.story.get('variant') !== 'home') {
      this.props.showPickRate();
    }

    setTimeout(() => {
      this.setState(s => ({ knotIsOpen: true }));
    }, 600);

    setTimeout(() => {
      this.setState(s => ({ birdIsFlying: true }));
    }, 1800);

    setTimeout(() => {
      this.setState(s => ({ knotIsOpen: false }));
    }, 2800);

    setTimeout(() => {
      this.props.onChoose(0);
    }, 3200);
  }

  render() {
    const { story } = this.props;

    const character = assets[story.get('character')];

    return (
      <div>
        <Scene background={story.get('variant') === 'home' ? Couch : WarehouseEstablishing}>
          {this.state.title === 'Tuesday' && (
            <Sprite
              sprite={Bird}
              x={210}
              y={20}
              animation={this.state.birdIsFlying ? 'loopFlying' : 'idle'}
              className={this.state.birdIsFlying ? styles.flying : ''}
            />
          )}

          {story.get('variant') !== 'home' && (
            <Sprite sprite={character} x={195} y={75} animation="loopWalkingUpTiny" className={styles.walkUp} />
          )}

          {story.get('variant') === 'home' && (
            <>
              <Sprite sprite={PersonCouch} x={185} y={78} animation={story.get('character')} />
              <Sprite
                sprite={Balloon}
                x={187}
                y={50}
                animation={'anxious' + (story.get('character') === 'Person3' ? '2' : '')}
                className={styles.sine}
              />
            </>
          )}
        </Scene>
        <Knot text={this.state.title} isTitle story={story} isOpen={this.state.knotIsOpen} />
      </div>
    );
  }
}
