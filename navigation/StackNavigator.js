import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import Home from "../screens/Home";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import { ToastProvider } from "react-native-toast-notifications";
import ProductInfoScreen from "../screens/ProductInfoScreen";
import AddAddressScreen from "../screens/AddAddressScreen";
import AddressForm from "../screens/AddressForm";
import CartScreen from "../screens/CartScreen";
import ConfirmationScreen from "../screens/ConfirmationScreen";
import OrderPlaced from "../screens/OrderPlaced";
import ProfileScreen from "../screens/ProfileScreen";
import { StatusBar, Platform } from "react-native";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function bottomTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="home"
        component={Home}
        options={{
          tabBarLabel: "Home",
          headerShown: false,
          tabBarLabelStyle: { color: "#3CB8A9" },
          tabBarIcon: ({ focused }) =>
            !focused ? (
              <AntDesign name="home" size={24} color="black" />
            ) : (
              <AntDesign name="home" size={24} color="#3CB8A9" />
            ),
        }}
      />
      <Tab.Screen
        name="profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: "Profile",
          tabBarLabelStyle: { color: "#3CB8A9" },
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            !focused ? (
              <Ionicons name="person-outline" size={24} color="black" />
            ) : (
              <Ionicons name="person-outline" size={24} color="#3CB8A9" />
            ),
        }}
      />
      <Tab.Screen
        name="cart"
        component={CartScreen}
        options={{
          tabBarLabel: "Cart",
          tabBarLabelStyle: { color: "#3CB8A9" },
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            !focused ? (
              <Feather name="shopping-cart" size={24} color="black" />
            ) : (
              <Feather name="shopping-cart" size={24} color="#3CB8A9" />
            ),
        }}
      />
    </Tab.Navigator>
  );
}

const StackNavigator = () => {
  return (
    <NavigationContainer>
      <ToastProvider offsetBottom={100}>
        <SafeAreaView style={{ flex: 0, backgroundColor: "#00CED1" }} />
        <SafeAreaView
          style={{
            flex: 1,
            marginTop: Platform.OS === "ios" ? 0 : StatusBar.currentHeight,
          }}
        >
          <Stack.Navigator>
            <Stack.Screen
              name="login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="register"
              component={RegisterScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Main"
              component={bottomTabs}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="info"
              component={ProductInfoScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="addAddress"
              component={AddAddressScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="addAddressForm"
              component={AddressForm}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="confirm"
              component={ConfirmationScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="orderPlaced"
              component={OrderPlaced}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </SafeAreaView>
      </ToastProvider>
    </NavigationContainer>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});
