import React, { useRef } from "react";
import Camera from "../../assets/icon/Camera.svg";
import RedCross from "../../assets/icon/Red Cross.png";

const EditModalAddImage = (props) => {
  //   debugger;
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click(); // Trigger file input click
  };

  const handleRemoveImage = () => {
    props.setSelectedImage();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    props.setSelectedImage(file); // Do something with the selected file
    //
  };

  return (
    <div style={{ display: "flex" }}>
      <div
        style={{
          color: "#333333",
          textAlign: "center",
          border: "2px solid #E0E0E0",
          borderRadius: "4px",
          marginTop: 60,
          marginLeft: 270,

          background: "#F7F7FA",
          height: 30,
          width: 130,
          textAlign: "center",
          paddingLeft: 10,
          paddingTop: 8,
          display: "grid",
          gridTemplateColumns: "30px 80px 2px",
          cursor: "pointer",
        }}
        onClick={() => handleButtonClick()}
      >
        <img src={Camera} alt="Camera icon" style={{ marginBottom: 10 }} />
        Add Image<span style={{ color: "#EF1A57" }}>*</span>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          accept="image/*"
          onChange={(e) => {
            handleFileChange(e);
          }}
        />
        {props?.selectedImage && (
          <label
            style={{
              width: 120,
              color: "#0F75BC",
              width: "20%",
              height: "15%",
            }}
          >
            {props?.selectedImage?.name}
            <img
              src={RedCross}
              alt="Red Cross"
              style={{ marginLeft: 5, width: "20%", height: "15%" }}
              onClick={handleRemoveImage}
            />
          </label>
        )}
      </div>

      {props?.selectedImage && (
        <div style={{ width: "10%" }}>
          <img
            src={URL.createObjectURL(props?.selectedImage)}
            alt="Image"
            style={{
              marginLeft: 150,
              marginTop: 15,
              width: "150%",
              height: "80%",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default EditModalAddImage;
