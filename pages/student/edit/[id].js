import { useState, useEffect } from "react";
import * as Yup from "yup";
import axios from "axios";
import {useRouter} from 'next/router'

import Formik from "../../../assets/components/Form/Formik";
import FormTextInput from "../../../assets/components/Form/FormTextInput";
import FormButton from "../../../assets/components/Form/FormButton";
import FormPicker from "../../../assets/components/Form/FormPicker";

import View from "../../../assets/components/View";
import constants, { departments } from "../../../assets/utils/variables";
import {useGetToken} from '../../../assets/hooks/tokenController'
export default function Edit({ response }) {

  const router = useRouter()
  const { name, email, phoneNumber, department, stage , _id } = response.data.data;
  const initialValues = {
    name,
    email,
    phoneNumber,
    department,
    stage,
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
    phoneNumber: Yup.string().min(11).max(11).required("required"),
    stage: Yup.number().required("stage is required"),
    department: Yup.string().required("required"),
  });

  const handleSubmit =  async (data ) => {
    const { name, email, phoneNumber, department, stage } = data;
    console.log(data)
    const json = JSON.stringify({
      name,
      email,
      phoneNumber,
      department: department,
      stage: stage,
    });

    // console.log(json)

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


  return (
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
            value={departments[0]}
          />
          <FormPicker
            name="stage"
            label="المرحلة"
            items={stages}
            value={stages[0]}
          />
          <View display="flex" justifyContent="flex-end" mv={1}>
            {/* <FormDoubleSwitch name='isSuccess' label="حالة الطالب"/> */}
          </View>

          <View mv={2}>
            <FormButton label="تعديل المعلومات" color="warning" rounded />
          </View>
        </Formik>
      </View>
    </div>
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
  console.log(response.data);
  return {
    props: {
      response: {
        data: response.data,
      },
    }, 
  };
}
