# Transmission

[![shield](https://circleci.com/gh/AxleFactory/transmission/tree/develop.svg?style=shield&circle-token=033588c2f1721df49b30f8cdc9959bc2a721c6c5)](https://circleci.com/gh/AxleFactory/transmission/tree/develop)

Transmission helps you communicate official calls to action from your organization to your personal contacts.

## Installation

1. Clone the project
  ```
  git clone git@github.com:AxleFactory/transmission.git
  ```

2. Build the project
  ```
  cd transmission
  npm install
  ```

3. Run the project
 
  To run in iOS emulator
  ```
  npm run ios
  ```
  
  To run on Android device (plugged in via USB and with USB debugging enabled)
  ```
  npm run android
  ```
  
  To run on iOS device
  
  [Follow the instructions here](https://facebook.github.io/react-native/releases/0.24/docs/running-on-device-ios.html)

## Building and signing for app store releases

_Please contact [@jlegrone](https://github.com/jlegrone)_

## Contributing

Please submit all Pull Requests from your fork to `develop`. If your changes touch code, please make sure to run `npm
test` and verify that bother ESLint and tests pass. `develop` should only be merged into `master` when it has been
determined to be stable and is ready for a release.
