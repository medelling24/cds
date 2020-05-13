import {Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {COLOR} from './styleGuide';

const styles = {
  button: {
    shadowColor: COLOR.BLACK,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 1.0,
    elevation: 1,
  },
  text: {
    fontFamily: 'quicksand-medium',
  },
}
export const Button = ({onPress, buttonStyle, textStyle, text, disabled}) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.button, buttonStyle]}
    disabled={disabled}>
    <Text style={[styles.text, textStyle]}>{text}</Text>
  </TouchableOpacity>
);
