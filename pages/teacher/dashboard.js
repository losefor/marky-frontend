import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import axios from "axios";
import constants, { departments } from "../../assets/utils/variables";
import { useEffect, useState } from "react";

import { useGetToken , useLogout } from "../../assets/hooks/tokenController";
import Avatar from "../../assets/components/Avatar";
import Button from "../../assets/components/Button";
import Text from "../../assets/components/Text";
import View from "../../assets/components/View";
import Nav from "../../assets/components/Nav";
import GategoryPicker from "../../assets/components/GategoryPicker";
import Container from "../../assets/components/Container";
import Spinner from "../../assets/components/Spinner";
import StudentView from "../../assets/components/StudentView";

export default function unauthorized() {
  const [isAdmin, setIsAdmin] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [students, setStudents] = useState([]);
  const [sortByDepartment, setSortByDepartment] = useState("null");
  const [sortByStage, setSortByStage] = useState("null");
  useEffect(() => {
    setIsLoading(true)
    // console.log(sortByStage, sortByDepartment);
    axios
      .get(`${constants.URL}/student`, {
        headers: {
          authorization: useGetToken(),
        },
        params: {
          stage: sortByStage,
          department: sortByDepartment,
        },
      })
      .then((res) => {
        setIsLoading(false)
        if (res.data.status === "fail") {
          setIsAdmin(false);
        } else {
          setIsAdmin(true);
          setStudents(res.data);
          // console.log(res);
        }
      });
  }, [sortByDepartment, sortByStage]);

  const CondRendering = () => {
    switch (isAdmin) {
      case true:
        return (
          <Container>
            <Nav />
            <View display="flex" justifyContent="flex-end">
              <GategoryPicker
                value={sortByStage}
                onChange={(data) => {
                  setSortByStage(data.value);
                  setIsAdmin(null);
                }}
                items={stages}
                label="المرحلة"
              />
              <GategoryPicker
                value={sortByDepartment}
                onChange={(data) => {
                  setSortByDepartment(data.value);
                  setIsAdmin(null);
                }}
                items={departments}
                label="القسم"
              />
            </View>
            <StudentView doubleSwitch data={students}  />;
          </Container>
        );
        case false:
          return <Unauth />;
          default:
        return ''
      }
    };
    return (
      <>
      <Spinner isLoading={isLoading}/>
      <CondRendering />;
    </>
  );
}

const Unauth = () => {
  const router = useRouter()
  return (
    <Container>
      <View
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <View mv={8}>
          <Avatar image="/checking.svg" />
          <Text textAlign="center" color="#636262" fontSize={2.5}>
            بانتظار الموافقة
          </Text>
          <Text textAlign="center" color="#636262" fontSize={1.2}>
            اذا لم يتم التفعيل خلال 24 ساعة يرجى التواصل مع الادارة
          </Text>
        </View>
        <View>
          <Button
            leftIcon={faArrowCircleLeft}
            color="danger"
            label="تسجيل الخروج"
            type="button"
            onClick={()=>useLogout(()=>router.push('/'))}
          />
        </View>
      </View>
    </Container>
  );
};

const stages = [
  {
    name: "بدون",
    value: "null",
  },
  {
    name: "الاولى",
    value: "1",
  },
  {
    name: "الثانية",
    value: "2",
  },
  {
    name: "الثالثة",
    value: "3",
  },
  {
    name: "الرابعة",
    value: "4",
  },
];
