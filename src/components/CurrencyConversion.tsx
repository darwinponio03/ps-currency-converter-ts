import React, { useEffect, useState } from 'react'
import './CurrencyConversion.css';
import { parseInput } from '../utils/parseInput';
import { fetchRates } from '../utils/api';
import {IcurrencyList } from '../utils/Interfaces';
import List from './List';
import SwapVertical from '../svg/swap-vertical.svg';
import Magnify from '../svg/magnify.svg';

const CurrencyConversion = (props: any) => {
    const [inputValue, setInputValue] = useState("");
    const [result, setResult] = useState(0);
    const [amount, setAmount] = useState(0);
    const [fromCurrency, setFromCurrency] = useState('');
    const [ToCurrency, setToCurrency] = useState('');
    const [show, setShow] = useState('');
    const [hasError, setHasError] = useState('');
    const [currencyList, setCurrencyList] = useState<IcurrencyList[]>([]);

    const detectChange = (inputValue: any) => {
        setInputValue(inputValue.target.value)
    }

    // format
    const format = (number: number) => {
        return number.toFixed(4);
    }

    // handle the switch button functionality
    const handleSwitch = () : void => {
        setAmount(result);
        setFromCurrency(ToCurrency);
        setToCurrency(fromCurrency);
        setResult(amount);
    }

    // delete specific data in the currencyList
    const deleteCurrencyList = (listToDelete: number): void => {
        setCurrencyList(currencyList.filter((listData) => {
            return listData.uuid !== listToDelete;
        }));
    }
    
    // clear previous data
    const clearAll = () : void => {
        if (currencyList) {
            setCurrencyList([]);
        }
    }

    // handle currency conversion
    const handleConversion = (rates: any, fromAmount: number, fromCurrency: string, toCurrency: string): void => {
        if (fromAmount || fromCurrency || toCurrency) {
            if (!Object.keys(rates).includes(fromCurrency?.toUpperCase())){
                setHasError(`Base ${fromCurrency?.toUpperCase()} is not supported.`);
            } else if (!Object.keys(rates).includes(toCurrency?.toUpperCase())) {
                setHasError(`Base ${toCurrency?.toUpperCase()} is not supported.`);
            } else {
                const toltalResult = format(fromAmount * rates[toCurrency?.toUpperCase()] / rates[fromCurrency?.toUpperCase()])
                setResult(Number(toltalResult));
                setShow('show');
            }
        } else {
            setHasError('Invalid input structure');
        }
    }

    useEffect(() => { 
        if (result) {
            const newList = { uuid: Math.random(), initialValue: amount, fromCurrency: fromCurrency, toCurrency: ToCurrency, resultValue: result};
            setCurrencyList([...currencyList, newList]);
        }
    }, [result]);

    // handling submit button process
    const handleSubmit = async () => {
        try {
            const { fromAmount, fromCurrency, toCurrency } = parseInput(inputValue);
            const rates = await fetchRates('USD');

            // check if the input text has a value
            if (inputValue) {
                setFromCurrency(fromCurrency?.toUpperCase());
                setToCurrency(toCurrency?.toUpperCase());
                setAmount(fromAmount);
                setHasError('');

                // check if the currency input is valid
                handleConversion(rates, fromAmount, fromCurrency, toCurrency);
            } else {
                setShow('');
                setHasError('Please input a value!');
            }
        } catch (e: any) {
            console.error(e.message);
        }
    };

    return (
        <div className='container'>
            <div className='input-form'>
                <input onChange={(e) => detectChange(e)} type='text' placeholder='e.g. 1 AUD to USD'></input>
                <span onClick={handleSubmit}> <img src={Magnify} alt="Magnify"/></span>
            </div>
            {hasError ? <p className='error-msg'>{hasError}</p> : null}
            <div className={`display-value ${show}`}>
                <div>
                    <p className='inital-value'>{amount} {fromCurrency} equals</p>
                    <p className='result'>{result} {ToCurrency}</p>
                </div>
                <span onClick={handleSwitch}> <img src={SwapVertical} alt="SwapVertical" /></span>
            </div>
            <div className={`title ${show}`}>
                <h4>Previous amounts</h4>
                <span onClick={clearAll}>Clear All</span>
            </div>
            {currencyList.map((currencyData: IcurrencyList, key: number) => {
                return <List key={key} currencyData={currencyData} deleteCurrencyList={deleteCurrencyList} />
            })}
        </div>
    );
};

export default CurrencyConversion;