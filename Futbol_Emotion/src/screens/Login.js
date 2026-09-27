import React, { useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";

import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";

import { loginUser } from "../config/authLoginFirebase";

const Login = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert("Campos incompletos", "Ingrese su correo y contraseña.");

            return;
        }

        try {
            setLoading(true);

            await loginUser(email, password);

            navigation.replace("Profile");
        } catch (error) {
            let message = "No se pudo iniciar sesión.";

            switch (error.code) {

                case "auth/invalid-credential":
                    message = "El correo o la contraseña son incorrectos.";
                    break;

                case "auth/user-not-found":
                    message = "No existe un usuario con este correo.";
                    break;

                case "auth/wrong-password":
                    message = "La contraseña es incorrecta.";
                    break;

                case "auth/invalid-email":
                    message = "El correo electrónico no es válido.";
                    break;
            }

            Alert.alert("Error", message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>

            <Text style={styles.title}>Iniciar sesión</Text>

            <CustomInput
                placeholder="Correo electrónico"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <CustomInput
                placeholder="Contraseña"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <CustomButton
                title={loading ? "Iniciando sesión..." : "Iniciar sesión"}
                onPress={handleLogin}
                disabled={loading}
            />

            <Text
                style={styles.link}
                onPress={() =>
                    navigation.navigate("Register")
                }
            >
                ¿No tiene una cuenta? Regístrese
            </Text>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 20
    },

    title: {
        fontSize: 28,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 30
    },

    link: {
        textAlign: "center",
        color: "#00C0C7"
    }
});

export default Login;