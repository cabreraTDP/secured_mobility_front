import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import MainFrame from './MainFrame';
import Login from './Login';
import store from './src/redux/store'
import { navigationRef } from './src/RootNavigation';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();
export default function App() {

  return (
    <NavigationContainer ref={navigationRef} theme={{colors: {background:'black'}}}>

    <Provider store={store}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={MainFrame} />
      </Stack.Navigator>
    </Provider>
    </NavigationContainer>
    
  );
}
