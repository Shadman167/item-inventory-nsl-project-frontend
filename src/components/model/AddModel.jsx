import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import Vector from "../../assets/icon/Vector.png";
import EditModalDate from "../common/EditModalDate.jsx";
import EditModalSerialNumber from "../common/EditModalSerialNumber";
import EditModalPurchasePrice from "../common/EditModalPurchasePrice";
import EditModalAddImage from "../common/EditModalAddImage";
import EditModalCategory from "../common/EditModalCategory";
import EditModalProductName from "../common/EditModalProductName";
import moment from "moment";
import axios from "axios";
import Server from "../../Server.jsx";
import * as Yup from "yup";

function AddModel(props) {
  let localStorageApiKey = localStorage?.getItem("apiKey");
  // checked states checks whether an item has warranty
  const [isChecked, setIsChecked] = useState(false);
  // state to insert images of items added to inventory
  const [selectedImage, setSelectedImage] = useState(null);
  // values state stores all the info on the item added
  const [formData, setFormData] = useState({
    categoryName: "",
    productName: "",
    serialNumber: "",
    purchasePrice: "",
    purchaseDate: moment().format("YYYY-MM-DD"),
    warrantyInYears: "",
    warrantyExpireDate: "",
  });

  const [allProducts, setAllProducts] = useState([]);

  const {
    handleSubmit,
    handleChange,
    values,
    touched,
    errors,
    handleBlur,
    setValues,
    resetForm,
    setErrors,
  } = useFormik({
    initialValues: { ...formData },
    validationSchema: Yup.object({
      serialNumber: Yup.string().required("Serial Number is Required"),
      purchasePrice: Yup.string().required("Purchase Price is Required"),
    }),
    onSubmit: (value) => {
      debugger;
      props?.status === "Add"
        ? (handleAddProduct(), props.setAddModalVisible(false))
        : (handleUpdateProduct(), props.setAddModalVisible(false));
    },
  });

  // handler function which checks if Has Warranty box is checked
  const handleCheckboxChange = (e) => {
    setIsChecked(e?.target.checked);
    if (e?.target?.checked) {
      setValues({
        ...values,
        warrantyInYears: 1,
        warrantyExpireDate: moment().format("YYYY-MM-DD"),
      });
    } else {
      setValues({
        ...values,
        warrantyExpireDate: "",
        warrantyInYears: "",
      });
    }
  };
  // function to update the date selected for the purchased item
  const updatePurchaseDate = (selectedDate) => {
    setValues({ ...values, purchaseDate: selectedDate });
  };
  // if item warranty present, then expire date is selected
  const updateWarrantyDate = (selectedDate) => {
    setValues({ ...values, warrantyExpireDate: selectedDate });
  };

  // function that handles POST request from API
  const handleAddProduct = () => {
    debugger;
    let newFormData = new FormData();

    newFormData.append(
      "product",
      new Blob([JSON.stringify(values)], {
        type: "application/json",
      })
    );

    newFormData.append("productPhoto", selectedImage);

    axios
      .post(`${Server.baseApi}/products`, newFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
          apiKey: localStorageApiKey,
        },
      })
      .then((response) => {
        props.setReload(!props.reload);
      })
      .then((error) => {
        console.log(error);
      });
  };

  const handleUpdateProduct = () => {
    let newFormData = new FormData();

    newFormData.append(
      "product",
      new Blob([JSON.stringify(values)], {
        type: "application/json",
      })
    );

    newFormData.append("productPhoto", selectedImage);
    axios
      .put(`${Server.baseApi}/products/${props?.selectedProduct?.id}`, values, {
        headers: {
          apiKey: localStorageApiKey,
        },
      })

      .then((response) => {
        // handleAddProduct();
        props?.setAddModalVisible(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // useEffect Hook checks status of modal and adds info accordingly to values state for storage
  useEffect(() => {
    if (localStorageApiKey) {
      axios
        .get(`${Server.baseApi}/products/category-name-wise-product-names`, {
          headers: {
            apiKey: localStorageApiKey,
          },
        })
        .then((response) => {
          setAllProducts([...response?.data]);
          if (props?.status === "Add") {
            setValues({
              ...values,
              categoryName: response?.data?.[0]?.name,
              productName: response?.data?.[0]?.products?.[0]?.name,
              purchaseDate: moment().format("YYYY-MM-DD"),
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  useEffect(() => {
    if (props?.status === "Edit") {
      setValues({
        id: props?.selectedProduct?.id,
        categoryName: props?.selectedProduct?.categoryName,
        productName: props?.selectedProduct?.productName,
        serialNumber: props?.selectedProduct?.serialNumber,
        purchasePrice: props?.selectedProduct?.purchasePrice,
        purchaseDate: props?.selectedProduct?.purchaseDate
          ? props?.selectedProduct?.purchaseDate
          : moment().format("YYYY-MM-DD"),
        warrantyInYears: props?.selectedProduct?.warrantyInYears,
        warrantyExpireDate: props?.selectedProduct?.warrantyExpireDate
          ? props?.selectedProduct?.warrantyExpireDate
          : moment().format("YYYY-MM-DD"),
      });
    }
  }, [props.status]);

  console.log(values);

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: "block",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 9999,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "45%",
            left: "50%",

            transform: "translate(-50%, -50%)",
            backgroundColor: "#F7F7FA",
            padding: "20px",
            borderRadius: "4px",
            width: "700px",
            maxWidth: "90%",

            height: "max-content",
          }}
        >
          <form onSubmit={handleSubmit}>
            <div>
              <p
                style={{
                  textAlign: "end",
                }}
              >
                <img
                  src={Vector}
                  alt="Window Close Sign"
                  style={{ width: 20, height: 20 }}
                  onClick={() => {
                    props.setAddModalVisible(false);
                  }}
                />
              </p>
            </div>

            <div>
              <p
                style={{
                  textAlign: "center",
                  fontSize: 40,
                  fontWeight: "bolder",
                  fontFamily: "Open Sans Serif",
                }}
              >
                {props?.status === "Edit"
                  ? "Edit This Product"
                  : "Add This Product"}
              </p>
            </div>

            {/* These are all the fields that are displayed in Add and Edit Modals */}
            <EditModalCategory
              setValues={setValues}
              values={values}
              allProducts={allProducts}
            />

            <EditModalProductName
              setValues={setValues}
              values={values}
              allProducts={allProducts}
            />

            <EditModalSerialNumber setValues={setValues} values={values} />
            {touched?.serialNumber && errors?.serialNumber && (
              <div style={{ color: "red", marginLeft: "270px" }}>
                {errors?.serialNumber}
              </div>
            )}

            <EditModalPurchasePrice
              setValues={setValues}
              values={values}
              handleBlur={handleBlur}
            />
            {touched.purchasePrice && errors.purchasePrice && (
              <div style={{ color: "red", marginLeft: "270px" }}>
                {errors?.purchasePrice}
              </div>
            )}

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "150px 100px 110px 105px",
                gap: "30px",
                marginTop: 20,
                marginLeft: 90,
              }}
            >
              <span style={{ fontSize: 24, color: "#5A5A5B" }}>
                Purchase Date
                <span style={{ color: "#EF1A57" }}>*</span>
              </span>

              <EditModalDate
                updateDate={(date) => {
                  updatePurchaseDate(date);
                }}
              />
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "40px auto",

                marginTop: 20,
                marginLeft: 260,
              }}
            >
              <input
                type="checkbox"
                checked={isChecked}
                onChange={(e) => handleCheckboxChange(e)}
              ></input>
              <label>Has Warranty</label>
            </div>
            {/* Triggered when an item has warranty */}
            {isChecked && (
              <>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "165px auto",
                    gap: "10px",
                    marginTop: 20,
                    marginLeft: 95,
                  }}
                >
                  <span
                    style={{ fontSize: 24, color: "#5A5A5B", marginLeft: 40 }}
                  >
                    Warranty<span style={{ color: "#EF1A57" }}>*</span>
                  </span>
                  {/* Selection of warranty years for an item if there is any*/}
                  <select
                    style={{
                      boxSizing: "border-box",
                      border: "1px solid #E0E0E0",
                      width: 375,
                      background: "#FFFFFF",
                      height: 40,
                    }}
                    onChange={(e) => {
                      setValues({
                        ...values,
                        warrantyInYears: parseInt(e.target.value, 10),
                        warrantyExpireDate: moment(values?.purchaseDate)
                          .add(e.target.value, "years")
                          .format("YYYY-MM-DD"),
                      });
                    }}
                  >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </select>
                </div>
                {/* Expiry Date for an item's warranty */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "230px 110px 100px 105px",
                    gap: "30px",
                    marginTop: 30,
                    marginLeft: 10,
                  }}
                >
                  <span style={{ fontSize: 24, color: "#5A5A5B" }}>
                    Warranty Expire Date
                    <span style={{ color: "#EF1A57" }}>*</span>
                  </span>

                  <EditModalDate
                    // setValues={setValues}
                    // values={values}
                    selectedDate={values?.warrantyExpireDate}
                    // setSelectedDate = {setWarrentyExpireDate}
                    updateDate={(date) => {
                      updateWarrantyDate(date);
                    }}
                  />
                </div>
              </>
            )}
            {/* Product image code which pastes the image at the end of the modal */}
            <EditModalAddImage
              selectedImage={selectedImage}
              setSelectedImage={setSelectedImage}
            />

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "80px 80px",
                gap: "10px",
                marginTop: 100,
                marginLeft: 520,
              }}
            >
              <button
                onClick={() => {
                  props.setAddModalVisible(false);
                }}
                style={{
                  border: "1px solid #EB5757",
                  textAlign: "center",
                  backgroundColor: "#ffffff",
                  color: "#EB5757",
                  paddingRight: 25,
                  paddingLeft: 20,
                  paddingTop: 10,
                  paddingBottom: 10,
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
              <button
                // onClick={handleSubmit}
                type="submit"
                style={{
                  border: "1px solid #1890FF",
                  textAlign: "center",
                  backgroundColor: "#1890FF",
                  color: "#ffffff",
                  paddingRight: 25,
                  paddingLeft: 25,
                  paddingTop: 10,
                  paddingBottom: 10,
                  cursor: "pointer",
                }}
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddModel;
