import * as React from 'react';
import {StyleSheet, View, SafeAreaView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import VarText from '../../components/VarText';
import {useEffect, useState} from 'react';
import {TRANASACTION_LIST_FETCH_LIMIT} from '../../constants/transactionConstant';
import transactionListSelector from '../../redux/selectors';
import {transactionListAction} from '../../redux/actions/transactionListActions';

const ListingScreen = (): React.JSX.Element => {
  const [loading, setLoading] = useState(false);
  const itemLimit = TRANASACTION_LIST_FETCH_LIMIT; // Limit of items to render
  const transactionList = useSelector(transactionListSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = (): void => {
    setLoading(true);
    dispatch(transactionListAction.startRequestFetchApi());
  };

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
