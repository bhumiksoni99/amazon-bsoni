import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import React, { useEffect } from "react";

const OrderPlaced = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.pop(2), navigation.replace("Main");
    }, 1800);
  });

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
      }}
    >
      <Image
        source={require("../tenor.gif")}
        resizeMode="contain"
        style={{ justifyContent: "center", height: 100, height: 100 }}
      />
      <Text
        style={{
          marginTop: 40,
          fontWeight: "bold",
          fontSize: 24,
          textAlign: "center",
        }}
      >
        Order Placed
      </Text>
    </View>
  );
};

export default OrderPlaced;

const styles = StyleSheet.create({});
