import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Touchable,
} from "react-native";
import React from "react";
import Header from "../components/Header";
import { Feather, FontAwesome6 } from "@expo/vector-icons";
import Address from "../components/Address";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { removeAddressApi } from "../helpers/apis";
import { useDispatch, useSelector } from "react-redux";
import { removeAddress, setAsDefault } from "../redux/addressReducer";

const AddAddressScreen = ({ navigation, route }) => {
  const addresses = useSelector((state) => state.address.addresses);
  const dispatch = useDispatch();

  const renderAddress = (address) => (
    <Address
      address={address}
      onRemoveAddress={removeAddressFunc}
      onSetAsDefault={setAsDefaultFunc}
      onEditAddress={editAddress}
    />
  );

  const editAddress = async (address) => {
    navigation.navigate("addAddressForm", address);
  };

  const setAsDefaultFunc = (address) => {
    dispatch(setAsDefault(address));
    return;
  };

  const removeAddressFunc = async (address) => {
    dispatch(removeAddress(address));
    const token = await AsyncStorage.getItem("authToken");
    try {
      const data = await removeAddressApi(token, address._id);
    } catch (e) {
      Alert.alert(e.message);
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
      <Header />
      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>Your Addresses</Text>
        <TouchableOpacity
          style={styles.newAddress}
          onPress={() => navigation.navigate("addAddressForm")}
        >
          <Text>Add new address</Text>
          <Feather name="arrow-right" size={16} color="black" />
        </TouchableOpacity>
      </View>
      {addresses.length > 0 &&
        addresses.map((address) => renderAddress(address))}
    </ScrollView>
  );
};

export default AddAddressScreen;

const styles = StyleSheet.create({
  newAddress: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
    borderTopWidth: 1,
    borderColor: "#D7DBDD",
    borderBottomWidth: 1,
    padding: 10,
  },
  button: {
    borderWidth: "1",
    borderColor: "#D7DBDD",
    padding: 10,
    marginRight: 10,
    backgroundColor: "#CACFD2",
    borderRadius: 5,
  },
});
