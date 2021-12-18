import react from 'react'

const FAQ = (props) => {
    return(
        <div>
            <div style={{color:'black', opacity:'0.8', fontWeight:'600'}}>
                {props.dataItem.Question}
            </div>
            <div>
                {props.dataItem.Answer}
            </div>
        </div>
    )
}

export default FAQ;