import { View, Text, Button, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Discover from "./home_screens/Discover";
import Search from "./home_screens/Search";
import Create from "./home_screens/Create";
import Chat from "./home_screens/Chat";
import Profile from "./home_screens/Profile";
import { useEffect, useState } from "react";
import { isAuthenticated } from "../lib/services/auth";
import { useAuthStore } from "../lib/store";
import FeatherIcon from "react-native-vector-icons/Feather";
import EntypoIcon from "react-native-vector-icons/Entypo";

// Discover, Search, Create, Chat, Profile

const Tab = createBottomTabNavigator();

export default function Home({ navigation }) {
  const [fetching, setFetching] = useState(true);
  const jwt = useAuthStore(state => state.jwt);

  useEffect(() => {
    isAuthenticated(jwt.access)
      .then(isAuth => {
        if (!isAuth) {
          navigation.navigate('Get Started');
        } else {
          setFetching(false);
        }
      })
  })


  if (fetching) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Text style={{ textAlign: 'center' }}>Fetching...</Text>
      </View>
    )
  }

  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen
          name="Discover"
          component={Discover}
          options={{
            tabBarIcon: ({ color, size }) => <FeatherIcon name="compass" size={size} color={color} />
          }} />
        {/* <Tab.Screen 
          name="Search" 
          component={Search} 
        /> */}
        {/* <Tab.Screen name="Create" component={Create} /> */}
        <Tab.Screen 
          name="Alerts" 
          component={Chat} 
          options={{
            tabBarIcon: ({ color, size }) => <EntypoIcon name="bell" size={size} color={color} />
          }}
        />
        <Tab.Screen 
          name="Profile" 
          component={Profile} 
          options={{
            tabBarIcon: ({ color, size }) => <FeatherIcon name="user" size={size} color={color} />
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
