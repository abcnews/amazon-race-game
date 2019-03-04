import React, { Component } from 'react';
import Loader from '../Loader';
import Story from '../Story';
import { preloadAssets } from '../../assets';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true
    };
  }

  componentDidMount() {
    document.body.style.setProperty('background', 'black');
    window.unveil && unveil();

    preloadAssets(() => {
      this.setState(s => ({ isLoading: false }));
    });
  }

  render() {
    if (this.state.isLoading) return <Loader />;

    return <Story />;
  }
}
