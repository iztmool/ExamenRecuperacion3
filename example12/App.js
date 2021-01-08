import React from 'react';
import ProductosProvider from './Context/ProductosContext';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigator1 from './Navigations/StackNavigator1';


export default function App() {
  return (
    <ProductosProvider>
      <NavigationContainer>
        <StackNavigator1/>
      </NavigationContainer>
    </ProductosProvider>
  );
}



