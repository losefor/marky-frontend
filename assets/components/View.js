import React from "react";

export default function View({
  children,
  pv,
  ph,
  mv,
  mh,
  display ,
  justifyContent,
  alignItems,
    flexWrap,
    flexDirection,
    flex,
    backgroundColor,
    style,
    className,
    onClick
  }) {
    return (
    <div
    onClick={onClick}
      style={{
        margin: `${mv ? mv : 0}rem ${mh ? mh : 0}rem `,
        padding: `${pv ? pv : 0}rem ${ph ? ph : 0}rem `,
        display,
        justifyContent,
        alignItems,
        flexWrap,
        flex,
        backgroundColor,
        flexDirection,
        cursor:onClick?'pointer':'',
        ...style,
      }}
      className={className}
    >
      {children}
    </div>
  );
}

