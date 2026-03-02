import React, { useEffect } from "react"
import displayRazorpay from "../paymentPage/displayRazorpay" // ✅ correct import

const Payment = () => {
  useEffect(() => {
    // Load Razorpay script once when component mounts
    const script = document.createElement("script")
    script.src = "https://checkout.razorpay.com/v1/checkout.js"
    script.async = true
    document.body.appendChild(script)
  }, [])

  return (
    <div
      style={{
        width: "80%",
        margin: "40px auto",
        backgroundColor: "#f8f4e1",
        borderRadius: "16px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        padding: "20px 40px",
      }}
    >
      {/* Payment Button */}
      <div style={{ textAlign: "center", marginTop: "30px" }}>
        <button
          onClick={displayRazorpay}
          style={{
            backgroundColor: "#feba17",
            color: "#fff",
            padding: "12px 40px",
            border: "none",
            borderRadius: "10px",
            fontSize: "18px",
            fontWeight: "600",
            cursor: "pointer",
            transition: "0.3s",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#74512d")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#feba17")}
        >
          Proceed to Pay
        </button>
      </div>
    </div>
  )
}

export default Payment
