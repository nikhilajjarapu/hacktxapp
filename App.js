import 'react-native-gesture-handler';
import * as React from 'react';
import { checkInScreen } from './components/checkInScreen.js';
import { foodScreen } from './components/foodScreen.js';
import { adminScreen } from './components/adminScreen.js'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


const Tab = createBottomTabNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Hackathon Check In" component={checkInScreen} />
        <Tab.Screen name="Food Check In" component={foodScreen} />
        <Tab.Screen name="Admin" component={adminScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
