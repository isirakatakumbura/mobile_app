import { useState } from 'react';
import { View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { getAuth, signInWithPhoneNumber, type ConfirmationResult } from '@react-native-firebase/auth';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type  { SignUpStackParamList } from '../navigation/SignupNavigator';

type Props = NativeStackScreenProps<SignUpStackParamList, 'WelcomeScreen'>;

export default function WelcomeScreen({ navigation }: Props) {
    const [phoneNumber, setPhoneNumber] = useState('+94');
    const [ code, setCode ] = useState('');
    const auth = getAuth();
    const [ confirmation, setConfirmation ] = useState<ConfirmationResult | null>(null);
    const [ submitting, setSubmitting ] = useState(false);
    const [ error, setError ] = useState('');

    const sendCode = async () => {
        setSubmitting(true);
        setError('');
        try {
            const result = await signInWithPhoneNumber(auth, phoneNumber);
            setConfirmation(result);
        } catch (e: any) {
            setError(e.message);
        } finally {
            setSubmitting(false);
        }
    };

    const confirmCode = async () => {
        if (!confirmation) return;
        setSubmitting(true);
        setError('');
        try {
            await confirmation.confirm(code);
            navigation.navigate('SignupScreen');
        } catch (e: any) {
            setError('Invalid code, try again');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <View style={{ flex: 1, padding: 16, alignItems: 'center', justifyContent: 'center'}}>
            <Text variant="headlineMedium">Dating Lanka</Text>
            
            {!confirmation ? (
                <>
                    <Text style ={{ marginTop: 24 }}> Please verify your phone number</Text>
                    <TextInput
                        style={{ width: '100%', marginTop: 12 }}
                        mode="outlined"
                        label="Phone number"
                        value={phoneNumber}
                        onChangeText={setPhoneNumber}
                        keyboardType="phone-pad"
                    />

                    <Button style={{ marginTop: 12 }} loading={submitting} disabled={submitting} onPress={sendCode}>
                        Send Code
                    </Button>
                </>
            ) : (
                <>
                    <Text style={{ marginTop: 24 }}>Enter the code we texted you</Text>
                    <TextInput
                        style={{ width: '100%', marginTop: 12 }}
                        mode="outlined"
                        label="Verification code"
                        value={code}
                        onChangeText={setCode}
                        keyboardType="number-pad"
                    />
                    <Button style={{ marginTop: 12 }} loading={submitting} disabled={submitting} onPress={confirmCode}>
                        Confirm
                    </Button>
                </>
            )}

            {!!error && <Text style={{marginTop: 12, color: 'red'}}>{error}</Text>}
        </View>
    );
}