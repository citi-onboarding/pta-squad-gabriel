import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

export default function HeaderMobile() {
  return (
    <View style={styles.headerContainer}>
      <Image
        source={require("./../../../src/assets/logoCITi.png")}
        style={styles.logo}
      />
      <Text style={styles.title}>Meus empréstimos</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "#FFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 24,
  },
  logo: {
    width: 60,
    height: 40,
    resizeMode: "contain",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1F2937",
  },
});
