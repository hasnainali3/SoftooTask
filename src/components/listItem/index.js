import React from 'react'
import { Image, StyleSheet, Text, View } from "react-native";
import Incrementer from "../Incrementer";

export default function ListItem({ item, addProduct, removeProduct, cart }) {
    return (
        <View style={styles.listItem}>
            <Image source={{ uri: item?.img }} style={{ width: 100, backgroundColor: "#ddd" }} resizeMode='contain' />
            <View style={{ flex: 1, marginLeft: 10, padding: 5 }}>
                <Text>{item?.name}</Text>
                <Text>{item?.price}$</Text>
                <Incrementer quantity={cart[item?.id]} addProduct={() => addProduct(item)} removeProduct={(dlt) => removeProduct(item, dlt)} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    listItem: {
        flex: 1,
        flexDirection: 'row',
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 10,
        marginHorizontal: 10,
        overflow: 'hidden',
    },
    row: { flexDirection: 'row', alignItems: 'center' }
});