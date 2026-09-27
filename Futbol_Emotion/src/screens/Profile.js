import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert, Image } from "react-native";
import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

import { auth, database } from "../config/firebase";

import CustomButton from "../components/CustomButton";

const Profile = ({ navigation }) => {
    const [usuario, setUsuario] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const obtenerPerfil = async () => {
            try {
                const user = auth.currentUser;

                if (!user) {
                    navigation.replace("Login");
                    return;
                }

                const referencia = doc(database, "usuarios", user.uid);

                const documento = await getDoc(referencia);

                if (documento.exists()) {
                    setUsuario(documento.data());
                } else {
                    Alert.alert("Aviso", "No se encontró el perfil.");
                }

            } catch (error) {
                console.error(error);

                Alert.alert("Error", "No se pudo cargar el perfil.");
            } finally {
                setLoading(false);
            }
        };

        obtenerPerfil();

    }, []);

    const handleLogout = async () => {
        try {
            await signOut(auth);

            navigation.replace("Login");
        } catch (error) {
            Alert.alert("Error", "No se pudo cerrar la sesión.");
        }
    };

    if (loading) {
        return (
            <View style={styles.center}>
                <Text>Cargando perfil...</Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>

            <Text style={styles.title}>Mi perfil</Text>

            {usuario?.urlImagen ? (
                <Image
                    source={{
                        uri: usuario.urlImagen
                    }}
                    style={styles.image}
                />
            ) : null}

            <View style={styles.card}>
                <Text style={styles.label}>Nombre completo</Text>

                <Text style={styles.value}>{usuario?.nombreCompleto}</Text>

                <Text style={styles.label}>Fecha de nacimiento</Text>

                <Text style={styles.value}>{usuario?.fechaNacimiento}</Text>

                <Text style={styles.label}>Carnet institucional</Text>

                <Text style={styles.value}>{usuario?.carnetInstitucional}</Text>

                <Text style={styles.label}>Correo electrónico</Text>

                <Text style={styles.value}>{auth.currentUser?.email}</Text>
            </View>

            <CustomButton
                title="Cerrar sesión"
                onPress={handleLogout}
                color="#00FF15"
            />

        </View>
    );
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        padding: 20,
        justifyContent: "center"
    },

    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },

    title: {
        fontSize: 28,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20
    },

    image: {
        width: 120,
        height: 120,
        borderRadius: 60,
        alignSelf: "center",
        marginBottom: 20
    },

    card: {
        borderWidth: 1,
        borderColor: "#00FF15",
        borderRadius: 10,
        padding: 20,
        marginBottom: 20
    },

    label: {
        fontWeight: "bold",
        marginTop: 8
    },

    value: {
        marginTop: 5,
        marginBottom: 8
    }

});

export default Profile;