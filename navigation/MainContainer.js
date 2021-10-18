import * as React from 'react';
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';

// Screens
import HomeScreen from './screens/HomeScreen';
import SettingsScreen from './screens/SettingsScreen';
import FilesScreen from './screens/FilesScreen';

//Screen names
const homeName = 'Files';
const settingsName = 'Settings';

const Tab = createBottomTabNavigator();
const FileStack = createStackNavigator();

const FileStackScreen = () => (
  <FileStack.Navigator initialRouteName={'Main'}>
    <FileStack.Screen
      name="Main"
      component={HomeScreen}
      options={{headerShown: false}}
    />
    <FileStack.Screen
      name="File"
      component={FilesScreen}
      options={{headerShown: false}}
    />
  </FileStack.Navigator>
);

function MainContainer() {
  const theme = useSelector(state => state.theme);

  return (
    <NavigationContainer theme={theme === 'dark' ? DarkTheme : DefaultTheme}>
      <Tab.Navigator
        initialRouteName={homeName}
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            let rn = route.name;

            if (rn === homeName) {
              iconName = focused ? 'folder' : 'folder-outline';
            } else if (rn === settingsName) {
              iconName = focused ? 'settings' : 'settings-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'grey',
          tabBarLabelStyle: {
            fontSize: 12,
            paddingBottom: 10,
            marginTop: 2,
          },
          tabBarStyle: [
            {
              display: 'flex',
              paddingTop: 7,
              height: 70,
            },
            null,
          ],
        })}>
        <Tab.Screen name={homeName} component={FileStackScreen} />
        <Tab.Screen name={settingsName} component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default MainContainer;
