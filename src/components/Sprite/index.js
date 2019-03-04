import React from 'react';
import styles from './styles.scss';

const noop = () => {};

const FACTOR = 4;

export default class Sprite extends React.Component {
  constructor(props) {
    super(props);

    this.ignoreDrag = this.ignoreDrag.bind(this);
    this.setFrame = this.setFrame.bind(this);
    this.draw = this.draw.bind(this);

    this.image = document.createElement('img');
    this.image.onload = e => {
      this.hasLoaded = true;
      this.setFrame(0);
    };
    this.image.src = props.sprite.src;

    this.animations = props.sprite.animations || { idle: [0] };
  }

  componentDidMount() {
    this.animationInterval = setInterval(() => {
      const { sprite, animation } = this.props;

      if (sprite == null || !this.animations[animation]) {
        return this.setFrame(0);
      }

      // Play once
      if (animation.indexOf('loop') === -1 && this.frame === this.animations[animation].length - 1) {
        return this.draw();
      }

      // Loop
      this.setFrame((this.frame + 1) % this.animations[animation].length);
    }, 16 * 6); // 6 fps
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.animation !== nextProps.animation) {
      this.setFrame(0);
    }
  }

  componentWillUnmount() {
    clearInterval(this.animationInterval);
    this.animationInterval = null;
  }

  setFrame(frame) {
    this.frame = frame;
    this.draw();
  }

  ignoreDrag(e) {
    e.preventDefault();
    return false;
  }

  draw() {
    if (!this.canvas) return;
    if (!this.hasLoaded) return;

    const { sprite, animation } = this.props;

    const ctx = this.canvas.getContext('2d');

    if (!this.animations[animation]) console.log(`${sprite.src}: ${animation} is not an animation`);

    const width = sprite.width * FACTOR;
    const height = sprite.height * FACTOR;
    const frameOffset = this.animations[animation][this.frame] * width;

    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(this.image, frameOffset, 0, width, height, 0, 0, width, height);
  }

  render() {
    const { className, sprite, x, y } = this.props;

    if (!sprite) return null;

    const width = sprite.width * FACTOR + 'px';
    const height = sprite.height * FACTOR + 'px';

    const hasTouches = typeof window.ontouchstart !== 'undefined';
    const onClick = hasTouches ? noop : this.props.onClick;
    const onTouchEnd = hasTouches ? this.props.onClick : noop;

    return (
      <div
        className={`${styles.base} ${className}`}
        style={{ width, height, top: `${y * FACTOR}px`, left: `${x * FACTOR}px` }}
        onClick={onClick}
        onTouchEnd={onTouchEnd}
        role={this.props.onClick === null ? 'presentation' : 'button'}
        tabIndex="0">
        <canvas ref={el => (this.canvas = el)} width={sprite.width * FACTOR} height={sprite.height * FACTOR} />
      </div>
    );
  }
}

Sprite.defaultProps = {
  className: null,
  onClick: null,
  animation: 'idle',
  sprite: null,
  x: 0,
  y: 0
};
