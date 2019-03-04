import React, { Component } from 'react';
import Scene from '../../Scene';
import Sprite from '../../Sprite';
import { Scanner, Home } from '../../../assets';
import styles from './styles.scss';

export default class ScannerScene extends Component {
  render() {
    const { story } = this.props;

    let question;
    if (story.get('variant') === 'helping') {
      question = 'Are you always willing to help your teammates?';
    }
    if (story.get('variant') === 'satisfied') {
      question = "Would you say you're generally satisfied in your job?";
    }

    return (
      <Scene background={Home} verticalAlign="top">
        <Sprite sprite={Scanner} x={200 - Scanner.width / 2} y={20} animation="idle" />
        <div className={styles.mainText}>{question}</div>
      </Scene>
    );
  }
}
