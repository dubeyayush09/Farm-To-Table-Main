import React from "react";
import Receipt from "../components/Receipt";

const PaymentSuccess = () => {
  // Example order object (usually comes from backend after payment)
  const order = {
    receiptId: "RCT12345",
    orderId: "ORD6789",
    customerName: "Ayush Dubey",
    items: [
      { name: "Fresh Mangoes", qty: 2, price: 200 },
      { name: "Organic Rice", qty: 1, price: 500 },
    ],
    totalAmount: 900,
    paymentMethod: "UPI",
    paymentId: "pay_abc123",
    date: new Date().toLocaleString(),
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Receipt order={order} />
    </div>
  );
};

export default PaymentSuccess;
