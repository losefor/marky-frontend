import { useRouter } from "next/router";
import axios from "axios";

import constants from "../utils/variables";
import { useGetToken } from "../hooks/tokenController";

import UserItem from "./UserItem";
import View from "./View";
import Text from "./Text";

export default function StudentView({ data , doubleSwitch }) {
  const router = useRouter();
  const handleChange = async (data, id) => {
    // console.log(data);
    const json = JSON.stringify({ isSuccess: data });
    // console.log(json);
    const response = await axios.patch(`${constants.URL}/student/${id}`, json, {
      headers: {
        "Content-Type": "application/json",
        authorization: useGetToken(),
      },
    });
  };

  return (
    <>
      <View display="flex" justifyContent="space-between">
        <View ph={2}>
          <Text>حالة الطالب</Text>
        </View>

        <View ph={2}>
          <Text>اسم الطالب</Text>
        </View>
      </View>
      {data.map((student, index) => {
        return (
          <UserItem
            doubleSwitch={doubleSwitch}
            key={index}
            isSuccess={student.isSuccess}
            onChange={(data) => handleChange(data, student._id)}
            name={student.name}
            onClick={() => router.push(`/student/edit/${student.uid}`)}
          />
        );
      })}
    </>
  );
}
