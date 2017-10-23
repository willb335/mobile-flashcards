import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { orange, white } from "../utils/colors";

export default function SubmitButton({ onPress, title, style, textStyle }) {
  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
}
