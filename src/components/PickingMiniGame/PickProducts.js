import React, { Component } from 'react';
import Scene from '../Scene';
import Sprite from '../Sprite';
import Knot from '../Knot';
import styles from './styles.scss';
import { Home, Disappear } from '../../assets';

function shuffle(array) {
  let clone = array.slice();
  let arr = [];
  while (clone.length > 0) {
    arr = arr.concat(clone.splice(Math.floor(Math.random() * clone.length), 1));
  }

  return arr;
}

export default class PickProducts extends Component {
  constructor(props) {
    super(props);

    this.pick = this.pick.bind(this);
    this.canPick = true;

    this.state = {
      products: shuffle(props.products),
      isKnotOpen: false,
      count: props.count,
      scale: 1,
      jiggle: false
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.count !== this.state.count) return true;
    if (nextState.jiggle !== this.state.jiggle) return true;
    if (nextState.isKnotOpen !== this.state.isKnotOpen) return true;

    return false;
  }

  componentDidMount() {
    this.props.onChangeKnot({ isOpen: false });

    setTimeout(() => {
      this.setState(s => ({ isKnotOpen: true }));
    }, 200);
  }

  pick(p, event) {
    if (p.hasBeenPicked) return;
    if (!this.canPick) return;

    if (p.product.name === this.props.product.name) {
      this.canPick = false;
      p.hasBeenPicked = true;

      if (this.state.count === 1) {
        // Complete!
        this.setState(s => ({ isKnotOpen: false }));
        this.props.onPickedProduct();

        setTimeout(() => {
          this.props.onWin();
        }, 800);
      } else {
        // More to pick
        this.setState(
          s => ({ count: s.count - 1 }),
          () => {
            this.canPick = true;
          }
        );
      }
    } else {
      // Jiggle the correct product
      this.setState(s => ({ jiggle: true }));
      setTimeout(() => {
        this.canPick = true;
        this.setState(s => ({ jiggle: false }));
      }, 600);
    }
  }

  render() {
    const effectiveWidth = (Math.min(700, window.innerWidth) / 4) * (1 / Scene.SCALE) - 10;
    const effectiveLeft = 200 - effectiveWidth / 2;

    const effectiveHeight = (window.innerHeight / 4) * (1 / Scene.SCALE) - 40;
    const effectiveTop = 100 - effectiveHeight / 2;

    const positions = [
      { x: effectiveLeft + effectiveWidth * 0.25, y: effectiveTop + effectiveHeight * 0.2 },
      { x: effectiveLeft + effectiveWidth * 0.75, y: effectiveTop + effectiveHeight * 0.2 },
      { x: effectiveLeft + effectiveWidth * 0.25, y: effectiveTop + effectiveHeight * 0.65 },
      { x: effectiveLeft + effectiveWidth * 0.75, y: effectiveTop + effectiveHeight * 0.65 }
    ];

    return (
      <div>
        <Scene background={Home} verticalAlign="top">
          {this.state.products.map((p, index) => {
            const sprite = p.hasBeenPicked ? Disappear : p.product;

            return (
              <Sprite
                key={(p.hasBeenPicked ? 'picked' : p.product.name) + index}
                className={`${styles.product} ${
                  p.product == this.props.product && this.state.jiggle ? styles.jiggle : ''
                }`}
                sprite={sprite}
                x={positions[index].x - sprite.width / 2}
                y={positions[index].y - sprite.height / 2}
                onClick={e => (p.hasBeenPicked ? null : this.pick(p, e))}
                animation={'idle'}
              />
            );
          })}
        </Scene>
        <Knot isOpen={this.state.isKnotOpen}>
          <p>
            You have to collect <b>{this.props.count}</b> x <b>{this.props.product.name}</b>.
          </p>
          {window.innerWidth < 500 && <p style={{ fontWeight: 'bolder' }}>Tap the product.</p>}
          {window.innerWidth >= 500 && <p style={{ fontWeight: 'bolder' }}>Click the product.</p>}
        </Knot>
      </div>
    );
  }
}

PickProducts.defaultProps = {
  width: window.innerWidth,
  height: window.innerHeight,
  onChangeKnot: () => {},
  onWin: () => {}
};
