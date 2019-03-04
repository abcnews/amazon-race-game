import React from 'react';
import styles from './styles.scss';

const noop = () => {};

// This is kinda stored in the Breakroom asset as well?
const WIDTH = 400 * 4;
const HEIGHT = 200 * 4;

function updateScale() {
  Scene.SCALE = window.innerWidth / WIDTH;

  if (window.innerHeight > HEIGHT * Scene.SCALE) {
    Scene.SCALE = window.innerHeight / HEIGHT;
  }

  if (window.innerWidth > WIDTH * Scene.SCALE) {
    Scene.SCALE = (window.innerWidth * Scene.SCALE) / WIDTH;
  }
}

export default class Scene extends React.Component {
  constructor(props) {
    super(props);

    this.onResize = this.onResize.bind(this);
    this.onClick = this.onClick.bind(this);

    this.ignoreDrag = this.ignoreDrag.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.onResize);

    updateScale();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }

  onResize() {
    updateScale();
    this.forceUpdate();
  }

  ignoreDrag(e) {
    e.preventDefault();
    return false;
  }

  onClick(event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    if (this.props.onClick) {
      this.props.onClick(event);
    }
  }

  render() {
    const { background, verticalAlign } = this.props;

    const width = `${window.innerWidth}px`;
    const height = `${window.innerHeight}px`;

    let imageStyle = {
      width: WIDTH + 'px',
      height: HEIGHT + 'px',
      transform: `translate(-50%, -50%) scale(${Scene.SCALE})`
    };
    if (verticalAlign === 'top') {
      imageStyle.transform = `translate(-50%, 0%) scale(${Scene.SCALE})`;
      imageStyle.top = '0';
      imageStyle.transformOrigin = '50% 0';
    }

    const hasTouches = typeof window.ontouchstart !== 'undefined';
    const onClick = hasTouches ? noop : this.onClick;
    const onTouchEnd = hasTouches ? this.onClick : noop;

    return (
      <div
        className={styles.base}
        style={{ width, height }}
        onClick={onClick}
        onTouchEnd={onTouchEnd}
        role={this.props.onClick === null ? 'presentation' : 'button'}
        tabIndex="0">
        <div className={styles.images} style={imageStyle}>
          {background && (
            <img src={typeof background === 'string' ? background : background.src} onDragStart={this.ignoreDrag} />
          )}
          {this.props.children}
        </div>
      </div>
    );
  }
}

Scene.SCALE = 1;

Scene.defaultProps = {
  background: null,
  isFadedOut: false,
  onClick: null
};
