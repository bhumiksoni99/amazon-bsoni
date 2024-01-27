import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Header from "../components/Header";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import Seperator from "../components/Seperator";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cartReducer";
import { useToast } from "react-native-toast-notifications";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const ProductInfoScreen = ({ route }) => {
  const { id, title, offer, oldPrice, price, carouselImages, size, color } =
    route.params.info;
  const dispatch = useDispatch();
  const toast = useToast();

  const cart = useSelector((state) => state.cart.cart); //state.(reducerName).(objectInReducer)

  const addItemToCart = (item) => {
    dispatch(addToCart(item));
    toast.show("Added To Cart");
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
      <Header />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator
        style={{ marginVertical: 20 }}
      >
        {carouselImages.map((image, idx) => (
          <ImageBackground
            key={idx}
            source={{ uri: image }}
            style={{ width: windowWidth, height: windowHeight / 2.5 }}
            resizeMode="contain"
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                flex: 1,
                padding: 20,
              }}
            >
              <View style={[styles.icons, { backgroundColor: "red" }]}>
                <Text style={{ textAlign: "center", color: "white" }}>
                  {offer} off
                </Text>
              </View>
              <View style={[styles.icons, { backgroundColor: "#E0E0E0" }]}>
                <AntDesign name="sharealt" size={24} color="black" />
              </View>
            </View>
            <View
              style={[
                styles.icons,
                {
                  backgroundColor: "#E0E0E0",
                  marginHorizontal: 20,
                  marginBottom: 10,
                },
              ]}
            >
              <AntDesign name="hearto" size={24} color="black" />
            </View>
          </ImageBackground>
        ))}
      </ScrollView>
      <View style={{ padding: 10 }}>
        <Text>{title}</Text>
        <Text style={{ fontWeight: "700", marginTop: 5, fontSize: 16 }}>
          ${price}
        </Text>
      </View>
      <Seperator />
      <Text style={{ padding: 20, fontSize: 14 }}>
        Color: <Text style={{ fontWeight: "bold" }}>{color}</Text>
      </Text>
      <Text style={{ padding: 20, paddingTop: 0, fontSize: 14 }}>
        Size : <Text style={{ fontWeight: "bold" }}>{size}</Text>
      </Text>
      <Seperator />
      <Text style={{ color: "#00CED1", padding: 10 }}>
        Free Delivery by tomorrow 3 PM
      </Text>
      <View style={{ flexDirection: "row", padding: 10 }}>
        <Ionicons name="location-outline" size={20} color="black" />
        <Text style={{}}>Deliver to Bhumik - Delhi 110052</Text>
      </View>
      <Text
        style={{ color: "green", padding: 20, marginBottom: 10, paddingTop: 0 }}
      >
        In Stock
      </Text>
      <View style={{ marginHorizontal: 20 }}>
        <TouchableOpacity
          style={{
            backgroundColor: "#F1C40F",
            padding: 10,
            borderRadius: 20,
          }}
          onPress={() => addItemToCart(route.params.info)}
        >
          <Text style={{ textAlign: "center", fontSize: 14 }}>Add to Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: "#F1AB0F",
            padding: 10,
            marginTop: 10,
            borderRadius: 20,
          }}
        >
          <Text style={{ textAlign: "center", fontSize: 14 }}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ProductInfoScreen;

const styles = StyleSheet.create({
  icons: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "",
    alignItems: "center",
    justifyContent: "center",
  },
});
