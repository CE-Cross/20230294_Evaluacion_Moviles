import React, { useState } from "react";
import { ScrollView, Text, StyleSheet, Alert } from "react-native";

import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";

import { registerUser } from "../config/authRegisterFirebase";

const Register = ({ navigation }) => {
    const [nombreCompleto, setNombreCompleto] = useState("");
    const [fechaNacimiento, setFechaNacimiento] = useState("");
    const [carnetInstitucional, setCarnetInstitucional] = useState("");
    const [urlImagen, setUrlImagen] = useState("");

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const handleRegister = async () => {
        if (
            !nombreCompleto ||
            !fechaNacimiento ||
            !carnetInstitucional ||
            !urlImagen ||
            !email ||
            !password ||
            !confirmPassword
        ) {
            Alert.alert("Campos incompletos", "Todos los campos son obligatorios.");

            return;
        }

        if (password !== confirmPassword) {
            Alert.alert("Error", "Las contraseñas no coinciden.");

            return;
        }
        try {
            setLoading(true);

            await registerUser(
                email,
                password,
                nombreCompleto,
                fechaNacimiento,
                carnetInstitucional,
                urlImagen
            );

            Alert.alert("Registro exitoso", "La cuenta se creó correctamente.",
                [
                    {
                        text: "Continuar",
                        onPress: () =>
                            navigation.replace("Profile")
                    }
                ]
            );
        } catch (error) {
            let message = "No se pudo crear la cuenta.";

            switch (error.code) {

                case "auth/email-already-in-use":
                    message = "El correo electrónico ya está registrado.";
                    break;

                case "auth/invalid-email":
                    message = "El correo electrónico no es válido.";
                    break;

                case "auth/weak-password":
                    message = "La contraseña debe tener al menos 6 caracteres.";
                    break;
            }

            Alert.alert("Error", message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>

            <Text style={styles.title}>Crear cuenta</Text>

            <CustomInput
                placeholder="Nombre completo"
                value={nombreCompleto}
                onChangeText={setNombreCompleto}
            />

            <CustomInput
                placeholder="Fecha de nacimiento (DD/MM/AAAA)"
                value={fechaNacimiento}
                onChangeText={setFechaNacimiento}
            />

            <CustomInput
                placeholder="Carnet institucional"
                value={carnetInstitucional}
                onChangeText={setCarnetInstitucional}
            />

            <CustomInput
                placeholder="URL de imagen"
                value={urlImagen}
                onChangeText={setUrlImagen}
                autoCapitalize="none"
            />

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

            <CustomInput
                placeholder="Confirmar contraseña"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
            />

            <CustomButton
                title={loading ? "Registrando..." : "Registrarse"}
                onPress={handleRegister}
                disabled={loading}
                color="#00C0C7"
            />

            <Text
                style={styles.link}
                onPress={() =>
                    navigation.navigate("Login")
                }
            >
                ¿Ya tiene una cuenta? Inicie sesión
            </Text>

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
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
        color: "#00C0C7",
        marginBottom: 20
    }
});

export default Register;