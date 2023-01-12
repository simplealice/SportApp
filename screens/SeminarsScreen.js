import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import * as React from 'react';

export default function SeminarsScreen() {


    return (
        <View style={styles.container}>
            <Text>HELLO FROM SEMINARS</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },

})