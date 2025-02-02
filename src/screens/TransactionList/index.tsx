import * as React from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import VarText from '../../components/VarText';
import {useEffect, useState} from 'react';
import {transactionListAction} from '../../redux/actions/transactionListActions';
import {
  ArrowUpFromDot,
  ArrowDownToDot,
  ChevronRight,
} from 'lucide-react-native';
import {transactionListSelector} from '../../redux/selectors/transactionListSelectors';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../App';

const ListingScreen = (): React.JSX.Element => {
  const [loading, setLoading] = useState(false);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const transactionList = useSelector(transactionListSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    loadTransactions();
  }, []);

  useEffect(() => {
    if (loading) {
      setLoading(false);
    }
  }, [transactionList]);

  const loadTransactions = (): void => {
    if (!loading && transactionList.length === 0) {
      setLoading(true);
      dispatch(transactionListAction.startRequestFetchApi());
    }
  };

  const renderSkeletalLoading = (): React.JSX.Element => {
    return (
      <>
        <SkeletonPlaceholder speed={1000}>
          <View style={{alignItems: 'center'}}>
            {Array.from(Array(10).keys()).map(index => {
              return <View key={index} style={styles.skeletalItemContainer} />;
            })}
          </View>
        </SkeletonPlaceholder>
      </>
    );
  };

  const renderIcon = (
    item: TransactionModule.Transaction,
  ): React.JSX.Element => {
    const isExpenditure = item.isExpenditure;

    if (isExpenditure) {
      return (
        <View style={styles.iconContainer}>
          <ArrowUpFromDot size={20} />
        </View>
      );
    }

    return (
      <View style={styles.iconContainer}>
        <ArrowDownToDot size={20} />
      </View>
    );
  };

  const renderTimeStamp = (
    item: TransactionModule.Transaction,
  ): React.JSX.Element => {
    return (
      <VarText size="small" style={styles.date}>
        {new Date(item.transferDate).toLocaleDateString('en-MY', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        }) +
          ' ' +
          new Date(item.transferDate).toLocaleTimeString('en-MY', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
          })}
      </VarText>
    );
  };

  const renderTransactionItem = ({
    item,
    index,
  }: {
    item: TransactionModule.Transaction;
    index: number;
  }) => {
    const isFirst = index === 0;
    const isLast = index === transactionList.length - 1;
    const isExpenditure = item.isExpenditure;
    const onPress = (): void => {
      navigation.navigate('Detail', item);
    };

    return (
      <TouchableOpacity
        onPress={onPress}
        style={[
          styles.itemContainer, // Base style
          isFirst && styles.firstItemContainer,
          isLast && styles.lastItemContainer,
        ]}>
        <View style={styles.iconContainer}>{renderIcon(item)}</View>
        <View style={styles.textContainer}>
          {renderTimeStamp(item)}
          <VarText size="small" style={styles.name}>
            {item.recipientName}
          </VarText>
          <VarText size="small" style={styles.description}>
            {item.transferName}
          </VarText>
          <VarText
            size="small"
            style={isExpenditure ? styles.expenditureAmount : styles.amount}>
            {isExpenditure
              ? `-MYR${item.amount.toFixed(2)}`
              : `MYR${item.amount.toFixed(2)}`}
          </VarText>
        </View>
        <View style={styles.chevronContainer}>
          <ChevronRight size={20} color="#888" />
        </View>
      </TouchableOpacity>
    );
  };

  const renderTransactionList = (
    transactions: TransactionModule.Transaction[],
  ): React.JSX.Element => {
    return (
      <FlatList
        data={transactions}
        renderItem={renderTransactionItem}
        keyExtractor={item => item.refId}
        initialNumToRender={6}
        updateCellsBatchingPeriod={1000}
        maxToRenderPerBatch={30}
        contentContainerStyle={styles.flatListContentContainer}
      />
    );
  };

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <VarText size="large" style={styles.pageTitle}>
        Transaction List
      </VarText>
      {loading && renderSkeletalLoading()}
      {transactionList.length > 0 && renderTransactionList(transactionList)}
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
  skeletalItemContainer: {
    width: '90%',
    height: 100,
    borderRadius: 10,
    marginHorizontal: 10,
    marginTop: 10,
  },
  flatListContentContainer: {
    padding: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    backgroundColor: '#fff',
    borderBottomColor: '#eee', // Separator line
  },
  firstItemContainer: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  lastItemContainer: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  iconContainer: {
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  date: {
    fontSize: 14,
    color: '#888',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    color: '#555',
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
    alignSelf: 'flex-end',
  },
  expenditureAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ff6f61',
    alignSelf: 'flex-end',
  },
  chevronContainer: {
    marginLeft: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ListingScreen;
