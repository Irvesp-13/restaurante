import { StyleSheet, Text, View, Image, Alert } from 'react-native'
import { Button, Avatar } from '@rneui/themed';
import React, { useState, useEffect } from 'react'
import { getAuth, signOut, updateProfile } from 'firebase/auth';
import { update } from 'lodash';
import PhotoProfile from '../components/PhotoProfile';
import ActionProfile from '../components/ActionProfile';

export default function Profile() {
    const auth = getAuth();
    const user = auth.currentUser;
    const [userProfile, setUserProfile] = useState(null);
    useEffect(() => {
        if (user !== null) {
            user.providerData.forEach((profile) => {
                setUserProfile(profile);
            });
        }
    }, []);

    const updateProfileData = () => {
        console.log('Actualizar Perfil');
        updateProfile(auth.currentUser, {
            displayName: "Irving Uriel Espinosa Hernandez", photoURL: "https://firebasestorage.googleapis.com/v0/b/restaurante5tob-785d9.appspot.com/o/avatar%2FqyiqsHX5RqNrkMfxhOU7xymY4Mg2.png?alt=media&token=582ec126-76e9-405b-8d2b-66dcc62cf606"
        }).then(() => {
            console.log('Perfil actualizado');
        }).catch((error) => {
            console.log("error al actualizar perfil", error);
        });
    };

    const handleLogout = async () => {
        try {
            Alert.alert(
                "Cerrar sesión",
                "¿Estás seguro de que quieres cerrar sesión?",
                [
                    {
                        text: "Cancelar",
                        style: "cancel"
                    },
                    {
                        text: "Aceptar",
                        onPress: async () => {
                            const user = await signOut(auth);
                            navigation.navigate("Restaurants");
                        }
                    }
                ]
            );
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View style={styles.container}>
            { userProfile && <PhotoProfile infoUser={userProfile} /> }
            { userProfile && <ActionProfile infoUser={userProfile} /> }
            <Button style={styles.boton}
                color={'red'}
                title="Cerrar sesión" 
                onPress={handleLogout} 
                containerStyle={{ width: "100%" }}
            />
            <Button style={styles.boton}
                color={'green'}
                title="Actualizar perfil"
                onPress={updateProfileData()} 
                containerStyle={{ width: "0%" }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 16,
    },
    logo: {
        width: 120,
        height: 120,
        marginBottom: 16,
    },
    label: {
        color: "#88c040",
        fontSize: 16,
        marginBottom: 8,
    }
})