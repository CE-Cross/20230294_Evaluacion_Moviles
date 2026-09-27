import React from "react";
import { TextInput, StyleSheet } from "react-native";

const CustomInput = ({ placeholder, value, onChangeText, secureTextEntry = false, keyboardType = "default", autoCapitalize = "sentences" }) => {

    return (
        <TextInput
            style={styles.input}
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
            autoCapitalize={autoCapitalize}
        />
    );
};

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: "#00FF15",
        borderRadius: 8,
        padding: 12,
        marginBottom: 15
    }
});

export default CustomInput;