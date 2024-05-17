/* eslint-disable react-native/sort-styles */
/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import { create } from "apisauce"
import React, { useState, useEffect } from "react"
import {  FlatList, StyleSheet, View, Text, StatusBar, ActivityIndicator } from "react-native"
import { Stock, StockResponse, StocksSummary } from "types/stocks/Stock"
import StocksSummaryView from "./StockSummaryView"
import StockItem from "./StockItem"

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#841581',
        height: 60,
        justifyContent: 'center',
        padding: 10
    },
    title: {
        fontSize: 20,
        color: 'white'
    },
    flatListWrapper: {
        height: 320, 
        backgroundColor: 'white'
    }
})

const api = create({
    baseURL: 'https://35dee773a9ec441e9f38d5fc249406ce.api.mockbin.io/',
    headers: { 
        Accept: 'application/json',
        "Content-Type": 'application/json'
     },
  })

const HomeScreen = () => {
    const [stocks, setStocks] = useState<Stock[]>([])
    const [summary, setSummary] = useState<StocksSummary>();

    useEffect(() => {
        const res: StocksSummary = {
            pnl:0,
            currentPnl: 0,
            investement: 0,
            currentValue: 0,
        }
        stocks.forEach(stock => {
            const {quantity, ltp, close, avgPrice} = stock;
            res.currentValue += ltp * quantity
            res.investement += avgPrice*quantity 
            res.pnl += (ltp - avgPrice) * quantity
            res.currentPnl += (close - ltp) * quantity
        })
        setSummary(res)
    }, [stocks])

    useEffect(() => {
        api.get<StockResponse>('/')
        .then((res) => {
            const {ok, data} = res
            if (ok && data != null) {
                // console.log(data)
                setStocks(data.data.userHolding)
            }
        } )
    }, [])

    return (
        <View style={{flex: 1, backgroundColor: 'grey'}}>
            <StatusBar barStyle={'light-content'}/>
            <View style={styles.header}>
                <Text style={styles.title}>{'Upstox Holding'}</Text>
            </View>
            <View style={styles.flatListWrapper}>
            {
                stocks.length > 0 ? (
                    <FlatList
                        data={stocks}
                        renderItem={({item}) => <StockItem stock={item}/>}
                        keyExtractor={(_, id) => `${id}`}
                    />
                ): (
                    <View style={{flexGrow: 1, justifyContent: 'center'}}>
                        <ActivityIndicator animating={true} color={'blue'} />
                    </View>
                )
            }
            </View>
            <StocksSummaryView summary={summary}/>
        </View>
    )
}

export default HomeScreen;