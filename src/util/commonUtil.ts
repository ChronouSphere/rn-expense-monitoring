export const generateTransactionDetailsMessage = (
  transactionItem: TransactionModule.Transaction,
): string => {
  try {
    const formattedDate = new Date(
      transactionItem.transferDate,
    ).toLocaleDateString('en-MY', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

    const formattedTime = new Date(
      transactionItem.transferDate,
    ).toLocaleTimeString('en-MY', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });

    const formattedAmount = transactionItem.isExpenditure
      ? `-MYR${transactionItem.amount.toFixed(2)}`
      : `MYR${transactionItem.amount.toFixed(2)}`;

    return `
      Transaction Details:
      Reference Number: ${transactionItem.refId}
      Transfer Date: ${formattedDate} ${formattedTime}
      Recipient Name: ${transactionItem.recipientName}
      Transfer Name: ${transactionItem.transferName}
      Amount: ${formattedAmount}
      Description: ${transactionItem.description || 'N/A'}
    `;
  } catch (error) {
    return ''; // Return empty string upon failure
  }
};
