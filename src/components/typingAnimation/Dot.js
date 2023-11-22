import React from 'react';
import { View } from 'react-native';
import { Colors } from '../../assets';

const getStyles = ({ x, y }) => ({
  left: x,
  top: y,
});

const Dot = props => <View style={[{ position: 'absolute', width: 2.5, height: 2.5, borderRadius: 2.5, backgroundColor: Colors.WHITE }, getStyles(props)]} />;

export default Dot;
