/* eslint-disable react-native/sort-styles */
/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import SimpleBottomSheet from "app/components/BottomSheets/Simple"
import React, { useState, FC } from "react"
import {  View, Text, StyleSheet } from "react-native"
import { StocksSummary } from "types/stocks/Stock"

const styles = StyleSheet.create({
    summary: {
        // justifyContent: 'space-between',
        flex: 1,
        padding: 10,
    },
    summaryTop: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'stretch',
    },
    summaryBottom: {
        justifyContent: 'space-between',
        alignItems: 'stretch',
    },
    summaryItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
    },
    textHiglights: {
        fontWeight: 'bold',
    }
})

type StockSummaryProps = {
    summary?: StocksSummary
}

const StocksSummaryView: FC<StockSummaryProps> = ({summary}) => {
    if(summary === undefined) {
        return null
    }
    const {currentValue, investement, currentPnl, pnl} = summary
    const [open, setOpen] = useState(false);

    return (
        <SimpleBottomSheet isOpen={open} onChangeState={() => {
            setOpen(open => !open)
        }}>
            <View style={[styles.summary, {justifyContent: open ? 'space-between': 'flex-end'}]}>
            {
                open && (
                    <View style={styles.summaryTop}>
                        <View style={styles.summaryItem}>
                            <Text style={styles.textHiglights}>Current Value:</Text>
                            <Text>&#8377;{currentValue.toFixed(2)}</Text>
                        </View>
                        <View style={styles.summaryItem}>
                            <Text style={styles.textHiglights}>Total Investment:</Text>
                            <Text>&#8377;{investement.toFixed(2)}</Text>
                        </View>
                        <View style={styles.summaryItem}>
                            <Text style={styles.textHiglights}>Today's Profit & Loss:</Text>
                            <Text>&#8377;{currentPnl.toFixed(2)}</Text>
                        </View>
                    </View>
                )
            }
            <View style={styles.summaryBottom}>
                <View style={styles.summaryItem}>
                    <Text style={styles.textHiglights}>Profit & Loss:</Text>
                    <Text>&#8377;{pnl.toFixed(2)}</Text>
                </View>
            </View>
        </View>
        </SimpleBottomSheet>
    )
}

export default StocksSummaryView