import React from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
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
export const IconButton = ({
  onPress,
  buttonStyle,
  iconStyle,
  name,
  iconSize,
  disabled,
}) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.button, buttonStyle]}
    disabled={disabled}>
    <Icon style={[styles.text, iconStyle]} name={name} size={iconSize} />
  </TouchableOpacity>
);
