import { Client } from '@abcnews/poll-counters-client';
import React from 'react';
import styles from './styles.scss';

import Story from './Story';

import Fade from '../Fade';
import Knot from '../Knot';
import Scene from '../Scene';
import PickingMiniGame from '../PickingMiniGame';

import CharacterChooserScene from '../Scenes/CharacterChooserScene';
import HomeScene from '../Scenes/HomeScene';
import ChantScene from '../Scenes/ChantScene';
import TitleScene from '../Scenes/TitleScene';
import ThirstyScene from '../Scenes/ThirstyScene';
import LunchScene from '../Scenes/LunchScene';
import TrainingScene from '../Scenes/TrainingScene';
import ScannerScene from '../Scenes/ScannerScene';
import BringItInScene from '../Scenes/BringItInScene';
import NeedsHelpScene from '../Scenes/NeedsHelpScene';
import HomeTimeScene from '../Scenes/HomeTimeScene';
import LockerRoomScene from '../Scenes/LockerRoomScene';
import TrolleyFullScene from '../Scenes/TrolleyFullScene';
import UnionScene from '../Scenes/UnionScene';
import HandCrampScene from '../Scenes/HandCrampScene';
import LunchRushScene from '../Scenes/LunchRushScene';
import EarlyFinishScene from '../Scenes/EarlyFinishScene';
import NoYoutubeScene from '../Scenes/NoYoutubeScene';
import Hud from '../Hud';
import SupervisorScene from '../Scenes/SupervisorScene';
import TrainingTrolleyScene from '../Scenes/TrainingTrolleyScene';
import RunningAroundScene from '../Scenes/RunningAroundScene';
import MainTitleScene from '../Scenes/MainTitleScene';
import AboutOverlayScene from '../Scenes/AboutOverlayScene';

const client = new Client('interactive-amazon-game');

