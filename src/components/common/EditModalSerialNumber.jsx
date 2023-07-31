import React from "react";

const EditModalSerialNumber = (props) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "165px auto",
        gap: "10px",
        marginTop: 20,
        marginLeft: 95,
      }}
    >
      <label style={{ fontSize: 24, color: "#5A5A5B" }} htmlFor="serialNumber">
        Serial Number
      </label>

      <input
        style={{
          boxSizing: "border-box",
          border: "1px solid #E0E0E0",
          width: 375,
          background: "#FFFFFF",
          height: 40,
        }}
        type="text"
        value={props?.values?.serialNumber}
        onChange={(e) =>
          props?.setValues({
            ...props?.values,
            serialNumber: e?.target?.value,
          })
        }
        id="serialNumber"
        name="serialNumber"
      ></input>
    </div>
  );
};

export default EditModalSerialNumber;
