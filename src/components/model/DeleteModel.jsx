import React, { useEffect } from "react";
import "../../styles/popupDelete.css";
import DeleteBigIcon from "../../assets/icon/DeleteBigIcon.svg";
import Server from "../../Server";
import axios from "axios";

function DeleteModel(props) {
  let localStorageApiKey = localStorage?.getItem("apiKey");

  useEffect(() => {
    axios
      .delete(`${Server.baseApi}/products/${props?.myId}`, {
        headers: {
          apiKey: localStorageApiKey,
        },
      })
      .then((response) => {
        props?.allProducts?.filter(
          (product, index) => product?.[index]?.id !== props?.id
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.reload]);

  return (
    <>
      {/* This is the creation of delete popup */}
      <div
        // This is the div to darken the entire window once the popup opens
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
          // This is the actual white screen for the popup
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#fff",
            padding: "20px",
            borderRadius: "4px",
            width: "500px",
            maxWidth: "90%",
            height: "200px",
          }}
        >
          <div>
            {/* Pasting the big delete icon into the popup */}
            <img
              src={DeleteBigIcon}
              alt="Big Delete"
              style={{ marginLeft: 200, marginBottom: 20 }}
            />
          </div>
          <div>
            {/* The statement within the popup */}
            <p style={{ textAlign: "center" }}>
              Are you sure you want to delete inventory for this item?
            </p>
          </div>

          <div
            // This is the creation of buttons "Yes" and "No"
            style={{
              display: "grid",
              gridTemplateColumns: "auto auto",
              gap: "10px",
              justifyContent: "center",
              marginTop: 35,
              marginLeft: 300,
            }}
          >
            <button
              // When "Yes" and "No" is clicked, the popup closes
              onClick={() => {
                props.setDeleteModalVisible(false);
              }}
              style={{
                border: "2px solid #EB5757",
                textAlign: "center",
                borderRadius: 4,
                backgroundColor: "#ffffff",
                color: "#EB5757",
                paddingRight: 25,
                paddingLeft: 25,
                paddingTop: 10,
                paddingBottom: 10,
                cursor: "pointer",
              }}
            >
              No
            </button>
            <button
              onClick={() => {
                props.setDeleteModalVisible(false);

                props?.setReload(!props.reload);
              }}
              style={{
                border: "2px solid #EB5757",
                textAlign: "center",
                borderRadius: 4,
                backgroundColor: "#EB5757",
                color: "#ffffff",
                paddingRight: 25,
                paddingLeft: 25,
                paddingTop: 10,
                paddingBottom: 10,
                cursor: "pointer",
              }}
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default DeleteModel;
