import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
  Touchable,
} from "react-native";
import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartReducer";
import { useToast } from "react-native-toast-notifications";
import { useNavigation } from "@react-navigation/native";

const windowWidth = Dimensions.get("window").width;

const ProductItem = ({ product }) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const navigation = useNavigation();

  const addItemToCart = (item) => {
    dispatch(addToCart(item));
    toast.show("Added To Cart");
  };

  return (
    <TouchableOpacity style={{ padding: 20 }}>
      <Image
        source={{ uri: product.image }}
        width={windowWidth / 2 - 50}
        height={windowWidth / 2 - 50}
        resizeMode="contain"
      />
      <Text
        numberOfLines={1}
        style={{
          maxWidth: windowWidth / 2 - 50,
          marginTop: 10,
          textAlign: "center",
        }}
      >
        {product.title}
      </Text>
      <View
        style={{
          flexDirection: "row",
          flex: 1,
          justifyContent: "space-between",
          marginTop: 5,
        }}
      >
        <Text style={{ fontWeight: "500" }}>$ {product.price}</Text>
        <Text style={{ color: "#F4D03F", fontWeight: "500" }}>
          {product.rating.rate} ratings
        </Text>
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: "#F1C40F",
          padding: 10,
          borderRadius: 20,
          marginTop: 10,
          marginHorizontal: 10,
        }}
        onPress={() => addItemToCart(product)}
      >
        <Text style={{ textAlign: "center" }}>Add to Cart</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default ProductItem;

const styles = StyleSheet.create({});
