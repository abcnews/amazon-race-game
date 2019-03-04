import React, { Component } from 'react';
import Scanner from './LookAtScanner';
import PickProducts from './PickProducts';
import Warehouse from './WarehouseMap';
import Knot from '../Knot';
import styles from './styles.scss';
import { Products } from '../../assets';

function formatSeconds(seconds) {
  if (seconds < 0) seconds = 0;

  let minutes = Math.floor(seconds / 60);
  seconds -= minutes * 60;

  // zero pad
  minutes = `0${minutes}`.slice(-2);
  seconds = `0${seconds}`.slice(-2);

  return [minutes, seconds].join(':');
}

const pickings = [
  // Training
  // 0
  {
    products: [
      Products.Small.Chicken,
      Products.Small.Flamingo,
      Products.Small.DreamCamper,
      Products.Small.SwissArmyKnife
    ],
    product: Products.Small.DreamCamper,
    aisle: 27,
    aisleSide: 'left',
    seconds: 35,
    count: 1
  },
  // DAY 1
  // 1
  {
    products: [
      Products.Small.Headphones,
      Products.Small.Flamingo,
      Products.Small.SmartWatch,
      Products.Small.SwissArmyKnife
    ],
    product: Products.Small.SmartWatch,
    aisle: 27,
    aisleSide: 'left',
    seconds: 22,
    count: 1
  },
  // 2
  {
    products: [
      Products.Small.ToiletPaper,
      Products.Small.HogwartsHat,
      Products.Small.HarryPotter,
      Products.Small.Chicken
    ],
    product: Products.Small.HogwartsHat,
    aisle: 24,
    aisleSide: 'right',
    seconds: 25,
    count: 1
  },
  // 3
  {
    products: [Products.Small.OneClick, Products.Small.SubtleArt, Products.Small.Monopoly, Products.Small.OneClick],
    product: Products.Small.OneClick,
    aisle: 20,
    aisleSide: 'left',
    seconds: 12,
    count: 1
  },
  // Day 2
  // 4
  {
    products: [
      Products.Small.HighNeckCrop,
      Products.Small.StrappySportsBra,
      Products.Small.NikeShirt,
      Products.Small.Puppy
    ],
    product: Products.Small.HighNeckCrop,
    aisle: 25,
    aisleSide: 'left',
    seconds: 11,
    count: 1
  },
  // 5
  {
    products: [
      Products.Small.Headphones,
      Products.Small.HeadphonesWired,
      Products.Small.HeadphonesWired,
      Products.Small.Headphones
    ],
    product: Products.Small.Headphones,
    aisle: 22,
    aisleSide: 'right',
    seconds: 9,
    count: 1
  },
  // 6
  {
    products: [
      Products.Small.StormTrooper,
      Products.Small.StormTrooperXL,
      Products.Small.StormTrooper,
      Products.Small.StormTrooperXL
    ],
    product: Products.Small.StormTrooperXL,
    aisle: 14,
    aisleSide: 'left',
    seconds: 12,
    count: 1
  },
  // Day 4
  // 7
  {
    products: [Products.Heavy.Television, Products.Heavy.Television, Products.Heavy.CubbyHouse, Products.Heavy.Bench],
    product: Products.Heavy.Television,
    aisle: 25,
    aisleSide: 'left',
    seconds: 20,
    count: 1
  },
  // 8
  {
    products: [Products.Heavy.EspressoMachine, Products.Heavy.Bench, Products.Heavy.Cot, Products.Heavy.Cookware],
    product: Products.Heavy.Cookware,
    aisle: 22,
    aisleSide: 'right',
    seconds: 9,
    count: 1
  }
];

function getPick(round) {
  const i = round % pickings.length;
  const picking = {
    products: pickings[i].products.map(p => ({ product: p })),
    product: pickings[i].product,
    count: pickings[i].count,
    aisle: pickings[i].aisle,
    aisleSide: pickings[i].aisleSide,
    seconds: pickings[i].seconds
  };

  return picking;
}

