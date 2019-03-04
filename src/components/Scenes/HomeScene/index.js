import React, { Component } from 'react';
import Scene from '../../Scene';
import Sprite from '../../Sprite';
import { Home, Phone } from '../../../assets';

export default class HomeScene extends Component {
  render() {
    const { story } = this.props;

    let anim = 'loopIdle';
    switch (story.get('variant')) {
      case 'reply':
        anim = 'loopReply';
        break;
      case 'shift':
        anim = 'loopShift';
        break;
      case 'call':
        anim = 'call';
        break;
      case 'babysit':
        anim = 'loopNephews' + (story.get('character') === 'Person3' ? '2' : '');
        break;
      case 'angry_sister':
        anim = 'angrySister';
        break;
      case 'news_alert':
        anim = 'newsAlert';
        break;
    }

    return (
      <Scene background={Home.src} verticalAlign="top">
        <Sprite sprite={Phone} x={200 - Phone.width / 2} y={20} animation={anim} />
      </Scene>
    );
  }
}
