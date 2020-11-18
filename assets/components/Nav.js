import { useState, useEffect } from "react";
import { useLogout } from "../hooks/tokenController";
import {
  faEdit,
  faUser,
  faSignOutAlt,
  faPlusCircle,
  faUserAlt,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import View from "./View";
import Avatar from "./Avatar";
import Modal from "./Modal";
import UserItem from "./UserItem";

export default function Nav() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="nav">
      {/* left side  */}
      <View onClick={() => setIsOpen(true)}>
        <Avatar radius={4} icon={faUser} />
      </View>
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <View mh={2} mv={2}>
          <UserItem
            name="اضافة طالب"
            onClick={() => router.push("/student/new")}
            pv={1}
            icon={faPlusCircle}
            color='#3e978b'
          />

          <UserItem
            name="ادارة الطلاب"
            onClick={() => router.push("/teacher/dashboard")}
            pv={1}
            icon={faUserAlt}
            color='#303030'

          />
          <UserItem
            name="ادارة المدرسين"
            onClick={() => router.push("/teacher/authorization")}
            pv={1}
            icon={faUserTie}
            color='#303030'

          />
          <UserItem
            name="تسجيل خروج"
            onClick={() => useLogout(() => router.push("/"))}
            pv={1}
            color="tomato"
            icon={faSignOutAlt}
          />
        </View>
      </Modal>
      <View
        display="flex"
        alignItems="center"
        onClick={() => router.push("/teacher/dashboard")}
      >
        <View ph={1}>درجاتي</View>
        <FontAwesomeIcon color={"#303030"} icon={faEdit} />
      </View>
    </div>
  );
}
