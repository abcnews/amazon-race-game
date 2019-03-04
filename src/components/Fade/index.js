import React, { Component } from 'react';
import styles from './styles.scss';

export default class Fade extends Component {
  render() {
    const { isFadedOut, width, height } = this.props;

    return (
      <>
        <div className={`${styles.hud} ${isFadedOut ? styles.isFadedOut : ''}`} style={{ width, height }} />
        <div className={`${styles.base} ${isFadedOut ? styles.isFadedOut : ''}`} style={{ width, height }} />
      </>
    );
  }
}

Fade.defaultProps = {
  width: window.innerWidth,
  height: window.innerHeight,
  isFadedOut: false
};
