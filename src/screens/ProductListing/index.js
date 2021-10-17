import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, View, SafeAreaView, Image, ActivityIndicator } from 'react-native';
import Incrementer from '../../components/Incrementer';
const url = 'https://my-json-server.typicode.com/benirvingplt/products/products'
import DropDown from '../../components/DropDown';

const colors = [
    {
        label: 'Black',
        value: 'Black',
    },
    {
        label: 'Red',
        value: 'Red',
    },
    {
        label: 'Pink',
        value: 'Pink',
    },
    {
        label: 'Stone',
        value: 'Stone'
    }
];

export default function ProductListing() {
    const [products, SetProducts] = useState([])
    const [quantity, SetQuantity] = useState({})
    const [loaded, SetLoaded] = useState(false)
    const [selectedValue, setSelectedValue] = useState();
    const [copyData, setCopyData] = useState([])

    React.useEffect(() => {
        fetchProducts()
    }, [])

    async function fetchProducts() {
        try {
            let response = await fetch(url)
            let products = await response.json()
            SetProducts(products)
            setCopyData(products)
            SetLoaded(true)
        } catch (error) {

        }
    }

    function addProduct(product) {
        let q = {
            ...quantity
        }
        if (q[product.id]) {
            q[product.id].quantity = quantity[product.id] ? quantity[product.id]?.quantity + 1 : 1
        } else {
            q[product.id] = {
                quantity: 1,
                price: product.price
            }
        }
        SetQuantity(q)
    }

    function removeProduct(product, dlt) {
        let q = {
            ...quantity
        }
        if (dlt) {
            q[product.id] = {
                ...quantity[product.id],
                quantity: 0
            }
        } else if (q[product.id].quantity > 0) {
            q[product.id].quantity = quantity[product.id]?.quantity - 1
        }

        SetQuantity(q)
    }

    let memoizedQuantity = React.useMemo(function () {
        return Object.values(quantity).map(i => i.price * i.quantity).reduce((a, b) => a + b, 0)
    }, [quantity])

    function onChange(value) {
        if (value) {
            const list = copyData.filter(p => p.colour == value);
            SetProducts(list)
        } else {
            SetProducts(copyData)
        }

    }

    return (
        <SafeAreaView style={styles.container}>
            {!loaded && <ActivityIndicator size="large" />}
            <DropDown
                label='Filter by color'
                data={colors}
                onChange={onChange}
                selectedValue={selectedValue}
                containerStyle={{ marginVertical: 30 }}
            />
            <FlatList
                data={products}
                keyExtractor={(item, _) => `product_${item.id}`}
                renderItem={({ item, index }) => (
                    <View key={index} style={styles.listItem}>
                        <Image source={{ uri: item.img }} style={{ width: 100, backgroundColor: "#ddd" }} resizeMode='contain' />
                        <View style={{ flex: 1, marginLeft: 10, padding: 5 }}>
                            <Text>{item.name}</Text>
                            <Text>{item.price}$</Text>
                            <Incrementer quantity={quantity[item.id]} addProduct={() => addProduct(item)} removeProduct={(dlt) => removeProduct(item, dlt)} />
                        </View>
                    </View>
                )}
                ListFooterComponent={() => <View style={styles.totalContainer}>
                    <Text>Total: ${memoizedQuantity.toFixed(2)}</Text>
                </View>}
                ItemSeparatorComponent={() => <View style={{ height: 10, flex: 1 }} />}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    listItem: {
        flex: 1,
        flexDirection: 'row',
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 10,
        marginHorizontal: 10,
        overflow: 'hidden',
    },
    row: { flexDirection: 'row', alignItems: 'center' },
    totalContainer: { margin: 20, padding: 10, alignItems: 'center', borderTopWidth: 1, borderColor: '#ddd' }
});
