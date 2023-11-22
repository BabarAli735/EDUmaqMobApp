import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import Dot from './Dot';
import { Colors } from '../../assets';

class TypingAnimation extends React.Component {
  constructor(props) {
    super(props);

    const { dotAmplitude, dotSpeed } = props;
    this.state = {
      currentAnimationTime: 0,
    };

    this._animation = () => {
      this.setState(prevState => ({
        y1: dotAmplitude * Math.sin(prevState.currentAnimationTime),
        y2: dotAmplitude * Math.sin(prevState.currentAnimationTime - 0.4),
        y3: dotAmplitude * Math.sin(prevState.currentAnimationTime - 0.5),
        y4: dotAmplitude * Math.sin(prevState.currentAnimationTime - 0.6),
        y5: dotAmplitude * Math.sin(prevState.currentAnimationTime - 0.7),
        y6: dotAmplitude * Math.sin(prevState.currentAnimationTime - 0.8),
        y7: dotAmplitude * Math.sin(prevState.currentAnimationTime - 1.2),
        y8: dotAmplitude * Math.sin(prevState.currentAnimationTime - 1.6),
        y9: dotAmplitude * Math.sin(prevState.currentAnimationTime - 2),
        currentAnimationTime: prevState.currentAnimationTime + dotSpeed,
      }));
      this.frameAnimationRequest = requestAnimationFrame(this._animation);
    };
    this.frameAnimationRequest = requestAnimationFrame(this._animation);
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.frameAnimationRequest);
  }

  render() {
    const { dotMargin } = this.props;

    return (
      <View style={styles.container}>
        <Text style={[styles.text, { top: this.state.y1 }]}>T</Text>
        <Text style={[styles.text, { top: this.state.y2 }]}>y</Text>
        <Text style={[styles.text, { top: this.state.y3 }]}>p</Text>
        <Text style={[styles.text, { top: this.state.y4 }]}>i</Text>
        <Text style={[styles.text, { top: this.state.y5 }]}>n</Text>
        <Text style={[styles.text, { top: this.state.y6 }]}>g</Text>
        <View style={styles.dotContainer}>
          <Dot x={-6} y={this.state.y7} />
          <Dot x={-2} y={this.state.y8} />
          <Dot x={2} y={this.state.y9} />
        </View>
      </View>
    );
  }
}

TypingAnimation.defaultProps = {
  dotMargin: 2,
  dotAmplitude: 3,
  dotSpeed: 0.1,
};

export default TypingAnimation;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontWeight: '400',
    fontSize: 10,
    color: Colors.WHITE,
    lineHeight: 16,
  },
  dotContainer: {
    marginLeft: 7,
  },
});
