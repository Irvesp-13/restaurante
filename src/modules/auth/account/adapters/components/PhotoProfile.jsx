import { StyleSheet, Text, View } from 'react-native';
import { Avatar } from '@rneui/themed';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import { getAuth, updateProfile } from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import UsuarioPhoto from '../../../../../../assets/img/usuario.png';
import Loading from '../../../../../kernel/components/Loading';
import { useState } from 'react';

export default function PhotoProfile(props) {
    const { infoUser: { uid, photoURL, displayName, email } } = props;
    const [loading , setLoading] = useState(false);
    console.log("uid", uid);

    const uploadPhotoUrl = () => {
        const storage = getStorage();
        return getDownloadURL(ref(storage, `avatar/${uid}`)).then((url) => {
            const auth = getAuth();
            updateProfile(auth.currentUser, {
                photoURL: url
            });
        });
    };

    const uploadImage = async (uri) => {
        try {
            const response = await fetch(uri);
            const blob = await response.blob();
            const storageRef = ref(storage, `avatar/${uid}`);
            return uploadBytes(storageRef, blob);
        } catch (error) {
            console.log("error", error);
        }
    };

    const changeAvatar = async () => {
        const resultPermission = await MediaLibrary.requestPermissionsAsync();
        if (resultPermission.status === 'granted') {
            const result = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [4, 3],
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 1
            });
            if (!result.canceled) {
                setLoading(true);
                uploadImage(result.assets[0].uri)
                    .then(() => {
                        uploadPhotoUrl();
                    }).catch((error) => {
                        alert('Error al subir la imagen');
                        console.log(error);
                    }).finally(() => {
                        setLoading(false);
                    });
            }
        } else {
            alert('Es necesario aceptar los permisos de la cámara');
        }
    };

    return (
        <View style={styles.row}>
            <Avatar
                size={64}
                rounded
                source={photoURL ? { uri: photoURL } : UsuarioPhoto}
            >
                <Avatar.Accessory
                    size={24}
                    onPress={changeAvatar}
                />
            </Avatar>
            <View style={styles.column}>
                <Text style={{ fontSize: 14, fontWeight: 'bold' }}>{displayName || 'Anonimo'}</Text>
                <Text style={{ fontSize: 12 }}>{email || ''}</Text>
            </View>
            <Loading isShow={loading} title='Cambiando foto de perfil...' />
        </View>
    )
}

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
    },
    column: {
        flexDirection: "column",
        marginLeft: 16,
    },
})