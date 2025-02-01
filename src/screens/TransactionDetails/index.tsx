import * as React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import VarText from '../../components/VarText';

const DetailsScreen = (): React.JSX.Element => {
  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View>
        <VarText size="large" style={styles.pageTitle}>
          Transaction Details
        </VarText>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
  },
  pageTitle: {
    textAlign: 'center',
  },
});

export default DetailsScreen;
