import React from 'react';
import styles from './styles.scss';
import { Parser } from 'html-to-react';
import jennyEmoji from '../../assets/SadJennyEmoji.png';

const parser = new Parser();

function parse(text) {
  if (typeof twemoji === 'undefined') return text;
  return parser.parse(twemoji.parse(text));
}

const noop = () => {};

export default class Knot extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      wasOpen: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isFact) {
      if (this.props.isOpen && nextProps.isOpen === false) {
        this.setState(s => ({ wasOpen: true }));
      }
    } else {
      this.setState({ wasOpen: false });
    }
  }

  render() {
    const { story, text, options, isOpen, children } = this.props;
    let content;
    let body;
    let _options;

    if (children) {
      content = children;
    } else {
      if (text) {
        body = <p className={this.props.isTitle ? styles.title : ''}>{text}</p>;
        if (options) {
          _options = (
            <div className={styles.options}>
              {options.map(option => {
                const hasTouches = typeof window.ontouchstart !== 'undefined';
                const onClick = hasTouches ? noop : e => option.action();
                const onTouchEnd = hasTouches ? e => option.action() : noop;

                return (
                  <button key={option.text} type="button" onClick={onClick} onTouchEnd={onTouchEnd}>
                    {option.text}
                  </button>
                );
              })}
            </div>
          );
        }
      } else {
        // Custom override for Jenny emoji
        if (story.get('scene') === 'locker_room') {
          body = story.currentLines.map(line => (
            <p key={line}>{parser.parse(line.replace(':(', `<img src="${jennyEmoji}" alt="☹️" />`))}</p>
          ));
        } else {
          body = story.currentLines.map(line => <p key={line}>{parse(line)}</p>);
        }

        if (story.hasOptions) {
          _options = (
            <div className={styles.options}>
              {story.currentOptions.map((option, index) => {
                let action = e => this.props.onChoose(index);
                if (story.get('scene') === 'home' && option.text === 'Read the article') {
                  action = e => (document.location.href = window.__ARTICLE_LINK);
                }

                if (story.get('scene') === 'home' && option.text === 'About the game') {
                  action = e => {
                    this.props.showAbout();
                  };
                }

                const hasTouches = typeof window.ontouchstart !== 'undefined';
                const onClick = hasTouches ? noop : action;
                const onTouchEnd = hasTouches ? action : noop;

                return (
                  <button key={option.text} type="button" onClick={onClick} onTouchEnd={onTouchEnd}>
                    {parse(option.text)}
                  </button>
                );
              })}
            </div>
          );
        }
      }

      content = (
        <div>
          <div>{body}</div>
          {_options}
        </div>
      );
    }

    const hasTouches = typeof window.ontouchstart !== 'undefined';
    const onClick = hasTouches ? noop : this.props.onClick;
    const onTouchEnd = hasTouches ? this.props.onClick : noop;

    let openCloseClass;
    if (this.props.isFact) {
      const closeClass = this.state.wasOpen ? styles.closingFact : styles.closedFact;
      openCloseClass = isOpen ? styles.openFact : closeClass;
    } else {
      openCloseClass = isOpen ? styles.open : styles.closed;
    }

    return (
      <div
        className={`${styles.base} ${openCloseClass} ${this.props.onClick ? styles.noSelect : ''} ${
          this.props.className
        }`}
        onClick={onClick}
        onTouchEnd={onTouchEnd}
        style={{ cursor: typeof onClick === 'undefined' ? 'initial' : 'pointer' }}>
        <div className={`${styles.scrim} ${this.props.isFact ? styles.isFact : ''}`}>
          <div className={styles.content}>{content}</div>
        </div>
      </div>
    );
  }
}

Knot.defaultProps = {
  onChoose: () => {}
};
