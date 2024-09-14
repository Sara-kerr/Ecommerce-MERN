import React, { useState } from "react";
import "../css/CheckOut.css";
import axiosInstance from "../axiosConfig";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function CheckoutForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    wilaya: "",
    commune: "",
    address: "",
    phone: "",
    email: "",
  });

  const { cart, clearCart } = useCart(); // Cart context to get cart items and clearCart function
  const [message, setMessage] = useState(""); // For success or error messages
  const navigate = useNavigate();

  const wilayas = [
    "Adrar",
    "Chlef",
    "Laghouat",
    "Oum El Bouaghi",
    "Batna",
    "Béjaïa",
    "Biskra",
    "Béchar",
    "Blida",
    "Bouira",
    "Tamanrasset",
    "Tébessa",
    "Tlemcen",
    "Tiaret",
    "Tizi Ouzou",
    "Alger",
    "Djelfa",
    "Jijel",
    "Sétif",
    "Saïda",
    "Skikda",
    "Sidi Bel Abbès",
    "Annaba",
    "Guelma",
    "Constantine",
    "Médéa",
    "Mostaganem",
    "M’Sila",
    "Mascara",
    "Ouargla",
    "Oran",
    "El Bayadh",
    "Illizi",
    "Bordj Bou Arreridj",
    "Boumerdès",
    "El Tarf",
    "Tindouf",
    "Tissemsilt",
    "El Oued",
    "Khenchela",
    "Souk Ahras",
    "Tipaza",
    "Mila",
    "Aïn Defla",
    "Naâma",
    "Aïn Témouchent",
    "Ghardaïa",
    "Relizane",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Cart data:", cart);

    try {
      // 1. Post User Data
      const userResponse = await axiosInstance.post("/user", {
        name: formData.fullName,
        wilaya: formData.wilaya,
        commune: formData.commune,
        address: formData.address,
        phoneNumber: formData.phone,
        email: formData.email,
      });

      const userId = userResponse.data._id;
      console.log("User ID:", userId);

      // Log order data before the request
      const orderData = {
        user: userId,
        orderItems: cart.map((item) => ({
          product: item._id,
          quantity: item.quantity ?? 1,
        })),
        shippingAddress: {
          wilaya: formData.wilaya,
          commune: formData.commune,
          address: formData.address,
        },
        totalPrice: cart.reduce(
          (total, item) => total + item.price * (item.quantity ?? 1),
          0
        ),
      };

      console.log("Order data before request:", orderData);

      // 2. Post Order Data
      const orderResponse = await axiosInstance.post("/order", orderData);
      const orderId = orderResponse.data._id;
      console.log("Order ID:", orderId);

      // 3. Update User with the new Order ID
      await axiosInstance.put(`/user/${userId}`, {
        orders: [orderId],
      });

      clearCart();
      setMessage("Order placed successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      setMessage("Error submitting order. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="checkout-form">
      <div className="form-group">
        <label>Nom et Prénom:</label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Pays:</label>
        <input type="text" name="country" value="Algérie" readOnly />
      </div>
      <div className="form-group">
        <label>Wilaya:</label>
        <select
          name="wilaya"
          value={formData.wilaya}
          onChange={handleChange}
          required
        >
          <option value="">Sélectionner une wilaya</option>
          {wilayas.map((wilaya, index) => (
            <option key={index} value={wilaya}>
              {wilaya}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Commune:</label>
        <input
          type="text"
          name="commune"
          value={formData.commune}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Adresse:</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Téléphone:</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className="submit-button">
        Submit
      </button>

      {message && <p>{message}</p>}
    </form>
  );
}

export default CheckoutForm;
