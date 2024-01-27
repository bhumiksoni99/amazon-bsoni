import {
  StyleSheet,
  View,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";

const Header = (props) => {
  const [search, setSearch] = useState("");
  const { hide } = props;

  return (
    <View style={styles.searchContainer}>
      {!hide ? (
        <>
          <TouchableOpacity style={styles.search}>
            <AntDesign name="search1" size={22} color="#707271" />
            <TextInput
              value={search}
              placeholder="Search across categories"
              style={{ marginLeft: 10 }}
            />
          </TouchableOpacity>
          <Feather name="mic" size={24} color="black" />
        </>
      ) : (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            flex: 1,
            padding: 10,
          }}
        >
          <Image
            style={{
              width: 140,
              height: 120,
              resizeMode: "contain",
              padding: 10,
            }}
            source={{
              uri: "https://assets.stickpng.com/thumbs/580b57fcd9996e24bc43c518.png",
            }}
          />
        </View>
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  search: {
    flexDirection: "row",
    flex: 1,
    backgroundColor: "white",
    borderWidth: 1,
    padding: 10,
    borderColor: "#707271",
    borderRadius: 5,
    marginRight: 10,
  },
  searchContainer: {
    backgroundColor: "#00CED1",
    padding: 15,
    flexDirection: "row",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
