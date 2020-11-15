import { useState , useEffect } from "react";
import Link from "next/link";
import {useRouter} from "next/router";
import * as Yup from "yup";
import axios from "axios";
import {useSetToken , useGetToken} from '../../assets/hooks/tokenController'

import Formik from "../../assets/components/Form/Formik";
import FormTextInput from "../../assets/components/Form/FormTextInput";
import FormButton from "../../assets/components/Form/FormButton";
import FormPicker from "../../assets/components/Form/FormPicker";

import View from "../../assets/components/View";
import Text from "../../assets/components/Text";
import BackButton from "../../assets/components/BackButton";
import Alert from "../../assets/components/Alert";

import constants from "../../assets/utils/variables";

export default function add() {

  const router = useRouter()



  const [alert, setAlert] = useState({
    isOpen: false,
    color: "danger",
    label: "some thing went wrong",
  });

  const initialValues = {
    name: "",
    phoneNumber: "",
    department: "",
    stage: "",
    email: "",
    passwordConfirm: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(4, "الاسم قصير جداً")
      .max(50, "الاسم طويل جدا")
      .required("اسم الطالب مطلوب"),
    email: Yup.string()
      .email("يرجى التاكد من الايميل")
      .required("الايميل الخاص بالطالب مطلوب"),
    phoneNumber: Yup.string().min(11).max(11).required("required"),
    stage: Yup.object().required("stage is required"),
    department: Yup.object().required("stage is required"),
    password: Yup.string().required("dsfdf").min(8, "pass must more than 8"),
    passwordConfirm: Yup.string()
      .required("sadfdsafdsaf")
      .min(8, "pass must more than 8"),
  });

  const submitHandler = async (data) => {
    console.log(data);
    const {
      name,
      email,
      phoneNumber,
      stage,
      department,
      password,
      passwordConfirm,
    } = data;
    const json = JSON.stringify({
      name,
      email,
      password,
      passwordConfirm,
      phoneNumber,
      stage: stage.value,
      department: department.value,
    });
    console.log(json);
    const response = await axios.post(`${constants.URL}/signup`, json, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response);

    if (response.data.status === "fail") {
      switch(response.data.message){
        case 'EMAIL_USED':setAlert({
          isOpen: true,
          color: "danger",
          label: "هذا الايميل مستخدم بالفعل",
        });break;
        default :  setAlert({
          isOpen: true,
          color: "danger",
          label: "الرمز السري الذي ادخلته غير متطابق",
        });
      }
     
    }

    if (response.data.status === "success") {
      setAlert({
        isOpen: true,
        color: "success",
        label: "تم انشاء الحساب",
      });
      useSetToken(response.data.token)
      setTimeout(()=> router.push('/teacher/dashboard') , 3000)
    }
  };


  const alertCloseHandler = ()=>{
    setAlert(data =>{
      return {
        ...data , 
        isOpen:false
      }
    })
  }


  return (
    <div className="center">
      <Alert onClose={alertCloseHandler} open={alert.isOpen} type={alert.color} text={alert.label} />
      <BackButton />
      <View display="flex" flexDirection="column">
        <View mv={5}>
          <Text color="#303030" textAlign="center" fontSize={3}>
            انشاء حساب
          </Text>
        </View>
        <Formik
          validationSchema={validationSchema}
          initialValues={initialValues}
          onSubmit={submitHandler}
        >
          <FormTextInput name="name" label="اسم المدرس" />
          <FormTextInput name="email" label="ايميل المدرس" />
          <FormTextInput name="password" label="الرمز السري" />
          <FormTextInput name="passwordConfirm" label="تاكيد الرمز السري" />
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

          <View mv={2}>
            <FormButton label="انشاء حساب" color="success" rounded />
          </View>

          <Text textAlign="right">
            لديك حساب ؟<Link href="./login">سجل دخول</Link>
          </Text>
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

const departments = [{ name: "computerScince", value: "computerScince" }];
