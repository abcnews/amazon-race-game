import React, { Component } from 'react';
import Scene from '../../Scene';
import Sprite from '../../Sprite';
import assets, { WarehouseAside, WarehouseShelf, TrolleyProducts } from '../../../assets';
import styles from './styles.scss';

export default class RunningAroundScene extends Component {
  constructor(props) {
    super(props);

    this.state = {
      animation: 'WalkLeft',
      products: 'Left',
      productFrame: 1 + Math.floor(Math.random() * 5),
      x: 0,
      y: 35
    };
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState(s => {
        let y;
        let productFrame = 1 + Math.floor(Math.random() * 5);

        switch (s.animation) {
          case 'WalkLeft':
            y = Math.random() <= 0.5 ? 35 : 95;
            return { animation: 'WalkRight', x: 0, y, products: 'Right', productFrame };
          case 'WalkRight':
            y = Math.random() <= 0.5 ? 35 : 95;
            return { animation: 'WalkLeft', x: 0, y, products: 'Left', productFrame };
        }
      });
    }, 4300);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { story } = this.props;

    let character;
    if (story) {
      character = assets[story.get('character') + 'TrolleyRun'];
    } else {
      character = assets['Person1TrolleyRun'];
    }

    return (
      <Scene background={WarehouseAside}>
        <Sprite
          sprite={character}
          x={this.state.x}
          y={this.state.y}
          animation={`loop${this.state.animation}`}
          className={styles[this.state.animation]}
        />
        <Sprite
          sprite={TrolleyProducts}
          x={this.state.x}
          y={this.state.y}
          animation={`idle${this.state.products}${this.state.productFrame}`}
          className={styles[this.state.animation]}
        />
        <Sprite sprite={WarehouseShelf} x={0} y={66} />
      </Scene>
    );
  }
}
