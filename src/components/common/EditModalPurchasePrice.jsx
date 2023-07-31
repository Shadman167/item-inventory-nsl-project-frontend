import React from "react";
import { useFormik } from "formik";

const SelectPurchasePrice = (props) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "170px auto",
        gap: "10px",
        marginTop: 20,
        marginLeft: 90,
      }}
    >
      <label style={{ fontSize: 24, color: "#5A5A5B" }} htmlFor="purchasePrice">
        Purchase Price
        <span style={{ color: "#EF1A57" }}>*</span>
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
        value={props?.values?.purchasePrice}
        onChange={(e) => {
          props?.setValues({
            ...props?.values,
            purchasePrice: e?.target?.value,
          });
        }}
        onBlur={props?.handleBlur}
        id="purchasePrice"
        name="purchasePrice"
      />
    </div>
  );
};

export default SelectPurchasePrice;
