import Modal from './Modal'
import View from './View'
import Text from './Text'

export default function StudentScore({open=false , onClose , data }) {
    const scoreHandler = ()=>{
        switch(data.isSuccess){
            case true : return 'ناجح'
            case false : return 'مكمل'
            case null : return 'غير متوفرة'
        }
    }
    return (
        <Modal open={open} onClose={onClose}>
            <View display='flex' justifyContent='flex-end' flexDirection='column' mh={2} mv={2}>
                {/* {console.log(data)} */}
               {data ? (<>
                   <Text textAlign='right' fontSize={1.4} Component='p'> {data.name + ": الاسم"}</Text>
                   <Text textAlign='right' fontSize={1.4} Component='p' >  {data.email + ": الايميل"}</Text>
                   <Text textAlign='right' fontSize={1.4} Component='p'> {"النتيجة"+ " : "+scoreHandler()}</Text>
               </>
               ): null}
            </View>
        </Modal>
    )
}
