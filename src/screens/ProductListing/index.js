import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, View, SafeAreaView, ActivityIndicator, Alert } from 'react-native';
const url = 'https://my-json-server.typicode.com/benirvingplt/products/products'
import DropDown from '../../components/DropDown';
import ListItem from '../../components/listItem';


export default function ProductListing() {
    const [products, SetProducts] = useState([])
    const [cart, SetCart] = useState({})
    const [loaded, SetLoaded] = useState(false)
    const [colors, setColors] = useState([])

    React.useEffect(() => {
        fetchProducts()
    }, [])

    async function fetchProducts(color) {
        try {
            let api_url = color ? `${url}?colour=${color}` : url
            let response = await fetch(api_url)
            let products = await response.json()
            SetProducts(products)
            if (!color) {
                let colors_array = []
                products.forEach(ele => {
                    let item = {
                        value: ele.colour,
                        label: ele.colour
                    }
                    if (!colors_array.some(value => value.label === item.label)) {
                        colors_array.push(item)
                    }
                })
                setColors(colors_array)
            }
            SetLoaded(true)
        } catch (error) {
            Alert.alert(error.message)
        }
    }

    function addProduct(product) {
        let q = {
            ...cart
        }
        if (q[product.id]) {
            q[product.id].quantity = cart[product.id] ? cart[product.id]?.quantity + 1 : 1
        } else {
            q[product.id] = {
                quantity: 1,
                price: product.price
            }
        }
        SetCart(q)
    }

    function removeProduct(product, dlt) {
        let q = {
            ...cart
        }
        if (dlt) {
            q[product.id] = {
                ...cart[product.id],
                quantity: 0
            }
        } else if (q[product.id].quantity > 0) {
            q[product.id].quantity = cart[product.id]?.quantity - 1
        }

        SetCart(q)
    }

    let total = React.useMemo(function () {
        return Object.values(cart).map(i => i.price * i.quantity).reduce((a, b) => a + b, 0)
    }, [cart])


    function onChange(value) {
        fetchProducts(value)
    }

    return (
        <SafeAreaView style={styles.container}>
            {!loaded && <ActivityIndicator size="large" />}
            <DropDown
                label='Filter by color'
                data={colors}
                onChange={onChange}
                containerStyle={{ marginVertical: 30 }}
            />
            <FlatList
                data={products}
                keyExtractor={(item, _) => `product_${item.id}`}
                renderItem={({ item }) => <ListItem item={item} addProduct={addProduct} removeProduct={removeProduct} cart={cart} />}
                ListFooterComponent={() => <View style={styles.totalContainer}>
                    <Text>Total: ${total.toFixed(2)}</Text>
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
    totalContainer: { margin: 20, padding: 10, alignItems: 'center', borderTopWidth: 1, borderColor: '#ddd' }
});
