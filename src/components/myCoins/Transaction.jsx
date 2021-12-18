import React from 'react'

const Transaction = (props) => {
    return (
        <div>
            <div style={{
                backgroundColor: '#F8F8F9',
                borderBottom: '1px solid #EAEAEC',
                display: 'inline-block',
                width: '15%',
                textTransform: 'capitalize',
                wordWrap: 'break-word',
                padding: '10px 0px 10px 15px'
            }}>
                {props.date.substring(0,9)}
            </div>
            <div style={{
                backgroundColor: '#F8F8F9',
                borderBottom: '1px solid #EAEAEC',
                display: 'inline-block',
                width:'40%',
                textTransform: 'capitalize',
                wordWrap: 'break-word',
                padding: '10px 0px 10px 15px'
            }}>
                {props.description}
            </div>
            <div style={{
                backgroundColor: '#F8F8F9',
                borderBottom: '1px solid #EAEAEC',
                display: 'inline-block',
                width: '15%',
                textTransform: 'capitalize',
                wordWrap: 'break-word',
                padding: '10px 0px 10px 15px'
            }}>
                {props.credit}
            </div>
            <div style={{
                backgroundColor: '#F8F8F9',
                borderBottom: '1px solid #EAEAEC',
                display: 'inline-block',
                width: '15%',
                textTransform: 'capitalize',
                wordWrap: 'break-word',
                padding: '10px 0px 10px 15px'
            }}>
                {props.debit}
            </div>
            <div style={{
                backgroundColor: '#F8F8F9',
                borderBottom: '1px solid #EAEAEC',
                display: 'inline-block',
                width: '15%',
                textTransform: 'capitalize',
                wordWrap: 'break-word',
                padding: '10px 0px 10px 15px'
            }}>
                {props.balance}
            </div>
        </div>
    )
}

export default Transaction
