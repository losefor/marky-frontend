import * as Yup from "yup";
import axios from "axios";
import {useRouter} from 'next/router'

import Formik from "../../assets/components/Form/Formik";
import FormTextInput from "../../assets/components/Form/FormTextInput";
import FormButton from "../../assets/components/Form/FormButton";
import FormPicker from "../../assets/components/Form/FormPicker";

import View from "../../assets/components/View";
import constants, { departments } from "../../assets/utils/variables";
import { useGetToken } from "../../assets/hooks/tokenController";

export default function add() {


  const router = useRouter()

  const initialValues = {
    name: "",
    email: "",
    phoneNumber: "",
    department: "",
    stage: "",
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
    department: Yup.object().required("required"),
  });

  const handleSubmit = async (data) => {
    const { name, email, phoneNumber, department, stage } = data;
    const json = JSON.stringify({
      name,
      email,
      phoneNumber,
      department: department.value,
      stage: stage.value,
    });
    console.log(json);
    try {
      const response = await axios.post(`${constants.URL}/student`, json, {
        headers: {
          "Content-Type": "application/json",
          "authorization": useGetToken()
        },
      });
      console.log(response)
     router.push('/teacher/dashboard')
    } catch (err) {}
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
          <FormPicker name="department" label="القسم" items={departments} />
          <FormPicker name="stage" label="المرحلة" items={stages} />
          <View display="flex" justifyContent="flex-end" mv={1}>
            {/* <FormDoubleSwitch name='isSuccess' label="حالة الطالب"/> */}
          </View>

          <View mv={2}>
            <FormButton label="اضافة الطالب" color="warning" rounded />
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
