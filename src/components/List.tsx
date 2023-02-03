import React from 'react'
import './List.css';
import { IcurrencyList } from '../utils/Interfaces';

interface Props {
    currencyData: IcurrencyList;
    deleteCurrencyList(listToDelete: number): void;
}

const List = ({ currencyData, deleteCurrencyList }: Props) => {
    return (
        <div>
            <div className='panel'>
                <div>
                    <p className='prev-initial-value'>{currencyData.initialValue} {currencyData.fromCurrency} equals</p>
                    <p className='prev-result'>{currencyData.resultValue} {currencyData.toCurrency}</p>
                </div>
                <div>
                    <a href="/#" onClick={() => {
                        deleteCurrencyList(currencyData.uuid);
                    }}>Close</a>
                </div>
            </div>
        </div>
    );
};

export default List;

