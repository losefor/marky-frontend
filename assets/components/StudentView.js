import UserItem from "./UserItem";
import axios from "axios";
import constants from "../utils/variables";
import { useGetToken } from "../hooks/tokenController";
import {useRouter} from 'next/router'

export default function StudentView({ data }) {
  const router = useRouter()
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
    // console.log(response);
  };

  return data.map((student , index) => {
    return (
      <UserItem
      key={index}
        isSuccess={student.isSuccess}
        onChange={(data) => handleChange(data, student._id)}
        name={student.name}
        onClick={()=>router.push(`/student/edit/${student.uid}`)}
      />
    );
  });
}
