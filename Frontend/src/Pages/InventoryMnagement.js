import React, { useState, useEffect } from "react";
import "./inventoryMnagement.css";
import Header from "../Components/Header";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import axios from "axios";
import logo from "./images/logo.png";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

export default function InventoryManagement() {
  const navigate = useNavigate();
  const [inventory, setInventory] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [originalInventory, setOriginalInventory] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [showLowStock, setShowLowStock] = useState(false);
  const [productOrEquipment, setProductOrEquipment] = useState("All");
  const [lowStockCount, setLowStockCount] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/Product/products")
      .then((items) => {
        setInventory(items.data);
        setOriginalInventory(items.data);
        setLowStockCount(items.data.filter(item => item.rquantity < 10).length);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id, name) => {
    confirmAlert({
        title: 'Confirm Delete',
        message: `Are you sure you want to delete "${name}"?`,
        buttons: [
            {
                label: 'Yes',
                onClick: () => {
                    axios
                        .delete("http://localhost:8000/api/Product/delete/" + id)
                        .then((res) => {
                            console.log("Delete successful:", res);
                            
                            // Set a flag in local storage
                            localStorage.setItem('deleteSuccess', `Product "${name}" deleted successfully!`);
                            
                            // Reload the page
                            window.location.reload();
                        })
                        .catch((err) => console.log(err));
                }
            },
            {
                label: 'No',
                onClick: () => {}
            }
        ]
    });
};

// Check local storage for the flag when the page loads
window.addEventListener('load', () => {
    const deleteMessage = localStorage.getItem('deleteSuccess');
    if (deleteMessage) {
        // Display the toast message
        toast.success(deleteMessage);
        
        // Clear the flag from local storage
        localStorage.removeItem('deleteSuccess');
    }
});



  const addProductClick = () => {
    navigate("/AddProduct");
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
    filterInventory(event.target.value);
  };

  const filterInventory = (query) => {
    if (query === "") {
      setInventory(originalInventory);
    } else {
      const filtered = originalInventory.filter((item) =>
        Object.keys(item).some(
          (key) =>
            key !== "rquantity" &&
            item[key] &&
            item[key]
              .toString()
              .toLowerCase()
              .startsWith(query.toLowerCase())
        )
      );
      setInventory(filtered);
    }
  };

  const handleCategoryChange = (event) => {
    setCategoryFilter(event.target.value);
  };

  const handleProductOrEquipmentChange = (event) => {
    setProductOrEquipment(event.target.value);
  };

  useEffect(() => {
    const filteredInventory = originalInventory.filter((item) =>
      categoryFilter === "All" ? true : item.type === categoryFilter
    ).filter((item) =>
      productOrEquipment === "All" ? true : item.category === productOrEquipment
    );
    setInventory(filteredInventory);
  }, [categoryFilter, productOrEquipment, originalInventory]);

  useEffect(() => {
    if (showLowStock) {
      const lowStockInventory = originalInventory.filter(
        (item) => item.rquantity < 10
      );
      setInventory(lowStockInventory);
    } else {
      setInventory(originalInventory);
    }
  }, [showLowStock, originalInventory]);

  const downloadPDF = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/Product/products"
      );
      const inventoryData = response.data;

      const doc = new jsPDF();

      doc.addImage(logo, "PNG", 10, 5, 40, 40);

      const headerX = doc.internal.pageSize.width - 20;

      doc.setFontSize(14);
      doc.text("SALON OLEX", headerX, 20, { align: "right" });

      doc.setFontSize(12);
      doc.text("A9 Road, Chavakacheri, Jaffna", headerX, 27, {
        align: "right",
      });
      doc.setFontSize(10);
      doc.text("077-1234567/071-7654321", headerX, 32, {
        align: "right",
      });

      doc.setLineWidth(0.5);
      doc.line(8, 42, 200, 42);

      doc.setFont("bold");
      doc.setFontSize(20);
      doc.text("Inventory Report", 80, 60);
      doc.setFont("normal");

      doc.setDrawColor(0);

      const columns = [
        { header: "ID", dataKey: "id" },
        { header: "Name", dataKey: "name" },
        { header: "Type", dataKey: "type" },
        { header: "Category", dataKey: "category" },
        { header: "Date", dataKey: "date" },
        { header: "Remaining qty", dataKey: "remaning" },
        { header: "Price", dataKey: "price" },
      ];

      const rows = inventoryData.map((inventory, index) => ({
        id: index + 1,
        name: inventory.name,
        type: inventory.type,
        category: inventory.category,
        date: inventory.date,
        remaning: inventory.rquantity,
        price: inventory.totalPrice,
      }));

      autoTable(doc, { columns, body: rows, startY: 70 });

      doc.save("Inventory Report.pdf");
    } catch (error) {
      console.error("Error fetching or generating PDF:", error);
    }
  };

  return (
    <div>
      <Header />
      <div className="inventoryManagement">
        <div className="inventoryManagement-header">
          <div className="inventoryManagement-header-left">
            <Sidebar />
            <h1>Inventory Management</h1>
          </div>
          <div className="inventoryManagement-header-right">
            <button
              onClick={addProductClick}
              className="add-new-product-button"
            >
              Add new product
            </button>
            <button onClick={downloadPDF} className="report-button">
              Report
            </button>
          </div>
        </div>
        <div className="inventoryManagement-body">
          <div className="filter-container">
            <div className="filter-dropdowns">
              <div className="category-filter">
                <label>Filter by Category:</label>
                <select
                  value={categoryFilter}
                  onChange={handleCategoryChange}
                >
                  <option value="All">All</option>
                  <option value="Mens">Men</option>
                  <option value="Womens">Women</option>
                  <option value="Kids">Kids</option>
                  <option value="Hair coloring products">
                    Hair coloring products
                  </option>
                  <option value="Furniture">Furniture</option>
                  <option value="Brushes">Brushes</option>
                </select>
              </div>
              <div className="category-filter">
                <label>Filter by Product/Equipment:</label>
                <select
                  value={productOrEquipment}
                  onChange={handleProductOrEquipmentChange}
                >
                  <option value="All">All</option>
                  <option value="Product">Product</option>
                  <option value="Equipment">Equipment</option>
                </select>
              </div>
            </div>
            <div className="low-stock-filter">
              <label>
                Show Low Stock (<span className="low-stock-count">{lowStockCount}</span>):
              </label>
              <input
                type="checkbox"
                checked={showLowStock}
                onChange={() => setShowLowStock(!showLowStock)}
              />
            </div>
          </div>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search Products Through Prices, Category And Names"
              value={searchQuery}
              onChange={handleSearchInputChange}
            />
          </div>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Type</th>
                <th>Category</th>
                <th>Date</th>
                <th>Remaining qty</th>
                <th>Image</th>
                <th>Total Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {inventory.map((inventory, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{inventory.name}</td>
                    <td>{inventory.type}</td>
                    <td>{inventory.category}</td>
                    <td>{inventory.date}</td>
                    <td className="inventory-cell">
                      <span
                        className="inventory-quantity"
                        style={{
                          color:
                            inventory.rquantity < 10 ? "red" : "inherit",
                            fontWeight: inventory.rquantity < 10 ? "bold" : "normal",
                            fontSize: "1.1em",
                        }}
                      >
                        {inventory.rquantity}
                      </span>
                      
                    </td>
                    <td>
                      <img
                        src={inventory.uquantity}
                        alt="Used Quantity"
                        width={100}
                        height={75}
                      />
                    </td>
                    <td>{inventory.totalPrice}</td>
                    <td>
                      <Link to={`/UpdateProduct/${inventory._id}`}>
                        <button className="inventory-table-edit-button">
                          Edit
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDelete(inventory._id, inventory.name)}
                        className="inventory-table-delete-button"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
