import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignUpNavigator from "./SignupNavigator";
import HomeNavigator from "./HomeNavigator";

const Stack = createNativeStackNavigator();

export default function PrimaryNavigator() {
    const isSignedOut = true; // Because no database added to the app

    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            { isSignedOut ? (
                <Stack.Screen name="SignUpNavigator" component={SignUpNavigator} />
            ) : (
                <Stack.Screen name="HomeNavigator" component={HomeNavigator} />
            )}
        </Stack.Navigator>
    );
}