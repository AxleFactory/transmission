import React, { PropTypes } from 'react';
import {
  Platform,
  StyleSheet,
  View
} from 'react-native';
import Colors from '../constants/colors';

export default function Screen ({children, style, ...props}) {
  return (
    <View
      style={[styles.view, style]}
      {...props}
    >
      {children}
    </View>
  );
}

Screen.propTypes = {
  style: View.propTypes.style,
  children: PropTypes.node
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    ...Platform.select({
      ios: {
        paddingTop: 63,
      },
      android: {
        paddingTop: 53,
      },
    }),
    backgroundColor: Colors.White
  }
});
