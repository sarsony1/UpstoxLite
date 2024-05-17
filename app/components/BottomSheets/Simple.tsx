/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/sort-styles */
import React, { FC, PropsWithChildren } from 'react'
import { Dimensions, StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign';

const {height} = Dimensions.get('window');

const styles = StyleSheet.create({
    sheetContainer: {
        height,
        width: '100%',
        position: 'absolute',
        borderTopStartRadius: 15,
        borderTopEndRadius:15,
        backgroundColor: 'white'
    },
    handle: {
        alignItems: 'center',
        marginTop: 4,
        padding: 4,
    }
})

type SimpleBottomSheetProps = {
    onChangeState: () => void
    isOpen: boolean // open -> true
    isVisible?: boolean
}

const SimpleBottomSheet: FC<PropsWithChildren<SimpleBottomSheetProps>> = ({isOpen, onChangeState, children, isVisible = true}) => {
    if(!isVisible) return null
    const top = isOpen ? 0.6 * height : 0.8*height
    const sheetHeight = height - top - (StatusBar.currentHeight || 0)

    return (
        <View style={[styles.sheetContainer, {top}]}>
            <View style={{height: sheetHeight}}>
            <TouchableOpacity style={styles.handle} onPress={onChangeState}>
                <AntDesign name={isOpen ? 'caretdown': 'caretup'} size={24} color="black" />
            </TouchableOpacity>
             {children}
            </View>
        </View>
    )
}

export default SimpleBottomSheet