import { Pressable, StyleSheet, View } from "react-native";
import { Ionicons, ionicons } from "@expo/vector-icons";

function IconButton({ icon, size, color, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View styles={styles.ButtonContainer}>
        <Ionicons name={icon} size={size} color={color} />
      </View>
    </Pressable>
  );
}
export default IconButton;

const styles = StyleSheet.create({
  ButtonContainer: {
    borderRadius: 24,
    padding: 6,
    margin: 8,
  },
  pressed: {
    opacity: 0.75,
  },
});
