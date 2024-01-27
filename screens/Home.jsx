import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
  View,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";
import React, { useEffect, useState, useContext, useCallback } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  AntDesign,
  Feather,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { list, images, deals, offers } from "../data/home";
import { SliderBox } from "react-native-image-slider-box";
import axios from "axios";
import { useToast } from "react-native-toast-notifications";
import ProductItem from "../components/ProductItem";
import DropDownPicker from "react-native-dropdown-picker";
import Header from "../components/Header";
import Seperator from "../components/Seperator";
import { useDispatch, useSelector } from "react-redux";
import { Modal, ModalContent, BottomModal } from "react-native-modals";
import { fetchAddressesApi } from "../helpers/apis";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { addAddress } from "../redux/addressReducer";

const windowWidth = Dimensions.get("window").width;

const Home = ({ navigation }) => {
  const [products, setProducts] = useState("");
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState("jewelery");
  const [modalVisible, setModalVisible] = useState(false);
  //   const { userId, setUserId } = useContext(UserType);
  const [selectedAddress, setSelectedAdress] = useState("");
  const [items, setItems] = useState([
    { label: "Men's clothing", value: "men's clothing" },
    { label: "Jewellery", value: "jewelery" },
    { label: "Electronics", value: "electronics" },
    { label: "Women's Clothing", value: "women's clothing" },
  ]);

  const toast = useToast();

  const fetchProducts = async () => {
    try {
      const res = await axios.get("https://fakestoreapi.com/products");
      setProducts(res.data);
    } catch (error) {
      toast.show("Error Fetching Products", { type: "danger" });
    }
  };

  const fetchAddress = async () => {
    const token = await AsyncStorage.getItem("authToken");
    try {
      const data = await fetchAddressesApi(token);
      const { addresses } = data;
      dispatch(addAddress(addresses));
    } catch (e) {
      toast.show(e.message, { type: "danger" });
    }
  };

  //refresh addresses
  // useFocusEffect(
  //   useCallback(() => {
  //     fetchAddress();
  //   })
  // );

  const cart = useSelector((state) => state.cart.cart); //state.(reducerName).(objectInReducer)
  const addresses = useSelector((state) => state.address.addresses);
  const defaultAddressId = useSelector((state) => state.address.defaultId);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchProducts();
    fetchAddress();
  }, []);

  const defaultAddress = addresses.find(
    (address) => address._id === defaultAddressId
  );

  return (
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps="handled"
      style={{ flex: 1, backgroundColor: "white" }}
    >
      <Header />
      <TouchableOpacity
        style={styles.address}
        onPress={() => setModalVisible(true)}
      >
        <Ionicons name="location-outline" size={20} color="black" />
        <Text
          style={{
            marginLeft: 10,
            fontSize: 14,
            fontWeight: "700",
            marginRight: 10,
          }}
        >
          Deliver to {defaultAddress?.houseNo}, {defaultAddress?.street},{" "}
          {defaultAddress?.landmark}
        </Text>
        <MaterialIcons name="keyboard-arrow-down" size={20} color="black" />
      </TouchableOpacity>
      <BottomModal
        visible={modalVisible}
        onTouchOutside={() => setModalVisible(false)}
        onHardwareBackPress={() => setModalVisible(false)}
      >
        <ModalContent>
          <View>
            <Text style={{ fontWeight: "600" }}>Choose your location</Text>
            <Text style={{ color: "#A6ACAF", marginTop: 10 }}>
              Select a delivery address to see product availability and delivery
              date
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={true}
              style={{ marginTop: 20 }}
            >
              {addresses.length > 0 &&
                addresses.map((address) => (
                  <View
                    style={[
                      styles.addressModal,
                      {
                        backgroundColor:
                          address._id === defaultAddressId
                            ? "#D7DBDD"
                            : "white",
                      },
                    ]}
                    key={address._id}
                  >
                    <Text>
                      {address.name}
                      <Ionicons name="location-sharp" size={16} color="red" />
                    </Text>
                    <Text>{address.houseNo}</Text>
                    <Text>{address.street}</Text>
                    <Text>{address.landmark}</Text>
                  </View>
                ))}
              <TouchableOpacity
                style={styles.addressModal}
                onPress={() => {
                  setModalVisible(false);
                  navigation.navigate("addAddress", { addresses });
                }}
              >
                <Text style={{ color: "#2E86C1", textAlign: "center" }}>
                  Add an address or a pickup point
                </Text>
              </TouchableOpacity>
            </ScrollView>
            <View style={{ marginTop: 10, marginBottom: 10 }}>
              <TouchableOpacity
                style={{ flexDirection: "row", paddingVertical: 5 }}
                onPress={() => {
                  setModalVisible(false);
                  navigation.navigate("addAddress", { addresses });
                }}
              >
                <Ionicons name="location-outline" size={16} color="#2E86C1" />
                <Text style={{ color: "#2E86C1", marginLeft: 10 }}>
                  Enter an Indian pincode
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ flexDirection: "row", paddingVertical: 5 }}
              >
                <Ionicons name="locate-sharp" size={16} color="#2E86C1" />
                <Text style={{ color: "#2E86C1", marginLeft: 10 }}>
                  Fetch my current location
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ flexDirection: "row", paddingVertical: 5 }}
              >
                <AntDesign name="earth" size={16} color="#2E86C1" />
                <Text style={{ color: "#2E86C1", marginLeft: 10 }}>
                  Deliver Outside India
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ModalContent>
      </BottomModal>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator
        style={{ margin: 5 }}
      >
        {list.map((item, idx) => (
          <TouchableOpacity
            id={item.id}
            style={{ padding: 10, alignItems: "center" }}
            key={idx}
          >
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={{ fontSize: 12, fontWeight: "600" }}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <SliderBox images={images} autoPlay circleLoop />
      <Text
        style={{ padding: 10, fontSize: 14, margin: 10, fontWeight: "500" }}
      >
        Trending Deals of the Week
      </Text>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          flex: 1,
        }}
      >
        {deals.map((deal) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("info", {
                info: deal,
              })
            }
            key={deal.id}
          >
            <Image
              width={windowWidth / 2}
              height={180}
              source={{ uri: deal.image }}
              resizeMode="contain"
              style={{ marginBottom: 20 }}
            />
          </TouchableOpacity>
        ))}
      </View>
      <Seperator />
      <Text
        style={{ padding: 10, fontSize: 14, margin: 10, fontWeight: "500" }}
      >
        Today's Deals
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator
        style={{ margin: 5 }}
      >
        {offers.map((offer) => (
          <TouchableOpacity
            style={{ padding: 20 }}
            onPress={() =>
              navigation.navigate("info", {
                info: offer,
              })
            }
            key={offer.id}
          >
            <Image
              source={{ uri: offer.image }}
              resizeMode="contain"
              width={120}
              height={120}
            />
            <Text style={styles.off}>{offer.offer} Off</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View
        style={{
          marginHorizontal: 10,
          marginTop: 20,
          width: "45%",
          marginBottom: open ? 50 : 15,
        }}
      >
        <DropDownPicker
          style={{
            borderColor: "#B7B7B7",
            height: 30,
            marginBottom: open ? 120 : 15,
          }}
          open={open}
          value={category} //genderValue
          items={items}
          setOpen={setOpen}
          setValue={setCategory}
          setItems={setItems}
          placeholder="Choose Category"
          placeholderStyle={styles.placeholderStyles}
          //   onOpen={onGenderOpen}
          // onChangeValue={onChange}
          zIndex={3000}
          zIndexInverse={1000}
        />
      </View>
      {products.length > 0 && (
        <TouchableOpacity
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {products
            .filter((product) => product.category === category)
            .map((product) => (
              <ProductItem product={product} />
            ))}
        </TouchableOpacity>
      )}
    </KeyboardAwareScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  address: {
    flexDirection: "row",
    backgroundColor: "#AFEEEE",
    paddingHorizontal: 15,
    paddingVertical: 8,
    alignItems: "center",
    flex: 1,
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 25,
    resizeMode: "contain",
    marginBottom: 5,
  },
  off: {
    padding: 5,
    backgroundColor: "#E74C3C",
    marginTop: 10,
    textAlign: "center",
    borderRadius: 10,
    color: "white",
    fontWeight: "500",
  },
  addressModal: {
    maxWidth: windowWidth / 3,
    minWidth: windowWidth / 3,
    borderColor: "#A6ACAF",
    borderWidth: 1,
    height: 100,
    padding: 10,
    alignItems: "center",
    marginRight: 10,
    justifyContent: "center",
  },
});
