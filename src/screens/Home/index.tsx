import * as React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../App';
import VarText from '../../components/VarText';

type ProfileScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

type Props = {
  navigation: ProfileScreenNavigationProp;
};

const HomeScreen = ({navigation}: Props): React.JSX.Element => {
  return (
    <>
      <View style={styles.mainContainer}>
        <TouchableOpacity onPress={(): void => navigation.navigate('Listing')}>
          <VarText size="large">Begin</VarText>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
