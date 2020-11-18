import {useState} from 'react'

export default function DoubleSwitch({value=null , onChange}) {
   
    const [isSuccess , setIsSuccess] = useState(value)
  
    const stateHandler = (state)=>{
        switch(state){
            case true : return 'check--success'
            case false : return 'check--danger'
            case null : return 'check--null'
        }
    }

    const clickHandler = ()=>{
        if(isSuccess === null ) {
            setIsSuccess(true)
            onChange(true)
        }else if(isSuccess ===true){
            setIsSuccess(false)
            onChange(false)
        }else{
            setIsSuccess(null)
            onChange(null)
        }
        
    }
    return (
        <div  onClick={clickHandler} className={`check ${stateHandler(isSuccess)}`} >
            <span >{isSuccess ? 'ناجح' : 'مكمل'}</span>
        </div>
    )
}
