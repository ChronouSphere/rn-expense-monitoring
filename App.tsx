import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import HomeScreen from './src/screens/Home';
import ListingScreen from './src/screens/TransactionList';
import DetailsScreen from './src/screens/TransactionDetails';

export type RootStackParamList = {
  Home: undefined;
  Listing: undefined;
  Detail: TransactionModule.Transaction;
};

const App = (): React.JSX.Element => {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen}></Stack.Screen>
        <Stack.Screen name="Listing" component={ListingScreen}></Stack.Screen>
        <Stack.Screen name="Detail" component={DetailsScreen}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
