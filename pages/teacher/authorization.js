import {useEffect , useState} from 'react'
import axios from 'axios'
import UserItem from '../../assets/components/UserItem'
import Text from '../../assets/components/Text'

import {useGetToken} from '../../assets/hooks/tokenController'
import constants from '../../assets/utils/variables'
import Nav from '../../assets/components/Nav'

export default function authorization() {
    const [isLoading , setIsLoading] = useState(true)
    const [teachers , setTeachers] = useState([])
    useEffect(()=>{
        axios.get(`${constants.URL}/api/users` , {
            headers:{
                authorization : useGetToken()   
            }
        }).then(res=>{
            if(res.data.status == 'fail' && res.data.message == 'AUTHORIZATION_REJECTED')
               return setIsLoading(null)
            console.log(res.data)
            setTeachers(res.data.data)
            setIsLoading(false)
        } )
    } , [])

    const changeHandler = (value , id )=>{
        axios.patch(`${constants.URL}/authenticate/${id}` ,{
            isAdmin : value
        } ,  {
            headers:{
                authorization : useGetToken()   
            }
        }).then(res=>{
            // setTeachers(res.data.data)
            // setIsLoading(false)
        } )
    }

    // console.log(teachers)
    return (
        <div >
            <Nav/>
            <CondRenderer isLoading={isLoading} teachers={teachers} />
          
        </div>
    )
}

const CondRenderer = ({isLoading  , teachers })=>{
switch(isLoading){
        case true : return  <div className="center">
        <Text fontSize={1.6}>...جار التحميل</Text>
      </div> ; 
      case null : return  <div className="center">
      <Text fontSize={1.6}>T_T...ليس لديك الصلاحيات</Text>
    </div> ;  
    default: return  teachers.map((data , index )=>(
        <UserItem
        key={index}
        name={data.name}
        pv={1}
        isSuccess={data.isAdmin}
        onChange={value=>changeHandler(value , data._id)}
   /> 
        
    ))
    }
}