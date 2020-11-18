import { useEffect, useState } from "react";
import axios from "axios";

import { useGetToken } from "../../assets/hooks/tokenController";
import constants from "../../assets/utils/variables";

import UserItem from "../../assets/components/UserItem";
import Text from "../../assets/components/Text";
import Nav from "../../assets/components/Nav";
import Container from "../../assets/components/Container";
import Spinner from "../../assets/components/Spinner";
import View from "../../assets/components/View";

export default function authorization() {
  const [isLoading, setIsLoading] = useState(true);
  const [teachers, setTeachers] = useState([]);
  useEffect(() => {
    axios
      .get(`${constants.URL}/api/users`, {
        headers: {
          authorization: useGetToken(),
        },
      })
      .then((res) => {
        if (
          res.data.status == "fail" &&
          res.data.message == "AUTHORIZATION_REJECTED"
        )
          return setIsLoading(null);
        console.log(res.data);
        setTeachers(res.data.data);
        setIsLoading(false);
      });
  }, []);

  const changeHandler = (value, id) => {
    axios
      .patch(
        `${constants.URL}/authenticate/${id}`,
        {
          isAdmin: value,
        },
        {
          headers: {
            authorization: useGetToken(),
          },
        }
      )
      .then((res) => {
        // setTeachers(res.data.data)
        // setIsLoading(false)
      });
  };

  return (
    <div>
      <Spinner isLoading={isLoading} />
      <Nav />
      <CondRenderer changeHandler={changeHandler} isLoading={isLoading} teachers={teachers} />
    </div>
  );
}

const CondRenderer = ({ isLoading, teachers , changeHandler }) => {
  switch (isLoading) {
    case null:
      return (
        <div className="center">
          <Text fontSize={1.6}>T_T...ليس لديك الصلاحيات</Text>
        </div>
      );
    default:
      return (
        <Container>
          <View display="flex" justifyContent="space-between">
            <View ph={1}>
              <Text>صلاحيات المدرس</Text>
            </View>
            <View ph={2}>
              <Text>اسم المدرس</Text>
            </View>
          </View>
          {teachers.map((data, index) => (
            <UserItem
              key={index}
              name={data.name}
              pv={1}
              isSuccess={data.isAdmin}
              onChange={(value) => changeHandler(value, data._id)}
            />
          ))}
        </Container>
      );
  }
};
