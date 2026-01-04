const express=require('express')
const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

exports.generatePdf = async (req, res) => {
  try {
    const { order } = req.body;

    console.log("order at receipt controller is ",order)

    if (!order) {
      return res
        .status(400)
        .json({ success: false, message: "Order data missing" });
    }

    const fileName = `receipt_${order.orderId}.pdf`;
      const receiptsDir = path.join(__dirname, "..", "receipts"); // CHANGED
      const filePath = path.join(receiptsDir, fileName); 

    // Ensure receipts folder exists
    if (!fs.existsSync("receipts")) {
      fs.mkdirSync("receipts");
    }

    // Create PDF
    const doc = new PDFDocument();
    const writeStream = fs.createWriteStream(filePath);
    doc.pipe(writeStream);

    // Header
    doc.fontSize(20).text("Farm to Table - Receipt", { align: "center" });
    doc.moveDown();

    // Order details
    doc.fontSize(12).text(`Receipt ID: ${order.receiptId}`);
    doc.text(`Order ID: ${order.orderId}`);
    // doc.text(`Customer: ${order.customerName}`);
    doc.text(`Payment ID: ${order.paymentId}`);
    doc.text(`Payment Method: ${order.paymentMethod}`);
    doc.text(`Date: ${order.date}`);
    doc.moveDown();

    // Items

    
    doc.text("Items:");
    order.orderDetails.forEach((item) => {
      doc.text(`${item.name} (x${item.qty}) - ₹${item.price}`);
    });

    doc.moveDown();
    doc
      .fontSize(14)
      .text(`Total Amount: ₹${order.totalAmount}`, { bold: true });

    doc.end();

    writeStream.on("finish", () => {
      res.json({
        success: true,
        url: `/receipts/${fileName}`, // frontend can download this
      });
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
