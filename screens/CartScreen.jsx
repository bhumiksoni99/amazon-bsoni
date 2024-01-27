import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Header from "../components/Header";
import Seperator from "../components/Seperator";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  decrementCount,
  incrementCount,
  removeFromCart,
} from "../redux/cartReducer";
import { useToast } from "react-native-toast-notifications";

const windowWidth = Dimensions.get("window").width;

const CartScreen = ({ navigation }) => {
  const cart = useSelector((state) => state.cart.cart); //state.(reducerName).(objectInReducer)
  const dispatch = useDispatch();
  const toast = useToast();

  const getTotal = () => {
    let total = 0;
    cart?.forEach((item) => (total += item.price));
    return total;
  };

  return (
    <ScrollView scrollEnabled={false} style={{ backgroundColor: "white" }}>
      <Header />
      <Text style={{ fontSize: 20, padding: 10 }}>
        Subtotal:
        <Text style={{ fontWeight: "bold", fontSize: 20 }}>
          Rs. {getTotal()}
        </Text>
      </Text>
      <TouchableOpacity
        style={{
          padding: 10,
          backgroundColor: "#F1C40F",
          margin: 10,
          borderRadius: 10,
        }}
        onPress={() => {
          if (cart.length == 0) {
            toast.show("Your cart is empty");
            return;
          }
          navigation.navigate("confirm", { cart });
        }}
      >
        <Text style={{ textAlign: "center" }}>
          Proceed to buy ({cart?.length}) items
        </Text>
      </TouchableOpacity>
      <Seperator />
      <ScrollView>
        {cart.length > 0 &&
          cart.map((item) => (
            <View key={item._id}>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  padding: 20,
                  maxWidth: windowWidth,
                }}
              >
                <TouchableOpacity>
                  <Image
                    source={{ uri: item.image }}
                    style={{ resizeMode: "contain", marginRight: 10 }}
                    width={120}
                    height={120}
                  />
                </TouchableOpacity>
                <View style={{ flexShrink: 1 }}>
                  <Text>{item.title}</Text>
                  <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                    Rs. {item.price}
                  </Text>
                  <Text style={{ color: "green" }}>In Stock</Text>
                  <Text>
                    {item.rating?.rate} ({item.rating?.count}) ratings
                  </Text>
                </View>
              </TouchableOpacity>
              <View style={{ flexDirection: "row", paddingHorizontal: 20 }}>
                <TouchableOpacity
                  onPress={() => dispatch(decrementCount(item))}
                  style={[
                    styles.button,
                    { borderTopStartRadius: 5, borderBottomStartRadius: 5 },
                  ]}
                >
                  {item.quantity == 1 ? (
                    <MaterialCommunityIcons
                      name="delete-outline"
                      size={20}
                      color="black"
                    />
                  ) : (
                    <Text>-</Text>
                  )}
                </TouchableOpacity>
                <View style={[styles.button, { backgroundColor: "white" }]}>
                  <Text>{item.quantity}</Text>
                </View>
                <TouchableOpacity
                  onPress={() => dispatch(incrementCount(item))}
                  style={[
                    styles.button,
                    { borderTopEndRadius: 5, borderBottomEndRadius: 5 },
                  ]}
                >
                  <Text>+</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => dispatch(removeFromCart(item))}
                >
                  <Text>Delete</Text>
                </TouchableOpacity>
              </View>
              <View style={{ flexDirection: "row", marginTop: 10 }}>
                <TouchableOpacity style={styles.actionButton}>
                  <Text>Save For Later</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                  <Text>See More Like This</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
      </ScrollView>
    </ScrollView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#D7DBDD",
    width: 40,
    padding: 5,
    alignItems: "center",
    padding: 10,
  },
  actionButton: {
    borderColor: "#D7DBDD",
    borderWidth: 1,
    padding: 10,
    marginLeft: 20,
    borderRadius: 5,
  },
});
