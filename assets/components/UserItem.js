import React from "react";
import { faUserAlt } from "@fortawesome/free-solid-svg-icons";

import View from "../components/View";
import Text from "../components/Text";
import Avatar from "../components/Avatar";
import DoubleSwitch from "../components/DoubleSwitch";

export default function UserItem({
  onChange,
  name = "name undefined",
  icon,
  onClick,
  pv,
  ph,
  textAlign,
  isSuccess,
  // data
}) {
  return (
    <div className="user" onClick={onClick}>
      <View
        className="user__section"
        display="flex"
        flexDirection="row-reverse"
        alignItems="center"
      >
        {icon ? (
          <View mh={1}>
            <Avatar icon={icon} radius={3} />
          </View>
        ) : null}

        <View pv={pv} ph={ph}>
          <Text textAlign={textAlign} Component="p" fontSize={1.6}>
            {name}
          </Text>
        </View>
      </View>
      {/* {console.log(isSuccess)} */}
      {onChange ? (
        <View className="user__section " pv={1}>
          <DoubleSwitch value={isSuccess} onChange={onChange} />
        </View>
      ) : null}
    </div>
  );
}
