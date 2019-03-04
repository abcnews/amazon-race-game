import React, { Component } from 'react';
import { Scanner, Home } from '../../assets';
import { Keyshape } from 'react-keyshape';
import TapHint from './TapHint.svg';
import KeyHint from './KeyHint.svg';
import styles from './styles.scss';
import Scene from '../Scene';
import Sprite from '../Sprite';
import Knot from '../Knot';

function formatSeconds(seconds) {
  if (seconds < 0) seconds = 0;

  let minutes = Math.floor(seconds / 60);
  seconds -= minutes * 60;

  // zero pad
  minutes = `0${minutes}`.slice(-2);
  seconds = `0${seconds}`.slice(-2);

  return [minutes, seconds].join(':');
}

export default class LookAtScanner extends Component {
  constructor(props) {
    super(props);

    this.onKeyUp = this.onKeyUp.bind(this);
    this.start = this.start.bind(this);

    this.state = {
      isKnotOpen: false,
      flyAway: false,
      scannerTop: '900px',
      showTimer: false,
      showWholeTimer: false
    };
  }

  componentDidMount() {
    window.addEventListener('keyup', this.onKeyUp);

    setTimeout(() => {
      this.setState(s => ({ scannerTop: '0px', isKnotOpen: true }));
    }, 200);

    setTimeout(() => {
      this.setState(s => ({ showTimer: true, showWholeTimer: true }));
    }, 700);
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

      this.start();
    }
  }

  start() {
    this.setState(s => ({ scannerTop: '900px', showTimer: false }));

    if (!this.props.isTimerVisible) {
      this.setState(s => ({ flyAway: true }));
    }

    setTimeout(() => {
      this.props.showTimer();
    }, 300);

    setTimeout(() => {
      this.props.onWin();
    }, 200);
  }

  render() {
    const seconds = this.props.seconds >= 0 ? this.props.seconds : 0;

    // Used for flying the timer to the corner of the screen
    let x = (Math.min(960, window.innerWidth) / 2 - 20) * (1 / Scene.SCALE);
    let y = (window.innerHeight / 2 + 10) * (1 / Scene.SCALE);

    const timerStyle = this.state.flyAway
      ? {
          position: 'absolute',
          transform: `translate(${x}px, -${y}px)`,
          color: 'white',
          fontSize: `${24 * (1 / Scene.SCALE)}px`
        }
      : {};

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
        <Scene background={Home} onClick={this.start} vertialAlign="top">
          <div className={styles.scannerWrapper} style={{ top: this.state.scannerTop }}>
            <Sprite sprite={Scanner} x={200 - Scanner.width / 2} y={20} />
            <div className={styles.labelText}>Pick item</div>
            <div className={styles.mainText}>
              {this.props.count} x {this.props.product.name}
            </div>
          </div>
          <div className={styles.timeText} style={{ visibility: this.state.showWholeTimer ? 'visible' : 'hidden' }}>
            <span style={{ visibility: this.state.showTimer ? 'visible' : 'hidden' }}>Time to pick: </span>
            <div className={styles.timer} style={timerStyle}>
              {formatSeconds(seconds)}
            </div>
          </div>
        </Scene>
        <Knot isOpen={this.state.isKnotOpen} onClick={this.start}>
          <p>
            You have to collect <b>{this.props.count}</b> x <b>{this.props.product.name}</b>. The timer has already
            started.
          </p>
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
