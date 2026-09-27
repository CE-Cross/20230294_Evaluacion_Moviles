import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";

export const loginUser = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);

        const user = userCredential.user;

        console.log("Sesión iniciada para:", user.email);

        return user;
    } catch (error) {
        console.error("Error de inicio de sesión:", error.message);
        throw error;
    }
};