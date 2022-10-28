import React, { Component } from 'react';
import Keyshape from 'react-keyshape/dist/Keyshape';

import { Home } from '../../assets';
import MAP_IMAGE_SRC from '../../assets/Map.png';
import PICK_IMAGE_SRC from '../../assets/PickIsHere.png';
import YOU_IMAGE_SRC from '../../assets/You.png';

import Knot from '../Knot';
import Scene from '../Scene';

import KeyHint from './KeyHint.svg';
import TapHint from './TapHint.svg';
import styles from './styles.scss';


const noop = () => {};

export default class Warehouse extends Component {
  constructor(props) {
    super(props);

    this.onKeyUp = this.onKeyUp.bind(this);
    this.step = this.step.bind(this);

    this.drawMap = this.drawMap.bind(this);

    this.state = {
      steps: 0,
      capTap: false,
      mapTop: '-800px',
      isKnotOpen: false
    };

    this.mapImage = document.createElement('img');
    this.mapImage.onload = e => (this.hasMapLoaded = true);
    this.mapImage.src = MAP_IMAGE_SRC;

    this.youImage = document.createElement('img');
    this.youImage.src = YOU_IMAGE_SRC;

    this.pickImage = document.createElement('img');
    this.pickImage.src = PICK_IMAGE_SRC;
  }

