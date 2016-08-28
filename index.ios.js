/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import {AppRegistry} from 'react-native';
import App from './app/containers/app';

// eslint-disable-next-line
console.ignoredYellowBox = [
  // eslint-disable-next-line
  'Warning: You are manually calling a React.PropTypes validation',
  'Warning: In next release empty section headers will be rendered. In this release you can use \'enableEmptySections\' flag to render empty section headers.'
];

AppRegistry.registerComponent('Transmission', () => App);
