import React from "react";


function CustomPage(props) {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        // display: 'flex',
        flexDirection: "column",
        alignItems: "center",
        // justifyContent: 'center',
        padding: "1rem",
      }}
    >
      {props.children}
    </div>
  );
}

export default CustomPage;
