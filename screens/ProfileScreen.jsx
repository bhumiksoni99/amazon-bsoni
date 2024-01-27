import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUserApi, fetchOrdersApi } from "../helpers/apis";
import Seperator from "../components/Seperator";

const windowWidth = Dimensions.get("window").width;

const ProfileScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState(null);

  const fetchUserData = async () => {
    const token = await AsyncStorage.getItem("authToken");
    try {
      const data = await getUserApi(token);
      setUser(data.user);
    } catch (e) {
      toast.show(e.message, { type: "danger" });
    }
  };

  console.log("wd", orders);

  const fetchOrders = async () => {
    const token = await AsyncStorage.getItem("authToken");
    try {
      const data = await fetchOrdersApi(token);
      setOrders(data.orders);
    } catch (e) {
      toast.show(e.message, { type: "danger" });
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem("authToken");
    navigation.replace("login");
  };

  console.log("wsdw", orders);

  useEffect(() => {
    fetchUserData();
    fetchOrders();
  }, []);
  return (
    <View style={{ backgroundColor: "white" }}>
      <Header hide={true} />
      {user && orders ? (
        <View style={{ padding: 10 }}>
          <Text style={{ fontSize: 18 }}>Welcome, {user.name}</Text>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              marginVertical: 10,
            }}
          >
            <TouchableOpacity style={styles.button}>
              <Text>Your Orders</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text>Your Account</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text>Buy Again</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => logout()}>
              <Text>Log Out</Text>
            </TouchableOpacity>
          </View>
          <Seperator />
          <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 10 }}>
            Your Last Orders
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={true}>
            {orders.map((order) => (
              <TouchableOpacity
                style={{
                  padding: 20,
                  margin: 10,
                  borderWidth: 1,
                  borderColor: "#D7DBDD",
                }}
                key={order._id}
              >
                <Image
                  source={{ uri: order.products[0].image }}
                  height={100}
                  width={100}
                  resizeMode={"contain"}
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      ) : (
        <Image
          source={require("../loader.gif")}
          resizeMode="contain"
          style={{
            justifyContent: "center",
            height: 100,
            height: 100,
            alignItems: "center",
          }}
        />
      )}
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#D7DBDD",
    flexDirection: "row",
    padding: 15,
    marginHorizontal: 10,
    margin: 5,
    borderRadius: 40,
    minWidth: windowWidth / 2 - 40,
    justifyContent: "center",
  },
});
