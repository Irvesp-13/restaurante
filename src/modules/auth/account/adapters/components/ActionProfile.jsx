import { StyleSheet, Text, View, FlatList } from 'react-native';
import React from 'react';
import { Divider } from '@rneui/base';
import ListAction from '../../../../../kernel/components/ListAction';

export default function ActionProfile(props) {
    const { infoUser } = props;
    const actions = [
        {
            id: 1,
            title: 'Cambiar Nombre',
            iconName: 'account-circle',
            action: () => console.log('Cambiar Nombre')
        },
        {
            id: 2,
            title: 'Cambiar Contraseña',
            iconName: 'key',
            action: () => console.log('Cambiar Contraseña')
        },
        {
            id: 3,
            title: 'Cambiar Email',
            iconName: 'at',
            action: () => console.log('Cambiar Email')
        }
    ];

    return (
        <View style={{marginVertical: 16}}>
            <FlatList
                data={actions}
                renderItem={({ item }) => (
                    <ListAction 
                        action={item.action}
                        title={item.title}
                        iconName={item.iconName}
                    />
                )}
                keyExtractor={item => item.id}
            />
        </View>
    )
}

const styles = StyleSheet.create({})