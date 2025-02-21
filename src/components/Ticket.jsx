"use client";
import React, { useRef } from "react";
import html2canvas from "html2canvas";
import { FaUser, FaPhone, FaVenusMars, FaHashtag, FaChair, FaDownload, FaWhatsapp } from "react-icons/fa";
import bg from "../../public/tickets.png";

const Ticket = ({ userDetails = {}, phoneNumber = "" }) => {
  const ticketRef = useRef(null);

  const captureTicket = () => {
    if (ticketRef.current) {
      html2canvas(ticketRef.current, { scale: 2 }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = imgData;
        link.download = "event-ticket.png";
        link.click();
      });
    }
  };

  const shareOnWhatsApp = () => {
    const message = encodeURIComponent(
      `🎟️ *Tech Conference 2024*\n\n` +
        `👤 *Name:* ${userDetails.name || "N/A"}\n` +
        `📱 *Phone:* ${phoneNumber || "N/A"}\n` +
        `👥 *Gender:* ${userDetails.sex || "N/A"}\n` +
        `🔢 *Age:* ${userDetails.age || "N/A"}\n` +
        `🪑 *Seat Category:* ${userDetails.seatCategory || "N/A"}\n\n` +
        `🔗 *Event Link:* https://www.swayamvarasilks.com/`
    );

    const whatsappURL = `https://wa.me/918086229572?text=${message}`;
    window.open(whatsappURL, "_blank");
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 ">
      {/* Ticket Container */}
      <div
        ref={ticketRef}
        className="relative w-[550px] h-[320px] rounded-xl overflow-hidden shadow-lg border-2 border-gray-800 bg-black"
      >
        {/* Background Image */}
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${bg.src})` }}
        />
        {/* Overlay for Readability */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        {/* Ticket Content */}
        <div className="relative z-10 p-6  text-white">
          <h2 className="text-xl w-fit p-2 font-bold text-center bg-pink-600 ">
            New Branch Opening Event{" "}
            <span className="bg-white px-3 py-1 rounded-lg text-black font-bold">
              Pass
            </span>
          </h2>

          <div className="mt-4 space-y-2 text-sm">
            <p className="flex items-center gap-2">
              <FaUser className="text-yellow-400" />
              <span className="font-semibold">Name:</span>{" "}
              <span className="text-lg font-bold">{userDetails.name || "N/A"}</span>
            </p>
            <p className="flex items-center gap-2">
              <FaVenusMars className="text-pink-400" />
              <span className="font-semibold">Gender:</span> {userDetails.sex || "N/A"}
            </p>
            <p className="flex items-center gap-2">
              <FaPhone className="text-green-400" />
              <span className="font-semibold">Phone:</span> {phoneNumber || "N/A"}
            </p>
            <p className="flex items-center gap-2">
              <FaHashtag className="text-blue-400" />
              <span className="font-semibold">Age:</span> {userDetails.age || "N/A"}
            </p>
            <p className="flex items-center gap-2">
              <FaChair className="text-purple-400" />
              <span className="font-semibold">Seat Category:</span>{" "}
              {userDetails.seatCategory || "N/A"}
            </p>
          </div>

          <p className="text-center text-xs text-gray-300 mt-4">
            🎫 Scan this QR code at the entrance
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex flex-wrap justify-center gap-4">
        <button
          onClick={captureTicket}
          className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-purple-700 text-white px-6 py-3 rounded-lg shadow-lg hover:scale-105 transition duration-300 transform hover:shadow-purple-500"
        >
          <FaDownload />
          Download Ticket
        </button>

        <button
          onClick={shareOnWhatsApp}
          className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-700 text-white px-6 py-3 rounded-lg shadow-lg hover:scale-105 transition duration-300 transform hover:shadow-green-500"
        >
          <FaWhatsapp />
          Share on WhatsApp
        </button>
      </div>
    </div>
  );
};

export default Ticket;
