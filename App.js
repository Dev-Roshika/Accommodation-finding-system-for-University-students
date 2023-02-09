import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from './Screen/Home'
import Login from './Screen/Login'
import OnBoardScreen from './Screen/OnBoardScreen'
import Profile from './Screen/Profile'

const Stack = createNativeStackNavigator();

export default function App() {
  
    return (
      <NavigationContainer >
        <Stack.Navigator screenOptions={{headerShown:false}}>
          <Stack.Screen name = "onBordingScreen" component = {OnBoardScreen} />
          <Stack.Screen name = "login" component = {Login} />
          <Stack.Screen name = "home" component = {Home} />
          <Stack.Screen name = "profile" component = {Profile} />
        </Stack.Navigator>
      </NavigationContainer>
    );
}
