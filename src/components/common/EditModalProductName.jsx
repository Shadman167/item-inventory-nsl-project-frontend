import React, { useState, useEffect } from "react";

const EditModalProductName = (props) => {
  const [myProducts, setMyProducts] = useState([]);

  useEffect(() => {
    if (props?.allProducts) {
      let filteredCategory = props?.allProducts?.filter((item) => {
        return item?.name === props?.values?.categoryName ? true : false;
      });

      setMyProducts(
        filteredCategory?.[0]?.products
          ? [...filteredCategory?.[0]?.products]
          : []
      );
    }
  }, [props]);

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
      <span style={{ fontSize: 24, color: "#5A5A5B" }}>
        Product Name<span style={{ color: "#EF1A57" }}>*</span>
      </span>
      <select
        style={{
          boxSizing: "border-box",
          border: "1px solid #E0E0E0",
          width: 375,
          background: "#FFFFFF",
          height: 40,
        }}
        value={props?.values?.productName}
        onChange={(e) =>
          props.setValues({
            ...props?.values,
            productName: e.target.value,
          })
        }
      >
        {myProducts.map((product, index) => {
          return (
            <option key={index} value={product.name}>
              {product.name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default EditModalProductName;
