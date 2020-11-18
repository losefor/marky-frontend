import { useState } from "react";
import * as Yup from "yup";
import axios from "axios";
import {useRouter} from 'next/router'

import Formik from "../../../assets/components/Form/Formik";
import FormTextInput from "../../../assets/components/Form/FormTextInput";
import FormButton from "../../../assets/components/Form/FormButton";
import FormPicker from "../../../assets/components/Form/FormPicker";
import FormDoubleSwitch from "../../../assets/components/Form/FormDoubleSwitch";

import constants, { departments } from "../../../assets/utils/variables";
import {useGetToken} from '../../../assets/hooks/tokenController';
import View from "../../../assets/components/View";
import Spinner from "../../../assets/components/Spinner";
import BackButton from "../../../assets/components/BackButton";

export default function Edit({ response }) {
  const [isLoading , setIsLoading] = useState(false)
  const router = useRouter()
  const { name, email, phoneNumber, department, stage , _id , isSuccess } = response.data.data;
  const initialValues = {
    name,
    email,
    phoneNumber,
    department,
    stage,
    isSuccess
  };

  console.log(initialValues);

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(4, "الاسم قصير جداً")
      .max(50, "الاسم طويل جدا")
      .required("اسم الطالب مطلوب"),
    email: Yup.string()
      .email("يرجى التاكد من الايميل")
      .required("الايميل الخاص بالطالب مطلوب"),
    phoneNumber: Yup.string().min(11).max(11).required("رقم الهاتف مطلوب"),
    stage: Yup.number().required("المرحلة مطلوبة"),
    department: Yup.string().required("القسم مطلوب"),
    isSuccess: Yup.boolean().required("حالة الطالب مطلوبة")
  });

  const handleSubmit =  async (data ) => {
    setIsLoading(true)
    const { name, email, phoneNumber, department, stage , isSuccess } = data;
    console.log(data)
    const json = JSON.stringify({
      name,
      email,
      phoneNumber,
      department,
      stage,
      isSuccess
    });

    console.log(json)

     const response = await axios.patch(`${constants.URL}/student/${_id}`, json, {
       headers: {
         "Content-Type": "application/json",
         authorization: useGetToken(),
       },
     });

     if(response.data.status =='fail') return ; 
     else router.back()

  };

  const handleChange = async (data, id) => {
  
    // console.log(response);
  };


  return (<>
  <BackButton/>
    <div className="center">
      <View display="flex" flexDirection="column">
        <Formik
          validationSchema={validationSchema}
          initialValues={initialValues}
          onSubmit={handleSubmit}
          >
          <FormTextInput name="name" label="اسم الطالب" />
          <FormTextInput name="email" label="ايميل الطالب" />
          <FormTextInput name="phoneNumber" label="رقم الهاتف" />
          <FormPicker
            name="department"
            label="القسم"
            items={departments}
            />
          <FormPicker
            name="stage"
            label="المرحلة"
            items={stages}
            />
          <View display="flex" justifyContent="flex-end" mv={1}>
            <FormDoubleSwitch name='isSuccess' label="حالة الطالب"/>
          </View>

          <View mv={2}>
            <FormButton label="تعديل المعلومات" color="warning" rounded />
          </View>
        </Formik>
      </View>
    </div>
    <Spinner isLoading={isLoading}/>
            </>
  );
}

const stages = [
  { name: "الاولى", value: 1 },
  { name: "الثانية", value: 2 },
  { name: "الثالثة", value: 3 },
  { name: "الرابعة", value: 4 },
];

export async function getServerSideProps(context) {
  const response = await axios.get(
    `${constants.URL}/student/${context.query.id}`
  );
  // console.log(response.data);
  return {
    props: {
      response: {
        data: response.data,
      },
    }, 
  };
}
