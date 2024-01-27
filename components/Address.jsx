import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { Feather, FontAwesome6, AntDesign } from "@expo/vector-icons";

const Address = (props) => {
  const {
    address,
    selectedAddress,
    onRemoveAddress,
    onSetAsDefault,
    onSelectAddress,
    onEditAddress,
  } = props;

  const defaultId = useSelector((state) => state.address.defaultId);

  return (
    <View
      style={{
        padding: 15,
        flex: 1,
        marginHorizontal: 10,
        borderColor: "#D7DBDD",
        borderWidth: 1,
        marginVertical: 5,
      }}
      key={address._id}
    >
      {address._id === defaultId && (
        <View style={{ flexDirection: "row", marginBottom: 10 }}>
          <AntDesign name="checkcircle" size={20} color="green" />
          <Text style={{ marginLeft: 10 }}>Set As Default Address</Text>
        </View>
      )}
      <View style={{ flexDirection: "row" }}>
        <Text style={{ fontWeight: "bold", marginRight: 5, fontSize: 16 }}>
          {address.name}
        </Text>
        <FontAwesome6 name="location-dot" size={16} color="red" />
      </View>
      <Text>{address.houseNo}</Text>
      <Text>{address.street}</Text>
      <Text>Mobile : {address.mobileNo}</Text>
      <Text>Postal Code : {address.postalCode}</Text>
      {!onSelectAddress && (
        <View style={{ flexDirection: "row", marginTop: 10 }}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => onEditAddress(address)}
          >
            <Text>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => onRemoveAddress(address)}
          >
            <Text>Remove</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => onSetAsDefault(address)}
          >
            <Text>Set as Default</Text>
          </TouchableOpacity>
        </View>
      )}
      {selectedAddress && (
        <TouchableOpacity
          style={{
            padding: 10,
            backgroundColor: "#008397",
            marginTop: 20,
            marginHorizontal: 20,
            borderRadius: 20,
          }}
          onPress={() => onSelectAddress()}
        >
          <Text style={{ textAlign: "center", color: "white" }}>
            Deliver To This Address
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Address;

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderColor: "#D7DBDD",
    padding: 10,
    marginRight: 10,
    backgroundColor: "#CACFD2",
    borderRadius: 5,
  },
});
