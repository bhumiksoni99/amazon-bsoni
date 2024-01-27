import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Touchable,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserType } from "./UserContext";
import { useToast } from "react-native-toast-notifications";
import { addAddressApi, editAddressApi } from "../helpers/apis";
import { useDispatch } from "react-redux";
import { addAddress } from "../redux/addressReducer";

const AddressForm = ({ navigation, route }) => {
  const currAddress = route.params;
  const [name, setName] = useState(currAddress?.name);
  const [mobileNo, setMobile] = useState(currAddress?.mobileNo);
  const [houseNo, setFlat] = useState(currAddress?.houseNo);
  const [street, setArea] = useState(currAddress?.street);
  const [landmark, setLandmark] = useState(currAddress?.landmark);
  const [postalCode, setPostal] = useState(currAddress?.postalCode);
  const dispatch = useDispatch();

  const toast = useToast();

  const handleAddAddress = async () => {
    const address = { name, mobileNo, houseNo, postalCode, landmark, street };
    const token = await AsyncStorage.getItem("authToken");

    try {
      let data;
      if (currAddress) {
        address._id = currAddress._id;
        data = await editAddressApi(token, address);
      } else {
        data = await addAddressApi(token, address);
      }
      dispatch(addAddress(data.addresses));
      toast.show(data.message);
      navigation.pop(2);
    } catch (e) {
      toast.show(e.message, { type: "danger" });
    }
  };

  return (
    <KeyboardAwareScrollView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ height: 50, backgroundColor: "#00CED1" }} />
      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>
          Add a new Address
        </Text>
        <TextInput
          placeholder="India"
          placeholderTextColor={"black"}
          style={styles.input}
        />
        <Text style={styles.ques}>Full Name</Text>
        <TextInput
          placeholder="Enter your name"
          value={name}
          style={styles.input}
          onChangeText={(text) => setName(text)}
        />
        <Text style={styles.ques}>Mobile Number</Text>
        <TextInput
          placeholder="Enter your mobile number"
          style={styles.input}
          value={mobileNo}
          inputMode="numeric"
          onChangeText={(text) => setMobile(text)}
        />
        <Text style={styles.ques}>Flat,Building,House</Text>
        <TextInput
          placeholder="Enter your Flat,Building,House"
          style={styles.input}
          value={houseNo}
          onChangeText={(text) => setFlat(text)}
        />
        <Text style={styles.ques}>Area,Street,sector</Text>
        <TextInput
          placeholder="Enter your Area,Street,sector"
          style={styles.input}
          value={street}
          onChangeText={(text) => setArea(text)}
        />
        <Text style={styles.ques}>Landmark</Text>
        <TextInput
          placeholder="Eg. maharaja agarsen"
          style={styles.input}
          value={landmark}
          onChangeText={(text) => setLandmark(text)}
        />
        <Text style={styles.ques}>Postal Code</Text>
        <TextInput
          placeholder="Eg 110052"
          style={styles.input}
          value={postalCode}
          inputMode="numeric"
          onChangeText={(text) => setPostal(text)}
        />
        <TouchableOpacity
          style={{
            padding: 10,
            backgroundColor: "#F1C40F",
            marginTop: 10,
            borderRadius: 10,
          }}
          onPress={() => handleAddAddress()}
        >
          <Text style={{ textAlign: "center" }}>Add Address</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default AddressForm;

const styles = StyleSheet.create({
  input: {
    borderColor: "#CACFD2",
    borderWidth: 1,
    marginVertical: 10,
    padding: 10,
    borderRadius: 5,
  },
  ques: {
    fontWeight: "bold",
    fontSize: 14,
  },
});
