/* eslint-disable react-native/sort-styles */
/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import React, {  FC } from "react"
import {  View, Text, StyleSheet } from "react-native"
import { Stock } from "types/stocks/Stock"

type StockItemProps = {
    stock: Stock
}

const styles = StyleSheet.create({
    listItem: {
        height: 80,
        paddingVertical: 15,
        marginHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        borderBottomWidth: 1,
        borderBottomColor: 'grey'
    },
    listLeft: {
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    listRight: {
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    textHiglights: {
        fontWeight: 'bold',
    }
})

const StockItem: FC<StockItemProps> = ({stock}) => {
    const pnl = (stock.ltp - stock.avgPrice) * stock.quantity
    return (
        <View style={styles.listItem}>
            <View style={styles.listLeft}>
                <Text style={styles.textHiglights}>{stock.symbol}</Text>
                <Text>{stock.quantity}</Text>
            </View>
            <View style={styles.listRight}>
                <Text>LTP: &#8377;<Text style={styles.textHiglights}>{stock.ltp.toFixed(2)}</Text></Text>
                <Text>P/L: &#8377;<Text style={styles.textHiglights}>{pnl.toFixed(2)}</Text></Text>
            </View>
        </View>
    )
}

export default StockItem