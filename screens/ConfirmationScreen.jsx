import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import Seperator from "../components/Seperator";
import Address from "../components/Address";
import { Fontisto } from "@expo/vector-icons";
import { useToast } from "react-native-toast-notifications";
import { placeOrderApi } from "../helpers/apis";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { cleanCart } from "../redux/cartReducer";

const ConfirmationScreen = ({ route, navigation }) => {
  const { cart } = route.params;
  const steps = [
    { title: "Address", content: "Address Form" },
    { title: "Delivery", content: "Delivery Options" },
    { title: "Payment", content: "Payment Details" },
    { title: "Place Order", content: "Order Summary" },
  ];
  const defaultId = useSelector((state) => state.address.defaultId);
  const addresses = useSelector((state) => state.address.addresses);

  const toast = useToast();
  const dispatch = useDispatch();

  const [selectedAddress, setSelectedAdress] = useState(
    addresses.find((address) => address._id === defaultId)
  );
  const [payment, setPayment] = useState(null);
  const [delivery, setDelivery] = useState(false);
  const [curr, setCurr] = useState(0);

  const getTotal = () => {
    let total = 0;
    cart?.forEach((item) => (total += item.price));
    return total;
  };

  const pay = async () => {
    try {
      //integrate razorpay here
      //easy stuff
      //skip
    } catch (error) {}
  };

  const onSelectAddress = () => {
    setCurr(curr + 1);
  };

  const placeOrder = async () => {
    const token = await AsyncStorage.getItem("authToken");

    const order = {
      shippingAddress: selectedAddress,
      cartItems: cart,
      totalPrice: getTotal(),
      paymentMethod: payment,
    };

    try {
      const data = await placeOrderApi(token, order);
      dispatch(cleanCart());
      navigation.navigate("orderPlaced");
    } catch (e) {
      toast.show(e.message, { type: "danger" });
    }
  };

  const renderOrderSummary = (title, amount, total = false) => (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        flex: 1,
        paddingTop: 5,
      }}
    >
      <Text
        style={{
          fontSize: total ? 18 : 12,
          fontWeight: total ? "bold" : "400",
        }}
      >
        {title}
      </Text>
      <Text
        style={{ color: total ? "red" : "grey", fontSize: total ? 18 : 12 }}
      >
        Rs. {amount}
      </Text>
    </View>
  );

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ flexDirection: "row", flex: 1 }}>
        {steps.map((step, idx) => (
          <View
            style={{ flex: 1, padding: 20, alignItems: "center" }}
            key={idx}
          >
            <View
              style={{
                height: 30,
                width: 30,
                borderRadius: 15,
                justifyContent: "space-between",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: idx + 1 > curr ? "#D7DBDD" : "green",
              }}
            >
              {idx + 1 > curr ? (
                <Text style={{ color: "white" }}>{idx + 1}</Text>
              ) : (
                <AntDesign name="check" size={24} color="white" />
              )}
            </View>
            <Text style={{ marginTop: 5 }}>{step.title}</Text>
          </View>
        ))}
      </View>
      <Seperator />
      {curr === 0 && (
        <View style={{ padding: 10 }}>
          <Text style={{ padding: 10, fontSize: 16 }}>
            Select Delivery Address
          </Text>
          {addresses?.map((address) => (
            <TouchableOpacity
              style={{ flexDirection: "row", alignItems: "center", flex: 1 }}
              onPress={() => setSelectedAdress(address)}
            >
              {selectedAddress?._id === address._id ? (
                <Fontisto name="radio-btn-active" size={20} color="#008397" />
              ) : (
                <Fontisto name="radio-btn-passive" size={20} color="#008397" />
              )}
              <Address
                address={address}
                selectedAddress={
                  selectedAddress?._id === address._id ? selectedAddress : null
                }
                onSelectAddress={onSelectAddress}
              />
            </TouchableOpacity>
          ))}
        </View>
      )}
      {curr == 1 && (
        <View style={{ padding: 10 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            Select Your Delivery Options
          </Text>
          <TouchableOpacity
            onPress={() => setDelivery(!delivery)}
            style={styles.option}
          >
            {delivery ? (
              <Fontisto name="radio-btn-active" size={16} color="#008397" />
            ) : (
              <Fontisto name="radio-btn-passive" size={16} color="#008397" />
            )}
            <Text style={{ marginLeft: 10 }}>
              Tomorrow by 10 - Free Delivery with Prime
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: "#F1C40F",
              padding: 10,
              margin: 10,
              borderRadius: 20,
            }}
            onPress={() => {
              if (!delivery) {
                toast.show("Please a select delivery option");
                return;
              }
              setCurr(curr + 1);
            }}
          >
            <Text style={{ textAlign: "center", color: "white" }}>
              Continue
            </Text>
          </TouchableOpacity>
        </View>
      )}
      {curr == 2 && (
        <View style={{ padding: 10 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            Select Your Payment Method
          </Text>
          <TouchableOpacity
            onPress={() => setPayment("cash")}
            style={styles.option}
          >
            {payment && payment === "cash" ? (
              <Fontisto name="radio-btn-active" size={16} color="#008397" />
            ) : (
              <Fontisto name="radio-btn-passive" size={16} color="#008397" />
            )}
            <Text style={{ marginLeft: 10 }}>Cash On Delivery</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setPayment("card");
              Alert.alert("UPI/Debit Card/Credit Card", "Pay Online", [
                {
                  text: "Cancel",
                  onPress: () => console.log("Cancel"),
                  style: "cancel",
                },
                {
                  text: "OK",
                  onPress: () => pay(),
                },
              ]);
            }}
            style={styles.option}
          >
            {payment && payment === "card" ? (
              <Fontisto name="radio-btn-active" size={16} color="#008397" />
            ) : (
              <Fontisto name="radio-btn-passive" size={16} color="#008397" />
            )}
            <Text style={{ marginLeft: 10 }}>Card/UPI</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: "#F1C40F",
              padding: 10,
              margin: 10,
              borderRadius: 20,
            }}
            onPress={() => {
              if (!payment) {
                toast.show("Please a select payment method");
                return;
              }
              setCurr(curr + 1);
            }}
          >
            <Text style={{ textAlign: "center", color: "white" }}>
              Continue
            </Text>
          </TouchableOpacity>
        </View>
      )}
      {curr == 3 && (
        <View style={{ padding: 10 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            Order Summary
          </Text>
          <View
            style={{
              borderWidth: 1,
              borderColor: "#CACFD2",
              marginTop: 10,
              padding: 10,
            }}
          >
            <Text style={{ color: "#5CC4E8" }}>
              Shipping to {selectedAddress.name}
            </Text>
            {renderOrderSummary("Items", getTotal())}
            {renderOrderSummary("Delivery", 0)}
            {renderOrderSummary("Order Total", getTotal(), true)}
          </View>
          <View
            style={{
              borderWidth: 1,
              borderColor: "#CACFD2",
              marginTop: 10,
              padding: 10,
            }}
          >
            <Text style={{ color: "#CACFD2" }}>Pay with</Text>
            {payment === "cash" ? (
              <Text style={{ fontWeight: "bold" }}>
                Pay on Delivery (Cash/Card)
              </Text>
            ) : (
              <Text style={{ fontWeight: "bold" }}>Pay with with Card</Text>
            )}
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: "#F1C40F",
              padding: 10,
              margin: 10,
              borderRadius: 20,
              marginTop: 10,
            }}
            onPress={() => {
              setCurr(curr + 1);
              placeOrder();
            }}
          >
            <Text
              style={{
                textAlign: "center",
                color: "white",
                fontWeight: "bold",
              }}
            >
              Place Order
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

export default ConfirmationScreen;

const styles = StyleSheet.create({
  option: {
    flexDirection: "row",
    flex: 1,
    borderWidth: 1,
    padding: 10,
    margin: 10,
    alignItems: "center",
  },
});
