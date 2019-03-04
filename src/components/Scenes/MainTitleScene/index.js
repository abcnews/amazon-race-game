import React, { Component } from 'react';
import styles from './styles.scss';
import titleImg from '../../../assets/Title.png';

export default class MainTitleScene extends Component {
  constructor(props) {
    super(props);

    this.nextPage = this.nextPage.bind(this);
    this.showAbout = this.showAbout.bind(this);

    this.state = {
      page: ''
    };
  }

  componentDidMount() {
    if (this.about) {
      window.__ABOUT.forEach(node => {
        this.about.appendChild(node);
      });
    }

    setTimeout(() => {
      this.setState(s => ({ page: 'title' }));
    }, 500);
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

      const node = (function traverse(node) {
        if (node == null) {
          return;
        }

        if (node.localName !== 'a' || node.href === undefined) {
          return traverse(node.parentNode);
        }

        return node;
      })(e.target);

      if (node != null) {
        return (window.location = node.href);
      }
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
      opacity: 1,
      zIndex: 100
    };

    return (
      <div>
        <div
          className={`${styles.details} ${this.state.page !== 'title' ? styles.notTitle : ''}`}
          onClick={this.nextPage}
        >
          <div className={styles.page} style={this.state.page === 'title' ? activePageStyle : {}}>
            <div className={styles.title}>
              <img src={titleImg} alt="Add to Cart" />
            </div>

            <div className={`${styles.text} ${styles.subtitle}`}>
              <p>A news game about what it’s like to work in an Amazon warehouse</p>
            </div>

            <div className={styles.team}>
              <a href="https://www.abc.net.au/news/interactives/" onClick={e => e.stopPropagation()}>
                by ABC News Story Lab
              </a>
            </div>

            <div className={styles.start}>
              <button tabIndex="0">Let's go</button>
            </div>
          </div>

          <div
            className={styles.page}
            style={this.state.page === 'disclaimer' ? activePageStyle : {}}
            aria-hidden={this.state.page !== 'disclaimer'}
          >
            <div className={styles.text}>
              <p>
                This ABC News game tells the story of what it's like to work in Amazon's Melbourne warehouse. It's based
                on interviews with eight current and former workers.
              </p>
              <p>For the purposes of the game, the workers' real-life experiences have been condensed into one week.</p>
            </div>
            <div className={styles.start}>
              <button tabIndex="0">Got it</button>
            </div>
          </div>

          <div
            className={styles.page}
            style={this.state.page === 'about' ? activePageStyle : {}}
            aria-hidden={this.state.page !== 'about'}
          >
            <div className={`${styles.text} ${styles.canScroll}`} ref={el => (this.about = el)} />
            <div className={styles.start}>
              <button tabIndex="0">Back</button>
            </div>
          </div>
        </div>
        {window.__PUBLISHED_AT && (
          <div className={styles.meta}>
            <div>{window.__PUBLISHED_AT}</div>
          </div>
        )}
        <div className={styles.about} onClick={this.showAbout}>
          About
        </div>
      </div>
    );
  }
}

MainTitleScene.defaultProps = {
  start: () => {}
};
