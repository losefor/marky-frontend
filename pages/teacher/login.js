import { useState } from "react";
import * as Yup from "yup";
import Link from "next/link";
import {useRouter} from 'next/router'
import axios from "axios";
import {useSetToken} from '../../assets/hooks/tokenController'

import Formik from "../../assets/components/Form/Formik";
import FormTextInput from "../../assets/components/Form/FormTextInput";
import FormButton from "../../assets/components/Form/FormButton";

import View from "../../assets/components/View";
import Text from "../../assets/components/Text";
import BackButton from "../../assets/components/BackButton";
import Alert from "../../assets/components/Alert";
import Spinner from "../../assets/components/Spinner";

import constants from "../../assets/utils/variables";
import { faLessThanEqual } from "@fortawesome/free-solid-svg-icons";

export default function add() {

  const router = useRouter()
  const [isLoading , setIsLoading] = useState(false)
  const [alert, setAlert] = useState({
    isOpen: false,
    color: "danger",
    label: "some thing went wrong",
  });

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("يرجى التاكد من الايميل")
      .required("الايميل الخاص بك مطلوب"),
    password: Yup.string().required().min(8, "pass must more than 8"),
  });

  const submitHandler = async (data) => {
    setIsLoading(true)
    const json = JSON.stringify(data);
    console.log(json)
    const response = await axios.post(`${constants.URL}/login`, json, {
      headers:{
        "Content-Type":"application/json"
      }
    });
    setIsLoading(false)
    console.log(response.data)
    if(response.data.status == 'fail'){
      switch(response.data.message){
        case "EMAIL_WRONG" : setAlert({
          isOpen: true,
          color: "danger",
          label: "الايميل اذي ادخلته خطا ",
        });break;
        case "PASSWORD_WRONG" : setAlert({
          isOpen: true,
          color: "danger",
          label: "الرمز السري الذي ادخلته خطا",
        });break;
        default: setAlert({
          isOpen: true,
          color: "danger",
          label: "لقد حصل خطا ما",
        })
      }
    }else if(response.data.status == 'success'){
      setAlert({
        isOpen: true,
        color: "success",
        label: "تم تسجيل الدخول بنجاح",
      })
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
      <Alert onClose={alertCloseHandler} text={alert.label} type={alert.color} open={alert.isOpen} />
      <BackButton />
      <View display="flex" flexDirection="column">
        <View mv={5}>
          <Text color="#303030" textAlign="center" fontSize={3}>
            تسجيل الدخول
          </Text>
        </View>
        <Formik
          validationSchema={validationSchema}
          initialValues={initialValues}
          onSubmit={submitHandler}
        >
          <FormTextInput name="email" label="ايميل المدرس" />
          <FormTextInput name="password" label="الرمز السري" />

          <View mv={2}>
            <FormButton label="تسجيل الدخول" color="warning" rounded />
          </View>

          <Text textAlign="right">
            ليس لديك حساب ؟<Link href="./signup">انشا حساب</Link>
          </Text>
          <Spinner isLoading={isLoading} />
        </Formik>
      </View>
    </div>
  );
}
