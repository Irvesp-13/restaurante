import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Overlay } from '@rneui/base';

export default function Loading(props) {
    const {isShow, title} = props;
    return (
        <Overlay
            isVisible={isShow}
            windowsBackgroundColor='rgb(0,0,0,0.5)'
            overlayBackgroundColor='transparent'
            overlayStyle={styles.overlay}
        >
            <View style = {styles.container}>
                <ActivityIndicator 
                    size = 'large'
                    color = '#88bf40'
                />
                <Text style = {styles.title}>{title}</Text>
            </View>
        </Overlay>
    )
}

const styles = StyleSheet.create({
    overlay: {
        height: 160,
        width: 250,
        backgroundColor: '#fff',
        borderColor: '#88bf40',
        borderWidth: 2,
        borderRadius: 10,
        justifyContent: 'center',
        alignContent: 'center'
    },
    contaainer: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center'
    },
    title: {
        color: 'gray',
        textTransform: 'uppercase',
        marginTop: 16,
        textAlign: 'center'
    }
})