function clamp(value) {
  if (value < 1) return 1;
  if (value > 3) return 3;
  return value;
}

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.start = this.start.bind(this);

    this.onChoose = this.onChoose.bind(this);
    this.getPickingRound = this.getPickingRound.bind(this);
    this.onPickingComplete = this.onPickingComplete.bind(this);
    this.adjustPickRate = this.adjustPickRate.bind(this);
    this.showPickRate = this.showPickRate.bind(this);
    this.hidePickRate = this.hidePickRate.bind(this);
    this.showTimer = this.showTimer.bind(this);
    this.hideTimer = this.hideTimer.bind(this);
    this.onTimer = this.onTimer.bind(this);
    this.rememberLocation = this.rememberLocation.bind(this);

    this.onResize = this.onResize.bind(this);

    this.getScene = this.getScene.bind(this);

    let story = new Story();
    this.previewStory = new Story();

    // DEBUG
    if (document.location.search.indexOf('debug') > -1) {
      window.__DEBUG = true;

      // story.set('character', 'Person3');

      if (document.location.search.indexOf('nopick') > -1) {
        window.__SKIP_PICKING = true;
      }

      if (document.location.search.indexOf('goto') > -1) {
        const goTo = document.location.search.match(/goto\=(.*)$/)[1];
        window.__GOTO = goTo;

        story.goTo(goTo);
        // story.choose(0);

        this.previewStory.goTo(goTo);
        // this.previewStory.choose(0);
      }
    }
    // /DEBUG

    this.state = {
      hasStarted: false,
      story,
      title: '',
      knotIsOpen: false,
      isFadedOut: true,
      pickingRound: 0,
      lastLocation: null,
      isPickRateVisible: false,
      isTimerVisible: false,
      time: '',
      seconds: 0,
      hasCompletedTraining: false,
      isAboutVisible: false
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState(s => ({ isFadedOut: false }));
    }, 200);

    window.addEventListener('resize', this.onResize);
    window.addEventListener('gesturestart', e => e.preventDefault());

    window.addEventListener('keyup', e => {
      if (e.key === 'a') {
        this.setState(s => ({ isAboutVisible: true, knotIsOpen: false }));
      }
    });

    if (window.__GOTO) {
      this.onChoose(0);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }

  onResize() {
    this.forceUpdate();
  }

  start() {
    this.setState(s => ({ isFadedOut: true }));

    setTimeout(() => {
      this.setState(s => ({
        isFadedOut: false,
        hasStarted: true
      }));

      setTimeout(() => {
        this.setState(s => ({ knotIsOpen: true }));
      }, 200);
    }, 600);
  }

  onChoose(index) {
    if (this.state.story.currentOptions[index].text === 'Start again') {
      this.setState(s => ({
        pickingRound: 0,
        isTimerVisible: false,
        isPickRateVisible: false,
        lastLocation: null,
        knotIsOpen: true,
        hasCompletedTraining: false
      }));
    }

    // Any time we have a choice, record it
    if (this.state.story.currentOptions.length > 1) {
      const question = this.state.story.getKnotForChoice(index);
      const answer = this.state.story.currentOptions[index].text;
      client.increment({ question, answer });
    }

    // Hide the knot so we can change the text on it gracefully
    this.setState(s => ({ knotIsOpen: false }));

    // check with the copy of the story to see if we should fade out first
    this.previewStory.choose(index);
    if (this.previewStory.sceneHasChanged) {
      this.setState(s => ({ isFadedOut: true }));
    }

    setTimeout(() => {
      this.state.story.choose(index);
      this.state.story.set('pick_rate', clamp(this.state.story.get('pick_rate')));

      if (this.state.story.sceneHasChanged) {
        if (this.state.story.get('scene') === 'supervisor') {
          this.setState(s => ({ pickRate: s.pickRate > 100 ? 99 : s.pickRate }));
        }

        if (this.state.story.get('scene') === 'training_home_time') {
          this.setState(s => ({ hasCompletedTraining: true }));
        }

        setTimeout(() => {
          this.setState(state => ({ isFadedOut: false }));

          // Forget where we were each day
          if (this.state.story.get('scene') === 'title') {
            this.setState(s => ({ lastLocation: null }));
          }

          // Check if we should be hiding the knot
          if (
            ['title', 'training_warehouse', 'warehouse', 'warehouse_supervisor'].indexOf(
              this.state.story.get('scene')
            ) === -1
          ) {
            setTimeout(() => {
              this.setState(s => ({ knotIsOpen: true }));
            }, 400);
          }
        }, 400);
      } else {
        // Same scene, just reshow the knot
        this.setState(s => ({ knotIsOpen: true }));
      }
    }, 500);
  }

  getPickingRound() {
    const pickingRound = this.state.pickingRound;

    this.setState(s => ({ pickingRound: s.pickingRound + 1 }));

    return pickingRound;
  }

  onPickingComplete() {
    if (this.state.story.get('scene') === 'warehouse_supervisor') {
      this.onChoose(this.state.story.get('pick_rate') === 3 ? 0 : 1);
    } else {
      this.onChoose(0);
    }
  }

  adjustPickRate(n) {
    this.state.story.set('pick_rate', clamp(clamp(this.state.story.get('pick_rate')) + n));
    this.forceUpdate();
  }

  showPickRate() {
    if (!this.state.hasCompletedTraining) return;
    this.setState(s => ({ isPickRateVisible: true }));
  }

  hidePickRate() {
    this.setState(s => ({ isPickRateVisible: false }));
  }

  showTimer() {
    this.setState(s => ({ isTimerVisible: true }));
  }

  hideTimer() {
    this.setState(s => ({ isTimerVisible: false }));
  }

  onTimer(time, seconds) {
    this.setState(s => ({ time, seconds }));
  }

  rememberLocation(location) {
    this.setState(s => ({ lastLocation: location }));
  }

  render() {
    const { scene, text, mainTitle } = this.getScene();

    return (
      <div className={styles.base}>
        {scene}
        <Fade isFadedOut={this.state.isFadedOut} width={window.innerWidth} height={window.innerHeight} />
        <Knot
          className={this.state.story.get('scene') === 'characters' ? styles.instruction : ''}
          text={text}
          story={this.state.story}
          onChoose={this.onChoose}
          isOpen={this.state.knotIsOpen}
          isFact={this.state.story.hasTag('fact')}
          showAbout={e => this.setState(s => ({ isAboutVisible: true, knotIsOpen: false }))}
        />
        {mainTitle}

        {this.state.isAboutVisible && (
          <AboutOverlayScene hideAbout={e => this.setState(s => ({ isAboutVisible: false, knotIsOpen: true }))} />
        )}

        <Hud
          story={this.state.story}
          pickRate={clamp(this.state.story.get('pick_rate'))}
          isPickRateVisible={this.state.isPickRateVisible}
          isTimerVisible={this.state.isTimerVisible}
          time={this.state.time}
          seconds={this.state.seconds}
        />
      </div>
    );
  }

  getScene() {
    let scene;
    let mainTitle;
    let text;

    switch (this.state.story.get('scene')) {
      case 'title':
        scene = (
          <TitleScene
            story={this.state.story}
            title={this.state.title}
            onChoose={this.onChoose}
            showPickRate={this.showPickRate}
          />
        );
        break;

      case 'characters':
        text = 'Pick a character to get started.';
        scene = <CharacterChooserScene story={this.state.story} onChoose={this.onChoose} />;
        break;

      case 'home':
        scene = <HomeScene story={this.state.story} />;
        break;

      case 'training_warehouse':
      case 'warehouse':
      case 'warehouse_supervisor':
        scene = (
          <PickingMiniGame
            isTraining={this.state.story.get('scene') === 'training_warehouse'}
            story={this.state.story}
            getPickingRound={this.getPickingRound}
            lastLocation={this.state.lastLocation}
            rememberLocation={this.rememberLocation}
            adjustPickRate={this.adjustPickRate}
            showPickRate={this.showPickRate}
            isTimerVisible={this.state.isTimerVisible}
            showTimer={this.showTimer}
            hideTimer={this.hideTimer}
            onTimer={this.onTimer}
            onComplete={this.onPickingComplete}
          />
        );
        break;

      case 'warehouse_auto':
        scene = <RunningAroundScene story={this.state.story} />;
        break;

      case 'chant':
        scene = <ChantScene story={this.state.story} onChoose={this.onChoose} />;
        break;

      case 'thirsty':
        scene = <ThirstyScene story={this.state.story} />;
        break;

      case 'breakroom':
      case 'youtube':
        scene = <LunchScene story={this.state.story} client={client} />;
        break;

      case 'training':
        scene = <TrainingScene story={this.state.story} />;
        break;

      case 'scanner_question':
      case 'training_scanner':
        scene = <ScannerScene story={this.state.story} />;
        break;

      case 'training_trolley':
        scene = <TrainingTrolleyScene story={this.state.story} />;
        break;

      case 'bring_it_in':
        scene = <BringItInScene story={this.state.story} />;
        break;

      case 'needs_help':
        scene = <NeedsHelpScene story={this.state.story} />;
        break;

      case 'home_time':
      case 'training_home_time':
        scene = (
          <HomeTimeScene
            story={this.state.story}
            isTired={this.state.story.get('scene') !== 'training_home_time'}
            hidePickRate={this.hidePickRate}
          />
        );
        break;

      case 'locker_room':
        scene = <LockerRoomScene story={this.state.story} />;
        break;

      case 'trolley_full':
        scene = <TrolleyFullScene story={this.state.story} />;
        break;

      case 'union':
        scene = <UnionScene story={this.state.story} />;
        break;

      case 'hand_cramp':
        scene = <HandCrampScene story={this.state.story} />;
        break;

      case 'rush_lunch':
        scene = <LunchRushScene story={this.state.story} />;
        break;

      case 'early_finish':
        scene = <EarlyFinishScene story={this.state.story} hidePickRate={this.hidePickRate} />;
        break;

      case 'no_youtube':
        scene = <NoYoutubeScene story={this.state.story} />;
        break;

      case 'supervisor':
        scene = <SupervisorScene story={this.state.story} />;
        break;

      default:
        console.log('Missing scene:', this.state.story.get('scene'));
        scene = (
          <Scene>
            <div style={{ color: 'white' }}>[placeholder: {this.state.story.get('scene')}]</div>
          </Scene>
        );
    }

    if (!this.state.hasStarted) {
      scene = <RunningAroundScene start={this.start} />;
      mainTitle = <MainTitleScene start={this.start} />;
    }

    return { scene, text, mainTitle };
  }
}
