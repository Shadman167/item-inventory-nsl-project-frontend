import React from "react";

const EditModalCategory = (props) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "120px auto",
        gap: "10px",
        marginTop: 35,
        marginLeft: 140,
      }}
    >
      <span style={{ fontSize: 24, color: "#5A5A5B" }}>
        Category<span style={{ color: "#EF1A57" }}>*</span>
      </span>
      <select
        style={{
          boxSizing: "border-box",
          border: "1px solid #E0E0E0",
          width: 375,
          background: "#FFFFFF",
          height: 40,
        }}
        onChange={(e) => {
          props.setValues({
            ...props.values,
            categoryName: e.target.value,
          });
        }}
        value={props?.values?.categoryName}
      >
        {props?.allProducts.map((category, index) => {
          return (
            <option key={index} value={category?.name}>
              {category?.name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default EditModalCategory;
