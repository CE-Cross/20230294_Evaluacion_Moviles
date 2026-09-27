import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, database } from "./firebase";

export const registerUser = async (email, password, nombreCompleto, fechaNacimiento, carnetInstitucional, urlImagen) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);

        const user = userCredential.user;

        await setDoc(doc(database, "usuarios", user.uid),
            {
                nombreCompleto: nombreCompleto,
                fechaNacimiento: fechaNacimiento,
                carnetInstitucional: carnetInstitucional,
                urlImagen: urlImagen
            }
        );

        console.log("Usuario registrado:", user.uid);

        return user;
    } catch (error) {
        console.error("Error al registrarse:", error.message);
        throw error;
    }
};