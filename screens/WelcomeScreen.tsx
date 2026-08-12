import { useState } from 'react';
import { View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type  { SignUpStackParamList } from '../navigation/SignupNavigator';

type Props = NativeStackScreenProps<SignUpStackParamList, 'WelcomeScreen'>;

export default function WelcomeScreen({ navigation }: Props) {
    const [phoneNumber, setPhoneNumber] = useState('+94');

    return (
        <View style={{ flex: 1, padding: 16, alignItems: 'center', justifyContent: 'center'}}>
            <Text variant="headlineMedium">Dating Lanka</Text>
            <Text style={{ marginTop: 24 }}> Please verify your phone number</Text>

            <TextInput
                style={{ width: '100%', marginTop: 12 }}
                mode="outlined"
                label="Phone number"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
            />

            <Button style={{ marginTop: 12 }} onPress={() => navigation.navigate('SignupScreen')}>
                Continue
            </Button>
        </View>
    );
}