export default class PickingMiniGame extends Component {
  constructor(props) {
    super(props);

    this.onCloseScanner = this.onCloseScanner.bind(this);
    this.onWalkComplete = this.onWalkComplete.bind(this);
    this.onPickedProduct = this.onPickedProduct.bind(this);
    this.onPickComplete = this.onPickComplete.bind(this);
    this.onChangeKnot = this.onChangeKnot.bind(this);

    this.rememberLocation = this.rememberLocation.bind(this);

    const { products, product, count, aisle, aisleSide, seconds } = getPick(props.getPickingRound());

    this.state = {
      products,
      product,
      count,
      aisle,
      aisleSide,
      seconds,
      text: ' ',
      options: null,
      isOpen: false,
      mode: 'scanner',
      roundsRemaining: Math.min(2, parseInt(props.story.get('rounds'), 10) - 1)
    };
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState(
        s => ({ seconds: s.seconds - 1 }),
        () => {
          this.props.onTimer(formatSeconds(this.state.seconds), this.state.seconds);
        }
      );
    }, 1000);

    if (!this.props.isTraining) {
      this.props.showPickRate();
    }

    // DEBUG
    if (window.__SKIP_PICKING) {
      this.props.onComplete();
    }
    // /DEBUG
  }

  componentWillUnmount() {
    this.props.hideTimer();

    clearInterval(this.interval);
    this.interval = null;
  }

  onCloseScanner() {
    this.setState(s => ({ mode: 'warehouse', options: null }));
  }

  onWalkComplete() {
    this.setState(s => ({ mode: 'pick', isOpen: false }));
  }

  onPickedProduct() {
    if (this.state.seconds > 0) {
      this.props.adjustPickRate(1);
    } else {
      this.props.adjustPickRate(-1);
    }

    if (this.state.roundsRemaining === 0) {
      this.props.hideTimer();
    }
  }

  onPickComplete() {
    if (this.state.roundsRemaining === 0) {
      this.props.onComplete();
    } else {
      this.setState(
        state => {
          const { products, product, count, aisle, aisleSide, seconds } = getPick(this.props.getPickingRound());

          return {
            products,
            product,
            count,
            aisle,
            aisleSide,
            seconds,
            mode: 'scanner',
            roundsRemaining: state.roundsRemaining - 1
          };
        },
        () => {
          this.props.onTimer(formatSeconds(this.state.seconds), this.state.seconds);
        }
      );
    }
  }

  onChangeKnot(newState) {
    this.setState(s => newState);
  }

  rememberLocation(lastLocation) {
    this.props.rememberLocation(lastLocation);
  }

  render() {
    const { story } = this.props;

    let phase;
    if (this.state.mode === 'scanner') {
      phase = (
        <Scanner
          story={story}
          count={this.state.count}
          product={this.state.product}
          seconds={this.state.seconds}
          onChangeKnot={this.onChangeKnot}
          onWin={this.onCloseScanner}
          isTimerVisible={this.props.isTimerVisible}
          showTimer={this.props.showTimer}
        />
      );
    } else if (this.state.mode === 'warehouse') {
      phase = (
        <Warehouse
          count={this.state.count}
          story={story}
          onChangeKnot={this.onChangeKnot}
          aisle={this.state.aisle}
          aisleSide={this.state.aisleSide}
          startLocation={this.props.lastLocation}
          rememberLocation={this.rememberLocation}
          onWin={this.onWalkComplete}
        />
      );
    } else if (this.state.mode === 'pick') {
      phase = (
        <PickProducts
          story={story}
          products={this.state.products}
          product={this.state.product}
          count={this.state.count}
          onChangeKnot={this.onChangeKnot}
          onPickedProduct={this.onPickedProduct}
          onWin={this.onPickComplete}
        />
      );
    }

    return (
      <div className={styles.base}>
        {phase}
        <Knot text={this.state.text} options={this.state.options} isOpen={this.state.isOpen} />
      </div>
    );
  }
}

PickingMiniGame.defaultProps = {
  category: 'All',
  onComplete: () => {},
  rounds: 3,
  showPickRate: () => {},
  showTimer: () => {},
  hideTimer: () => {}
};
