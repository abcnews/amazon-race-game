import React, { Component } from 'react';
import Scene from '../../Scene';
import Sprite from '../../Sprite';
import assets, { Supervisor, StartingAreaWithoutVests, TrolleyPeople, PersonNeedsHelp } from '../../../assets';

export default class EarlyFinishScene extends Component {
  componentDidMount() {
    this.props.hidePickRate();
  }

  render() {
    const { story } = this.props;

    const character = assets[story.get('character') + 'Trolley'];

    let anim = 'idle';
    let characterAnim = 'idle';

    return (
      <Scene background={StartingAreaWithoutVests}>
        <Sprite sprite={TrolleyPeople} x={160} y={15} animation={`${anim}3`} />
        <Sprite sprite={TrolleyPeople} x={215} y={20} animation={`${anim}1`} />
        <Sprite sprite={TrolleyPeople} x={232} y={11} animation={`${anim}2`} />

        <Sprite sprite={character} x={180} y={20} animation={characterAnim} />
        <Sprite sprite={Supervisor} x={190} y={70} animation="loopClap" />

        <Sprite sprite={PersonNeedsHelp} x={130} y={56} animation="idle" />
        <Sprite sprite={TrolleyPeople} x={142} y={13} animation={`${anim}5`} />
      </Scene>
    );
  }
}
