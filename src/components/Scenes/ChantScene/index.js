import React, { Component } from 'react';
import Scene from '../../Scene';
import assets, { StartingArea, People } from '../../../assets';
import Sprite from '../../Sprite';

export default class ChantScene extends Component {
  componentWillReceiveProps(nextProps) {
    if (!this.timeout) {
      const options = nextProps.story.currentOptions;
      if (options && options.length === 1 && options[0].text === 'NEXT') {
        this.timeout = setTimeout(() => {
          this.props.onChoose(0);
        }, 1400);
      }
    }
  }

  render() {
    const { story } = this.props;

    const character = assets[story.get('character')];

    let chantAnimation;
    let characterAnimation;
    switch (story.get('variant')) {
      case 'stretches':
        chantAnimation = 'loopStretches';
        characterAnimation = 'loopStretches';
        break;

      case 'idle':
        chantAnimation = 'idle';
        characterAnimation = 'idleRight';
        break;

      default:
      case 'chant':
        chantAnimation = 'chant';
        characterAnimation = 'cheer';
        break;
    }

    return (
      <Scene background={StartingArea.src}>
        <Sprite sprite={People} x={182} y={38} animation={`${chantAnimation}3`} />
        <Sprite sprite={People} x={200} y={45} animation={`${chantAnimation}1`} />
        <Sprite sprite={People} x={217} y={47} animation={`${chantAnimation}2`} />

        <Sprite sprite={character} x={156} y={65} animation={characterAnimation} />
        <Sprite sprite={People} x={230} y={66} animation={`${chantAnimation}7`} />

        {story.get('has_jenny') && <Sprite sprite={People} x={180} y={79} animation={`${chantAnimation}4`} />}
        {story.get('has_jenny') && <Sprite sprite={People} x={200} y={81} animation={`${chantAnimation}6`} />}

        {!story.get('has_jenny') && <Sprite sprite={People} x={180} y={79} animation={`${chantAnimation}8`} />}
        {!story.get('has_jenny') && <Sprite sprite={People} x={200} y={81} animation={`${chantAnimation}9`} />}

        <Sprite sprite={People} x={222} y={89} animation={`${chantAnimation}5`} />
      </Scene>
    );
  }
}
