import React, { Component } from 'react';
import Scene from '../../Scene';
import assets, { StartingArea, People, PeopleTraining } from '../../../assets';
import Sprite from '../../Sprite';

export default class TrainingScene extends Component {
  render() {
    const { story } = this.props;

    const character = assets[story.get('character')];

    return (
      <Scene background={StartingArea.src}>
        <Sprite sprite={People} x={190} y={34} animation="loopTrainer" />
        <Sprite sprite={PeopleTraining} x={160} y={65} animation="idle1" />
        <Sprite sprite={character} x={178} y={68} animation="idleUp" />
        <Sprite sprite={PeopleTraining} x={173} y={85} animation="idle6" />
        <Sprite sprite={PeopleTraining} x={195} y={74} animation="idle4" />
        <Sprite sprite={PeopleTraining} x={210} y={67} animation="idle3" />
        <Sprite sprite={PeopleTraining} x={155} y={87} animation="idle5" />
        <Sprite sprite={PeopleTraining} x={190} y={93} animation="idle2" />
        <Sprite sprite={PeopleTraining} x={214} y={87} animation="idle7" />
      </Scene>
    );
  }
}
