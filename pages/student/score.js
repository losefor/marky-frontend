import { useState } from "react";
import * as Yup from "yup";
import axios from "axios";

import View from "../../assets/components/View";
import Text from "../../assets/components/Text";
import BackButton from "../../assets/components/BackButton";
import Formik from "../../assets/components/Form/Formik";
import FormTextInput from "../../assets/components/Form/FormTextInput";
import FormButton from "../../assets/components/Form/FormButton";
import constants from "../../assets/utils/variables";
import StudentScore from "../../assets/components/StudentScore";

export default function score() {

  const [isopen , setIsOpen] = useState(false)
  const [error , setError] = useState('')
  const [result , setResult] = useState({})

  const initialValues = { id: "" };
  const validationSchema = Yup.object().shape({
    id: Yup.string().required("يرجى ادخال الرمز التعريفي"),
  });

  const handleSubmit = async (data) => {
    const response = await axios.get(`${constants.URL}/student/${data.id}`);
    console.log(response)
    if(response.data.status == 'success'){

      if(response.data.data== null )
      return setError('الرمز السري الذي ادخلته غير موجود')
      
      setResult(response.data.data)
      setIsOpen(true)
      setError('')


    }
  };

  const closeHandler = ()=>{
    setIsOpen(false)
  }

  return (
    <div className="center">
      <StudentScore onClose={closeHandler} open={isopen} data={result} />
      <BackButton />
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <View>
          <FormTextInput label="(id)الرمز التعريفي" name="id" />
         <Text color='tomato' textAlign='right'>{error}</Text>
          <View mv={1}>
            <FormButton rounded color="warning" label="التحقق من النتيجة" />
          </View>
        </View>
      </Formik>
    </div>
  );
}