  componentDidMount() {
    window.addEventListener('keyup', this.onKeyUp);

    setTimeout(() => {
      this.setState(s => ({ mapTop: '100px', canTap: true, isKnotOpen: true }));
    }, 100);

    // Prepare the walk path
    const WALKWAY_LINE = 25 * 4 + 1;
    this.ctx = this.canvas.getContext('2d');
    this.path = [];

    if (this.props.startLocation) {
      this.startPoint = this.props.startLocation;
    } else {
      this.startPoint = { x: 51 * 4, y: 92 * 4 };
    }

    let x = this.props.aisleSide === 'left' ? Math.floor(10 + Math.random() * 6) : Math.floor(32 + Math.random() * 12);
    let y = 7 + this.props.aisle * 3 - 1;

    this.endPoint = {
      x: x * 4,
      y: y * 4
    };

    if (Math.abs(WALKWAY_LINE - this.endPoint.x) < 20) {
      this.endPoint.x = WALKWAY_LINE - 10;
    }

    const step = 5;
    this.path.push(this.startPoint);
    x = this.startPoint.x;
    y = this.startPoint.y;

    // Move across to the line
    let failsafe = 0;
    if (x < WALKWAY_LINE) {
      while (x < WALKWAY_LINE - step && failsafe++ < 1000) {
        x += step;
        this.path.push({ x, y });
      }
    } else {
      while (x > WALKWAY_LINE + step && failsafe++ < 1000) {
        x -= step;
        this.path.push({ x, y });
      }
    }
    // Make sure we are in the walkway
    x = WALKWAY_LINE;
    this.path.push({ x, y });

    // Move up or down to the next horizontal line
    failsafe = 0;
    if (y < this.endPoint.y) {
      while (y < this.endPoint.y && failsafe++ < 1000) {
        y += step;
        this.path.push({ x, y });
      }
    } else {
      while (y > this.endPoint.y && failsafe++ < 1000) {
        y -= step;
        this.path.push({ x, y });
      }
    }

    // Move left to the row
    failsafe = 0;
    if (x > this.endPoint.x) {
      while (x > this.endPoint.x && failsafe++ < 1000) {
        x -= step;
        this.path.push({ x, y });
      }
    } else {
      while (x < this.endPoint.x && failsafe++ < 1000) {
        x += step;
        this.path.push({ x, y });
      }
    }

    this.clamp = value => {
      if (value > this.path.length) return this.path.length;
      return value;
    };

    this.drawMap();
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.onKeyUp);
  }

  onKeyUp(event) {
    let foot = null;

    if (event.code === 'ArrowLeft' || event.key === 'ArrowLeft') foot = 'left';
    if (event.code === 'ArrowRight' || event.key === 'ArrowRight') foot = 'right';

    if (foot) {
      event.preventDefault();
      event.stopPropagation();

      this.step(event);
    }
  }

  step(event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    if (!this.state.canTap) return;

    const eachStep = this.props.story.get('day') <= 2 ? 2 : 1;

    this.setState(
      s => ({
        steps: this.clamp(s.steps + eachStep)
      }),
      () => {
        if (this.state.steps === this.path.length) {
          this.props.rememberLocation(this.endPoint);

          this.setState(s => ({ canTap: false, mapTop: '900px', isKnotOpen: false }));
          setTimeout(() => this.props.onWin(), 600);
        } else {
          this.drawMap();
        }
      }
    );
  }

  drawMap() {
    if (!this.hasMapLoaded) {
      setTimeout(this.drawMap, 50);
      return;
    }

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.drawImage(this.mapImage, 0, 0);

    // Draw path
    this.ctx.strokeStyle = '#444';
    this.ctx.setLineDash([6, 4]);
    this.ctx.lineWidth = 4;
    this.ctx.beginPath();
    this.ctx.moveTo(this.startPoint.x, this.startPoint.y);
    for (let i = 1; i < this.path.length; i++) {
      this.ctx.lineTo(this.path[i].x, this.path[i].y);
    }
    this.ctx.stroke();

    this.ctx.fillStyle = '#444';
    this.ctx.beginPath();
    this.ctx.arc(this.path[this.path.length - 1].x, this.path[this.path.length - 1].y, 5, 0, 2 * Math.PI, false);
    this.ctx.fill();

    // Draw where you've been
    this.ctx.strokeStyle = '#f00';
    this.ctx.setLineDash([6, 4]);
    this.ctx.lineWidth = 4;
    this.ctx.beginPath();
    this.ctx.moveTo(this.startPoint.x, this.startPoint.y);
    for (let i = 1; i < this.state.steps; i++) {
      this.ctx.lineTo(this.path[i].x, this.path[i].y);
    }
    this.ctx.stroke();

    this.ctx.fillStyle = '#f00';
    this.ctx.beginPath();
    this.ctx.arc(this.path[this.state.steps].x, this.path[this.state.steps].y, 5, 0, 2 * Math.PI, false);
    this.ctx.fill();

    // 15 = half the width of the pin,
    // 40 is the height (5 for a bit of padding against the circle)
    this.ctx.drawImage(
      this.pickImage,
      this.path[this.path.length - 1].x - 22,
      this.path[this.path.length - 1].y - 60 - 5
    );
    this.ctx.drawImage(this.youImage, this.path[this.state.steps].x - 22, this.path[this.state.steps].y - 60 - 5);
  }

  render() {
    let hint;
    if (window.innerWidth < 440) {
      hint = (
        <div style={{ width: '100px', height: '125px', margin: 'auto', marginTop: '-35px', pointerEvents: 'none' }}>
          <Keyshape svg={TapHint} />
        </div>
      );
    } else {
      hint = (
        <div style={{ width: '300px', height: '80px', margin: 'auto', marginTop: '-15px', pointerEvents: 'none' }}>
          <Keyshape svg={KeyHint} />
        </div>
      );
    }

    return (
      <div>
        <Scene background={Home} onClick={this.step} vertialAlign="top">
          <canvas
            ref={el => (this.canvas = el)}
            width="300"
            height="440"
            className={styles.map}
            style={{ top: this.state.mapTop }}
          />
        </Scene>
        <Knot isOpen={this.state.isKnotOpen} onClick={e => this.step()}>
          {window.innerWidth < 500 && <p className={styles.knotContent}>Tap to move around the warehouse.</p>}
          {window.innerWidth >= 500 && (
            <p className={styles.knotContent}>Click mouse or press Left/Right to move around the warehouse.</p>
          )}
          {hint}
        </Knot>
      </div>
    );
  }
}

Warehouse.defaultProps = {
  onChangeKnot: () => {},
  onWin: () => {},
  rememberLocation: () => {},
  width: window.innerWidth,
  height: window.innerHeight
};
