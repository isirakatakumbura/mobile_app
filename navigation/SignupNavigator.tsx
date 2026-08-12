import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import SignupScreen from '../screens/SignupScreen';

export type SignUpStackParamList = {
    WelcomeScreen: undefined;
    SignupScreen: undefined;
};

const Stack = createNativeStackNavigator<SignUpStackParamList>();

export default function SignUpNavigator() {
    return (
        <Stack.Navigator initialRouteName = "WelcomeScreen">
            <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
            <Stack.Screen name="SignupScreen" component={SignupScreen} />
        </Stack.Navigator>
    );
}