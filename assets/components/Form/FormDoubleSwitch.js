import {useFormikContext} from 'formik'

import DoubleSwitch from '../DoubleSwitch'
import Text from '../Text'
import View from '../View'

export default function FormDoubleSwitch({label , name}) {
    const {setFieldValue} = useFormikContext()
    return (
        <View display='flex' alignItems='center'>
            <DoubleSwitch onChange={data =>setFieldValue(name , data)} />
                
            <View ph={1}>
            <Text Component={'label'} fontSize={1.4} >{label}</Text>
            </View>
        </View>
    )
}
