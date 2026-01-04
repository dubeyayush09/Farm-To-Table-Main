import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import Header from '../components/Header';
import { ProductContext } from '../ProductsCatalog/ProductContext';

const Payment = () => {
  const navigate = useNavigate();
  const { user } = useContext(ProductContext);
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Get order details from localStorage
    const storedOrder = localStorage.getItem('currentOrder');
    if (!storedOrder) {
      setError('No order found. Please return to cart.');
      return;
    }

    try {
      const order = JSON.parse(storedOrder);
      setOrderDetails(order);
      // initializePayment(order);
    } catch (err) {
      setError('Invalid order data. Please return to cart.');
    }
  }, []);

  const initializePayment = async (order) => {
    try {
      setLoading(true);

       // wait for user to be available before initializing (if you require it)
     if (!user) {
        // optionally show message or wait for user to load
        setError('User data not loaded yet. Please sign in or try again.');
        setLoading(false);
        return;
     }
     
    // ensure Razorpay SDK is loaded
      const loadRazorpayScript = () =>
        new Promise((resolve) => {
        if (window.Razorpay) return resolve(true);
        const script = document.createElement('script');
          script.src = 'https://checkout.razorpay.com/v1/checkout.js';
          script.onload = () => resolve(true);
         script.onerror = () => resolve(false);
           document.body.appendChild(script);
       });

      const sdkLoaded = await loadRazorpayScript();
      if (!sdkLoaded) throw new Error('Failed to load Razorpay SDK.');
      
      // Create Razorpay order
      const paymentOrderResponse = await axios.post(
        'http://localhost:4000/payment/api/v2/create-order',
        {
          amount: order.totalAmount,
          order_id: order.orderId,
          currency: 'INR'
        },
        { withCredentials: true }
      );

      if (!paymentOrderResponse.data.success) {
        throw new Error(paymentOrderResponse.data.message);
      }

      const razorpayOrder = paymentOrderResponse.data;

      // Initialize Razorpay
      const options = {
        key: 'rzp_test_jG5wUpmmR3HAFT', // Replace with your actual key
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        name: "Farm to Table",
        description: `Order ${order.orderId}`,
        order_id: razorpayOrder.orderId,
        handler: async (response) => {
          await handlePaymentSuccess(response, order);
        },
        prefill: {
          name: user?.first_name || "Customer Name",
          email: user?.email || "customer@example.com",
          contact: user?.phone || "9999999999",
        },
        theme: {
          color: "#10B981",
        },
        modal: {
          ondismiss: () => {
            setPaymentStatus("cancelled");
            setLoading(false);
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (err) {
      console.error('Payment initialization error:', err);
      setError('Failed to initialize payment. Please try again.');
      setLoading(false);
    }
  };

  console.log("Customer id of user is ",user?.customer_id);


  const handleDownloadReceipt = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/receipt/generate",
        {
          order: orderDetails, // send your order details
        }
      );

      if (response.data.success) {
        const url = `http://localhost:4000${response.data.url}`;
        window.open(url, "_blank"); // open receipt in new tab
      }
    } catch (err) {
      console.error("Error generating receipt:", err);
    }
  };
   console.log("user at payment ",user);

  const handlePaymentSuccess = async (response, order) => {
    try {
      setLoading(true);
      
      // Verify payment with backend
      const verificationResponse = await axios.post(
        'http://localhost:4000/payment/api/v2/verify',
        {
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
          order_id: order.orderId,
          customer_id: user?.customer_id || order?.customer_id || null,
          amount: order.totalAmount
        },
        { withCredentials: true }
      );

      if (verificationResponse.data.success) {
        setPaymentStatus('success');


         const enrichedOrder = {
           ...order,
           paymentId: response.razorpay_payment_id,
           paymentMethod: "Razorpay",
           receiptId: `RCT_${Date.now()}`,
           date: new Date().toLocaleString(),
         };

         setOrderDetails(enrichedOrder);
        // Clear order from localStorage
        localStorage.removeItem('currentOrder');
      } else {
        setPaymentStatus('failed');
        setError(verificationResponse.data.message);
      }

    } catch (err) {
      console.error('Payment verification error:', err);
      setPaymentStatus('failed');
      setError('Payment verification failed. Please contact support.');
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    setPaymentStatus(null);
    setError(null);
    if (orderDetails) {
      initializePayment(orderDetails);
    }
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  const handleViewOrders = () => {
    navigate('/orders');
  };

  if (error && !orderDetails) {
   return (
     <div className="min-h-screen flex flex-col bg-gradient-to-br from-red-50 to-red-100">
       <Header />
       <div className="flex-1 flex items-center justify-center px-4">
         <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-md w-full text-center">
           <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center rounded-full bg-red-100">
             <XCircle className="w-12 h-12 text-red-500" />
           </div>
           <h2 className="text-3xl font-extrabold text-gray-900 mb-3">
             Payment Error
           </h2>
           <p className="text-gray-600 mb-8">{error}</p>
           <button
             onClick={handleBackToHome}
             className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:bg-green-700 transition-all"
           >
             Back to Home
           </button>
         </div>
       </div>
     </div>
   );

  }

if (paymentStatus === "success") {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 to-green-100">
      <Header />
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-md w-full text-center">
          <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>

          <h2 className="text-3xl font-extrabold text-gray-900 mb-3">
            Payment Successful!
          </h2>
          <p className="text-gray-600 mb-3">
            Your order has been placed successfully.
          </p>
          <p className="text-sm text-gray-500 mb-8">
            Order ID: {orderDetails?.orderId}
          </p>

          {/* ✅ Buttons for navigation */}
          <div className="flex justify-center gap-4 mb-6">
            <button
              onClick={handleViewOrders}
              className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:bg-green-700 transition-all"
            >
              View Orders
            </button>
            <button
              onClick={handleBackToHome}
              className="bg-gray-600 text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:bg-gray-700 transition-all"
            >
              Back to Home
            </button>
          </div>

          {/* ✅ Receipt Download Button */}
          <button
            onClick={handleDownloadReceipt} // create this function
            className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:bg-blue-700 transition-all"
          >
            Download Receipt
          </button>
        </div>
      </div>
    </div>
  );
}


  if (paymentStatus === 'failed') {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-red-50 to-red-100">
        <Header />
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-md w-full text-center">
            <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center rounded-full bg-red-100">
              <XCircle className="w-12 h-12 text-red-600" />
            </div>

            <h2 className="text-3xl font-extrabold text-gray-900 mb-3">
              Payment Failed
            </h2>
            <p className="text-gray-600 mb-8">
              {error || "Something went wrong with your payment."}
            </p>

            <div className="flex justify-center gap-4">
              <button
                onClick={handleRetry}
                className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:bg-green-700 transition-all"
              >
                Try Again
              </button>
              <button
                onClick={handleBackToHome}
                className="bg-gray-600 text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:bg-gray-700 transition-all"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );

  }

  if (paymentStatus === 'cancelled') {
   return (
     <div className="min-h-screen flex flex-col bg-gradient-to-br from-yellow-50 to-yellow-100">
       <Header />
       <div className="flex-1 flex items-center justify-center px-4">
         <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-md w-full text-center">
           <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center rounded-full bg-yellow-100">
             <XCircle className="w-12 h-12 text-yellow-500" />
           </div>

           <h2 className="text-3xl font-extrabold text-gray-900 mb-3">
             Payment Cancelled
           </h2>
           <p className="text-gray-600 mb-8">
             You cancelled the payment process.
           </p>

           <div className="flex justify-center gap-4">
             <button
               onClick={handleRetry}
               className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:bg-green-700 transition-all"
             >
               Try Again
             </button>
             <button
               onClick={handleBackToHome}
               className="bg-gray-600 text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:bg-gray-700 transition-all"
             >
               Back to Home
             </button>
           </div>
         </div>
       </div>
     </div>
   );

  }

 return (
   <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 to-green-100">
     <Header />
     <div className="flex-1 flex items-center justify-center p-6">
       <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md text-center">
         {loading ? (
           <>
             <Loader2 className="w-16 h-16 text-green-500 mx-auto mb-6 animate-spin" />
             <h2 className="text-2xl font-bold text-gray-800 mb-2">
               Processing Payment
             </h2>
             <p className="text-gray-600">
               Please wait while we redirect you to the payment gateway...
             </p>
           </>
         ) : (
           <>
             <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
               <span className="text-3xl">💰</span>
             </div>
             <h2 className="text-2xl font-bold text-gray-800 mb-2">
               Complete Your Payment
             </h2>
             <p className="text-lg font-semibold text-green-600 mb-2">
               Order Total: ₹{orderDetails?.totalAmount}
             </p>
             <p className="text-sm text-gray-500 mb-6">
               Order ID:{" "}
               <span className="font-medium">{orderDetails?.orderId}</span>
             </p>
             <div className="space-y-3 text-left bg-gray-50 p-4 rounded-xl">
               <p className="text-sm text-gray-700 flex items-center">
                 ✅ Secure payment via Razorpay
               </p>
               <p className="text-sm text-gray-700 flex items-center">
                 💳 Multiple payment options available
               </p>
               <p className="text-sm text-gray-700 flex items-center">
                 ⚡ Instant order confirmation
               </p>
             </div>
            <button
            onClick={() => initializePayment(orderDetails)}
              disabled={!orderDetails || loading || !user}
              title={!user ? 'Sign in required' : undefined}
              className="mt-6 w-full py-3 rounded-xl bg-green-500 hover:bg-green-600 text-white font-semibold shadow-md transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
               Proceed to Pay
             </button>
           </>
         )}
       </div>
     </div>
   </div>
 );

};

export default Payment;
