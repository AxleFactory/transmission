import React, {
  PropTypes,
  StyleSheet,
  TouchableHighlight,
  Text,
  View
} from 'react-native';
import Colors from '../constants/colors';
import StyleRules from '../constants/styleRules';

export default function ContactRow ({contact, onPress}) {
  return (
    <TouchableHighlight
      onPress={() => onPress()}
      underlayColor={Colors.Gray.Light}
      style={styles.container}
    >
      <View>
        <Text style={styles.name}>{contact.fullName}</Text>
        <Text style={styles.phoneNumber}>{contact.phoneNumber}</Text>
      </View>
    </TouchableHighlight>
  );
}

ContactRow.propTypes = {
  contact: PropTypes.object.isRequired,
  onPress: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: StyleRules.ScreenPadding,
    paddingVertical: 10
  },
  name: {
    fontSize: 16,
    color: Colors.Blue.Light
  },
  phoneNumber: {
    fontSize: 14,
    color: Colors.Gray.Normal
  }
});
