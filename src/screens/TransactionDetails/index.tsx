import * as React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import VarText from '../../components/VarText';
import {useRoute} from '@react-navigation/native';
import {ArrowDownToDot, ArrowUpFromDot, Share} from 'lucide-react-native';
import {useDispatch} from 'react-redux';
import {transactionListAction} from '../../redux/actions/transactionListActions';

const DetailsScreen = (): React.JSX.Element => {
  const dispatch = useDispatch();
  const route = useRoute();
  const transactionItem = route.params as TransactionModule.Transaction;
  const transactionDetails = [
    {
      label: 'Reference Number',
      content: transactionItem.refId,
    },
    {
      label: 'Transfer Date',
      content: `${new Date(transactionItem.transferDate).toLocaleDateString(
        'en-MY',
        {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        },
      )} ${new Date(transactionItem.transferDate).toLocaleTimeString('en-MY', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      })}
      `,
    },
    {
      label: 'Recipient Name',
      content: transactionItem.recipientName,
    },
    {
      label: 'Transfer Name',
      content: transactionItem.transferName,
    },
    {
      label: 'Amount',
      content: transactionItem.isExpenditure
        ? `-MYR${transactionItem.amount.toFixed(2)}`
        : `MYR${transactionItem.amount.toFixed(2)}`,
    },
    {
      label: 'Description',
      content: transactionItem.description,
    },
  ];

  const onTransactionDetailsShare = () => {
    dispatch(
      transactionListAction.requestShareTransactionDetails(transactionItem),
    );
  };

  const renderHeaderIcon = (): React.JSX.Element => {
    const isExpenditure = transactionItem.isExpenditure;

    return (
      <View style={styles.iconContainer}>
        {isExpenditure ? (
          <ArrowUpFromDot size={50} color="#ff6f61" />
        ) : (
          <ArrowDownToDot size={50} color="#4CAF50" />
        )}
      </View>
    );
  };

  const renderTransactionDetails = (): React.JSX.Element[] => {
    return transactionDetails.map((item, index) => (
      <View key={index} style={styles.labelContainer}>
        <VarText size="medium" style={styles.label}>
          {item.label}
        </VarText>
        <VarText size="small" style={styles.content}>
          {item.content}
        </VarText>
      </View>
    ));
  };

  const renderShareButton = (): React.JSX.Element => {
    return (
      <TouchableOpacity
        style={styles.shareButton}
        onPress={onTransactionDetailsShare}>
        <Share size={20} color="#fff" />
        <Text style={styles.shareButtonText}>Share</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <VarText size="large" style={styles.pageTitle}>
        Transaction Details
      </VarText>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {renderHeaderIcon()}
        {renderTransactionDetails()}
        {renderShareButton()}
      </ScrollView>
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
  contentContainer: {
    flex: 1,
    marginTop: 20,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginVertical: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  labelContainer: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    alignSelf: 'flex-start',
  },
  content: {
    color: '#888',
    marginTop: 10,
    alignSelf: 'flex-end',
  },
  shareButton: {
    flexDirection: 'row',
    backgroundColor: '#FF7F50',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  shareButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DetailsScreen;
