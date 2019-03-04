import React, { Component } from 'react';
import styles from './styles.scss';

export default class AboutOverlayScene extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 'about'
    };
  }

  componentDidMount() {
    if (this.about) {
      window.__ABOUT.forEach(node => {
        this.about.appendChild(node);
      });
    }
  }

  componentWillUnmount() {
    if (this.about) {
      window.__ABOUT.forEach(node => {
        this.about.removeChild(node);
      });
    }
  }

  nextPage(e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (this.state.page === 'title') {
      this.setState(s => ({ page: '' }));
      setTimeout(() => {
        this.setState(s => ({ page: 'disclaimer' }));
      }, 300);
    } else if (this.state.page === 'disclaimer') {
      this.setState(s => ({ page: '' }));
      setTimeout(() => {
        this.props.start();
      }, 300);
    } else if (this.state.page === 'about') {
      this.setState(s => ({ page: '' }));
      setTimeout(() => {
        this.setState(s => ({ page: 'title' }));
      }, 300);
    }
  }

  showAbout() {
    this.setState(s => ({ page: '' }));
    setTimeout(() => {
      this.setState(s => ({ page: 'about' }));
    }, 300);
  }

  render() {
    const activePageStyle = {
      transform: `translate(-50%, -50%)`,
      opacity: 1
    };

    return (
      <div>
        <div
          className={`${styles.details} ${this.state.page !== 'title' ? styles.notTitle : ''}`}
          onClick={this.props.hideAbout}>
          <div
            className={styles.page}
            style={this.state.page === 'about' ? activePageStyle : {}}
            aria-hidden={this.state.page !== 'about'}>
            <div className={`${styles.text} ${styles.canScroll}`} ref={el => (this.about = el)} />
            <div className={styles.start}>
              <button tabIndex="0">Back</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
