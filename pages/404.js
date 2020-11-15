import Text from "../assets/components/Text";
import Avatar from "../assets/components/Avatar";
import Button from "../assets/components/Button";
import View from "../assets/components/View";
import {useRouter} from 'next/router'
export default function Custome404() {
    const router = useRouter()
  return (
    <div className="center">
      <View display="flex" flexDirection="column" alignItems='center'>
        <Avatar image="/404.svg" />
        <Text Component='p' fontSize={2.2} textAlign="center">
          لا توجد هكذا صفحة تاكد من العنوان <br />
          وحاول مرة اخرى
        </Text>

        <View mv={5}>
        <Button 
        label='الرجوع الى الصفحة الرايسية'
        color='warning'
        onClick={()=>router.push('/')}
        />
        </View>
      </View>
    </div>
  );
}
