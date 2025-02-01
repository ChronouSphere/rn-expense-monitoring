import * as React from 'react';
import {StyleSheet, View, SafeAreaView} from 'react-native';
import VarText from '../../components/VarText';

const ListingScreen = (): React.JSX.Element => {
  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View>
        <VarText size="large" style={styles.pageTitle}>
          Transaction List
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

export default ListingScreen;
