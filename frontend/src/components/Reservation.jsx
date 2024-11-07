import React from "react";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Reservation = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const handleReservation = async (e) => {
    e.preventDefault();

    // Form validation
    if (!firstName || !lastName || !email || !date || !time || !phone) {
      toast.error("Please fill in all fields");
      return;
    }

    // Phone number validation
    if (phone.length !== 11) {
      toast.error("Phone number must be 11 digits");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    // Show loading toast
    const loadingToast = toast.loading("Submitting reservation...");

    try {
      console.log("Attempting to connect to server...");
      
      const response = await axios.post(
        "http://localhost:4001/api/v1/reservation/send",
        { 
          firstName, 
          lastName, 
          email, 
          phone, 
          date, 
          time 
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
          timeout: 5000 // 5 second timeout
        }
      );

      // Dismiss loading toast
      toast.dismiss(loadingToast);

      if (response.data.success) {
        toast.success(response.data.message || "Reservation successful!");
        
        // Reset form
        setFirstName("");
        setLastName("");
        setPhone("");
        setEmail("");
        setTime("");
        setDate("");

        // Navigate to success page
        navigate("/success");
      } else {
        toast.error(response.data.message || "Something went wrong");
      }

    } catch (error) {
      // Dismiss loading toast
      toast.dismiss(loadingToast);

      console.error("Reservation error:", error);

      if (error.code === 'ECONNABORTED') {
        toast.error('Request timed out - please try again');
      } else if (!error.response) {
        toast.error('Unable to connect to server - please check if server is running');
      } else if (error.response.status === 400) {
        toast.error(error.response.data.message || "Invalid reservation data");
      } else if (error.response.status === 429) {
        toast.error("Too many requests - please try again later");
      } else {
        toast.error("An unexpected error occurred - please try again");
      }
    }
  };

  return (
    <section className="reservation" id="reservation">
      <div className="container">
        <div className="banner">
          <img src="/reservation.png" alt="res" />
        </div>
        <div className="banner">
          <div className="reservation_form_box">
            <h1>MAKE A RESERVATION</h1>
            <p>For Further Questions, Please Call</p>
            <form onSubmit={handleReservation}>
              <div>
                <input
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  minLength="3"
                  maxLength="30"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  minLength="3"
                  maxLength="30"
                />
              </div>
              <div>
                <input
                  type="date"
                  placeholder="Date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  min={new Date().toISOString().split('T')[0]} // Prevents past dates
                />
                <input
                  type="time"
                  placeholder="Time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  required
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  className="email_tag"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  type="tel"
                  placeholder="Phone (11 digits)"
                  value={phone}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9]/g, '');
                    if (value.length <= 11) {
                      setPhone(value);
                    }
                  }}
                  required
                  pattern="[0-9]{11}"
                  maxLength="11"
                />
              </div>
              <button type="submit">
                RESERVE NOW{" "}
                <span>
                  <HiOutlineArrowNarrowRight />
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reservation;