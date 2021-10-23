import React from 'react'
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native'

export default function Incrementer({ quantity, addProduct, removeProduct }) {
    return (
        <View style={{ marginTop: 10, alignItems: 'center' }}>
            <View style={[styles.row]}>
                <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => { removeProduct() }}
                    style={styles.decrementButton}>
                    <Text
                        style={{ marginTop: -2 }}>
                        -
                    </Text>
                </TouchableOpacity>
                <View style={styles.qty}>
                    <Text>{quantity?.quantity ?? 0}</Text>
                </View>
                <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => { addProduct() }}
                    style={styles.incrementButton}>
                    <Text>
                        +
                    </Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity activeOpacity={0.6} style={{ padding: 5 }} onPress={() => { removeProduct(true) }}>
                <Text>Remove</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    row: { flexDirection: 'row', alignItems: 'center' },
    decrementButton: {
        height: 40,
        width: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderRightWidth: 0,
        borderColor: "#ddd",
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5
    },
    incrementButton: {
        height: 40,
        width: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderColor: "#ddd",
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        marginRight: 16
    },
    qty: {
        height: 40,
        width: 40,
        borderWidth: 1,
        borderColor: "#ddd",
        justifyContent: 'center',
        alignItems: 'center',
    }
});