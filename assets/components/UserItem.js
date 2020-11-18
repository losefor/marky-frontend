import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import View from "../components/View";
import Text from "../components/Text";
import Avatar from "../components/Avatar";
import DoubleSwitch from "../components/DoubleSwitch";
import Switch from "../components/Switch";

export default function UserItem({
  onChange,
  name = "name undefined",
  icon,
  onClick,
  pv,
  ph,
  textAlign,
  isSuccess,
  doubleSwitch,
  color
}) {
  return (
    <div className="user">
      <View
        className="user__section"
        display="flex"
        flexDirection="row-reverse"
        alignItems="center"
      >
        {icon ? (
          <View mh={1}>
            <FontAwesomeIcon icon={icon} color={color} />
          </View>
        ) : null}

        <View pv={pv} ph={ph} onClick={onClick}>
          <Text color={color} textAlign={textAlign} Component="p" fontSize={1.6}>
            {name}
          </Text>
        </View>
      </View>
      {onChange ? (
        <View className="user__section " pv={1}>
          {doubleSwitch ? (
            <DoubleSwitch value={isSuccess} onChange={onChange} />
          ) : (
            <Switch value={isSuccess} onChange={onChange} />
          )}
        </View>
      ) : null}
    </div>
  );
}
