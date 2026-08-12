import { useState } from "react";
import { View, Image } from 'react-native';
import { Button, Text, TextInput, SegmentedButtons } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { SignUpStackParamList } from "../navigation/SignupNavigator";

type Props = NativeStackScreenProps<SignUpStackParamList, 'SignupScreen'>;

export default function SignupScreen({ navigation }: Props) {
    const [name, setName] = useState('');
    const [photoUri, setPhotoUri] = useState<string | null>(null);
    const [gender, setGender] = useState('');

    const pickImage = async () => {
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permission.granted) {
            return;
        }
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [1,1],
            quality: 0.7,
        });
        if (!result.canceled) {
            setPhotoUri(result.assets[0].uri);
        }
    };

    return (
        <View style={{ flex: 1, padding: 16, alignItems: 'center', justifyContent: 'center'}}>
            <Text variant="headlineMedium">Dating Lanka</Text>

            <TextInput
                style={{ width: '100%', marginTop: 24 }}
                mode="outlined"
                label="Your name for other to see"
                value={name}
                onChangeText={setName}
            />

            <View style={{ width: '100%', alignItems: 'center', marginTop: 24 }}>
                {photoUri && (
                    <Image
                        source={{ uri: photoUri }}
                        style={{ width: 120, height: 120, borderRadius: 60, marginBottom: 12 }}
                    />
                )}
                <Button mode="outlined" onPress={pickImage}>
                    {photoUri ? 'Change picture' : 'Upload your picture'}
                </Button>
                <Text style={{ marginTop: 8, textAlign: 'center' }}>
                    We will use the image your provided for verification purposes
                </Text>
            </View>

            <SegmentedButtons
                style={{ width: '100%', marginTop: 24 }}
                value={gender}
                onValueChange={setGender}
                buttons={[
                    { value: 'guy', label: 'Guy'},
                    { value: 'girl', label: 'Girl'},
                ]}
            />

            <Text style={{ marginTop: 12, textAlign: 'center' }}>
                By clicking continue you agree to our terms and conditions
            </Text>

            <Button
                style={{ marginTop: 12, width: '100%' }}
                mode="contained"
                disabled={!name || !photoUri || !gender}
                onPress={()=> console.log({name, photoUri, gender})}
            >
                Continue
            </Button>
        </View>
    );
}