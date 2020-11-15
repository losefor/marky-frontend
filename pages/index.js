import { useRouter } from "next/router";
import { faUserTie, faUser } from "@fortawesome/free-solid-svg-icons";
import {useGetToken} from '../assets/hooks/tokenController'

import Avatar from "../assets/components/Avatar";
import View from "../assets/components/View";
import Text from "../assets/components/Text";

export default function index() {
  const router = useRouter();

  return (
    <div className="index">
      <View mv={1} mh={1} onClick={()=>{router.push('/student/score')}}>
        <Avatar icon={faUser} radius={22} />
        <Text textAlign="center" fontSize={1.6}>
          طالـب
        </Text>
      </View>

      <View mv={1} mh={1}  onClick={()=>{ 
        const token = useGetToken()

        if(token  ) router.push('./teacher/dashboard')
        else router.push('./teacher/signup')

      
      
      }}>
            <Avatar radius={22} icon={faUserTie} />
            <Text textAlign="center" fontSize={1.6}>
              مـدرس
            </Text>
      </View>
    </div>
  );
}
