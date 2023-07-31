import React, { useState, useEffect } from "react";
import "../styles/homepageStyle.css";
import NeuralLogo from "../assets/icon/NeuralLogo.svg";
import search from "../assets/icon/search.svg";
import Delete from "../assets/icon/Delete.svg";
import EditLine from "../assets/icon/edit-line.svg";
import DeleteModel from "./model/DeleteModel";
import AddModel from "./model/AddModel";
import axios from "axios";
import Server from "../Server.jsx";
function Homepage() {
  // useStates are created to set conditions to true or false. This is done
  // to handle popup cases
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [deleteData, setDeleteData] = useState("");
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [reload, setReload] = useState(false);
  const [status, setStatus] = useState("");
  const [selectedProduct, setSelectedProduct] = useState({});
  const [myId, setMyId] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  let localStorageApiKey = localStorage?.getItem("apiKey");

  useEffect(() => {
    if (localStorageApiKey) {
      axios
        .get(`${Server.baseApi}/products`, {
          headers: {
            apiKey: localStorageApiKey,
          },
        })
        .then((response) => {
          setAllProducts([...response?.data]);
          setFilteredProducts([...response?.data]);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [reload]);

  const handleEdit = (selectedProduct) => {
    setStatus("Edit");
    setAddModalVisible(true);
    setSelectedProduct(selectedProduct);
  };

  const handleSearchQuery = (searchInput) => {
    if (searchInput === "") {
      setFilteredProducts([...allProducts]);
    } else {
      const searchedItems = allProducts?.filter((item) => {
        // debugger;
        return item?.id.toString().includes(searchInput) ||
          item?.serialNumber?.includes(searchInput) ||
          item?.purchasePrice?.toString().includes(searchInput) ||
          item?.categoryName
            ?.toLowerCase()
            .includes(searchInput.toLowerCase()) ||
          item?.productName
            ?.toLowerCase()
            .includes(searchInput.toLowerCase()) ||
          item?.warrantyInYears?.toString().includes(searchInput) ||
          item?.warrantyExpireDate?.toString().includes(searchInput)
          ? true
          : false;
      });

      setFilteredProducts([...searchedItems]);
    }
  };

  // return statement of functional component

  return (
    <>
      {/* visits DeleteModel.jsx file to handle delete modal popup */}
      {deleteModalVisible && (
        <DeleteModel
          deleteModalVisible={deleteModalVisible}
          setDeleteModalVisible={setDeleteModalVisible}
          deleteData={deleteData}
          myId={myId}
          allProducts={allProducts}
          setReload={setReload}
          reload={reload}
        />
      )}

      {addModalVisible && (
        <AddModel
          addModalVisible={addModalVisible}
          setAddModalVisible={setAddModalVisible}
          setReload={setReload}
          reload={reload}
          status={status}
          selectedProduct={selectedProduct}
        />
      )}

      <div>
        {/* creates the blue margin on the top of the page */}
        <div className="marginTop">
          {/* Neural logo in the margin */}
          <img
            src={NeuralLogo}
            style={{ height: 60, width: 150, top: 17, marginLeft: 38 }}
            alt="Neural Logo"
          />
        </div>
        {/* "Add Inventory" button created */}
        <div className="buttonInventoryAndSearch">
          <div style={{ marginLeft: "2%" }}>
            <button
              style={{ marginLeft: "2%" }}
              className="buttonInventory"
              onClick={() => {
                setStatus("Add");
                setAddModalVisible(true);
              }}
            >
              Add Inventory
            </button>
          </div>

          {/* Search box created */}
          <div
            className="searchBox"
            style={{
              border: "1px solid rgba(130, 141, 153, 0.5)",
              borderRadius: "5px",
              minWidth: "285px",
              height: "42px",
              paddingLeft: "0px",
            }}
          >
            <div style={{ width: "84%" }}>
              <input
                placeholder="Search here"
                type="text"
                autoComplete="off"
                aria-label="Search term"
                src={search}
                style={{
                  width: "100%",
                  border: "none",
                  height: "38px",
                  paddingLeft: "10px",
                }}
                // value={(e) => {
                //   setSearchQuery(e.target.value);
                // }}
                onChange={(e) => handleSearchQuery(e.target.value)}
              />
            </div>
            <div
              style={{
                width: "15%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <img src={search} alt="Search icon" />
            </div>
          </div>
        </div>
        {/* This is the start of row creation for tables of inventory data */}
        <div className="row1">
          <div
            className="serialNameTitle"
            style={{
              width: "50px",
              alignContent: "left",
              paddingLeft: "2.5%",
            }}
          >
            SL
          </div>
          <div
            className="serialNameTitle"
            style={{
              width: "150px",
              textAlign: "center",
            }}
          >
            Asset No.
          </div>
          <div className="categoryNameTitle">Category</div>
          <div className="imageDetailsTitle">Image</div>
          <div className="productNameTitle">Product Name</div>
          <div className="productDetails">Serial No.</div>
          <div className="productDetails">Price</div>
          <div className="productDetails">Warranty</div>
          <div className="productDetails" style={{ paddingRight: "5px" }}>
            Purchase Date
          </div>
          <div className="productDetails">Action</div>
        </div>

        <>
          {filteredProducts?.length == 0 ? (
            <div
              style={{
                width: "100%",
                height: "1500px",
                textAlign: "center",
                fontWeight: "bolder",
                fontSize: "20",
              }}
            >
              No Items
            </div>
          ) : (
            filteredProducts?.map((product, index) => {
              return (
                <>
                  <div className="rowTable">
                    <div
                      className="serialNameTitle"
                      style={{
                        width: "50px",
                        alignContent: "left",
                        paddingLeft: "2.8%",
                      }}
                    >
                      {index + 1}
                    </div>
                    <div
                      className="serialNameTitle"
                      style={{
                        width: "130px",
                        textAlign: "center",
                        paddingRight: "30px",
                      }}
                    >
                      {product?.assetNumber}
                    </div>
                    <div className="categoryDetails">
                      {product?.categoryName}
                    </div>
                    <div className="imageDetails">
                      <img
                        style={{ height: "30px", width: "35px" }}
                        src={`${Server.baseApi}/${product?.productPhoto?.originalPath}`}
                        alt={`${product?.productName}`}
                      />
                    </div>
                    <div className="productName">{product?.productName}</div>
                    <div className="productDetails">
                      {product?.serialNumber}
                    </div>
                    <div
                      className="productDetails"
                      style={{ paddingLeft: "2px" }}
                    >
                      {product?.purchasePrice}
                    </div>
                    <div className="productDetails">
                      {product?.warrantyInYears != null
                        ? product?.warrantyInYears
                        : "N/A"}
                    </div>
                    <div className="productDetails">
                      {product?.warrantyExpireDate != null
                        ? product?.warrantyExpireDate
                        : "N/A"}
                    </div>

                    {/* Action handlers where we can edit and delete inventories */}
                    <div className="productDetails">
                      <img
                        src={EditLine}
                        alt="Edit line"
                        style={{
                          width: 18,
                          height: 21,
                          marginRight: 5,
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          handleEdit(allProducts[index]);
                        }}
                      />
                      <img
                        src={Delete}
                        alt="Delete"
                        onClick={() => {
                          setDeleteModalVisible(true);
                          setDeleteData("first");
                          setMyId(allProducts?.[index]?.id);
                        }}
                        style={{ cursor: "pointer" }}
                      />
                    </div>
                  </div>
                </>
              );
            })
          )}
        </>
      </div>
    </>
  );
}

export default Homepage;
