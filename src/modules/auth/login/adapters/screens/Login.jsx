import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Input, Button, Icon, Image } from '@rneui/themed';
import Logo from '../../../../../../assets/img/logo.png'
import { isEmpty } from 'lodash';
import Loading from '../../../../../kernel/components/Loading';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

export default function Login(props) {
    const {navigation} = props;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(true);
    const [showErrorMessage, setShowErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = getAuth();
    const login = async () => {
        if (!isEmpty(email) && !isEmpty(password)) {
            // Proceso del LogIn
            setShowErrorMessage('');
            setLoading(true);
            try {
                const user = await signInWithEmailAndPassword(auth, email, password)
                navigation.navigate('UserLogged');
            } catch (error) {
                setShowErrorMessage('Usuario o Contaseña incorrectos')
            } finally {
                setLoading(false);
            }
        } else {
            setShowErrorMessage('Campos Obligatorios')
        }
    }
    return (
        <View style={styles.container}>
            <Image
                source={Logo}
                style={styles.logo}
                resizeMode='contain'
            />
            <Input
                placeholder='example001@example.com'
                onChange={({ nativeEvent: { text } }) => setEmail(text)}
                label="Email Address *"
                labelStyle={styles.label}
                ContainerStyle={styles.input}
                keyboardType='email-address'
                rightIcon={<Icon
                    color="#ef5249"
                    type="material-community"
                    name="email"
                />}
                errorMessage={showErrorMessage}
            />
            <Input
                placeholder='********'
                onChange={({ nativeEvent: { text } }) => setPassword(text)}
                label="Password *"
                labelStyle={styles.label}
                ContainerStyle={styles.input}
                secureTextEntry={showPassword}
                rightIcon={<Icon
                    color="#ef5249"
                    type="material-community"
                    name={`${showPassword ? 'eye-outline' : 'eye-off-outline'}`}
                    onPress={() => setShowPassword(!showPassword)}
                    containerStyle={styles.btnContainer}
                />}
                errorMessage={showErrorMessage}
            />
            <Button
                title="Iniciar Sesion"
                onPress={login}
                ContainerStyle={styles.btnContainer}
                buttonStyle={styles.btnStyle}
            />
            <Loading
                isShow={loading}
                title='Iniciando sesión'
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: "center",
        alignItems: "center",
        padding: 16
    },
    logo: {
        width: 120,
        height: 120,
        marginBottom: 16
    },
    input: {
        marginVertical: 8,
        paddingHorizontal: 16
    },
    label: {
        color: '#88bf40',
        fontSize: 16
    },
    btnContainer: {
        with: '80%'
    },
    btnStyle: {
        backgroundColor: "#88bf40"
    }
});