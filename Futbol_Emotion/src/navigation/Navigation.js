import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import Login from "../screens/Login";
import Register from "../screens/Register";
import Profile from "../screens/Profile";

const Stack = createNativeStackNavigator();

const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen
                    name="Login"
                    component={Login}
                    options={{
                        title: "Iniciar sesión"
                    }}
                />

                <Stack.Screen
                    name="Register"
                    component={Register}
                    options={{
                        title: "Registro"
                    }}
                />

                <Stack.Screen
                    name="Profile"
                    component={Profile}
                    options={{
                        title: "Perfil"
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;