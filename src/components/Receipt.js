import React from "react";
import axios from "axios";

const Receipt = ({ order }) => {
  const handleDownload = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/receipt/generate",
        { order }
      );
      if (response.data.success) {
        const url = `http://localhost:5000${response.data.url}`;
        window.open(url, "_blank"); // opens receipt in new tab
      }
    } catch (err) {
      console.error("Error generating receipt", err);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white shadow-lg rounded-xl p-6 mt-6">
      <h2 className="text-xl font-bold text-center mb-4">
        Payment Successful 🎉
      </h2>

      <div className="mb-4">
        <p>
          <strong>Order ID:</strong> {order.orderId}
        </p>
        <p>
          <strong>Customer:</strong> {order.customerName}
        </p>
        <p>
          <strong>Total:</strong> ₹{order.totalAmount}
        </p>
        <p>
          <strong>Payment Method:</strong> {order.paymentMethod}
        </p>
      </div>

      <button
        onClick={handleDownload}
        className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
      >
        Download Receipt
      </button>
    </div>
  );
};

export default Receipt;
