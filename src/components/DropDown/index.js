import React from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import RNPickerSelect from 'react-native-picker-select'
import { Ionicons } from '@expo/vector-icons'


const DropDown = (props) => {
    const placeholderObj = {
        label: props.placeholder ?? 'Show All',
        value: null,
        color: '#000',
    }

    const {
        data = [],
        onChange = () => { },
        selectedValue = '',
        disabled = false,
        label = '',
        containerStyle = {},
    } = props

    const { root, labelStyle } = styles

    return (
        <View style={[root, containerStyle]}>
            <Text style={labelStyle}>{label}</Text>
            <RNPickerSelect
                placeholder={placeholderObj}
                value={selectedValue}
                onValueChange={(value) => onChange(value)}
                items={data}
                Icon={() => {
                    return (
                        <Ionicons
                            name='arrow-down'
                            size={24}
                            color='#2F2E41'
                        />
                    )
                }}
                useNativeAndroidPickerStyle={false}
                style={{ ...pickerStyles }}
                disabled={disabled}
                pickerProps={{ mode: 'dropdown' }}
                touchableWrapperProps={{ activeOpacity: 0.3 }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        height: 55,
        paddingLeft: 15,
        paddingHorizontal: 12,
    },
    labelStyle: {
        color: '#000',
        fontWeight: 'bold',
        paddingVertical: 5
    }
})

const pickerStyles = StyleSheet.create({
    inputIOS: {
        height: 55,
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
        shadowOpacity: 0,
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 1,
    },
    inputAndroid: {
        height: 55,
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: '#ddd',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
        shadowOpacity: 0,
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 1,
    },
    iconContainer: {
        top: 15,
        right: 12,
    },
})

export default DropDown
