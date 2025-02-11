"use client";
import React, { useRef } from "react";
import html2canvas from "html2canvas";
import QRCode from "react-qr-code";

const Ticket = ({ userDetails, phoneNumber }) => {
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
      `👤 *Name:* ${userDetails.name}\n` +
      `📱 *Phone:* ${phoneNumber}\n` +
      `👥 *Gender:* ${userDetails.sex}\n` +
      `🔢 *Age:* ${userDetails.age}\n` +
      `🪑 *Seat Category:* ${userDetails.seatCategory}\n\n` +
      `🔗 *Event Link:* https://www.swayamvarasilks.com/`
    );

    const whatsappURL = `https://wa.me/918086229572?text=${message}`;
    window.open(whatsappURL, "_blank");
  };

  return (
    <div className="flex flex-col h-full items-center justify-center p-4 bg-white">
      <div
        ref={ticketRef}
        className="p-6 rounded-xl w-[380px] border bg-gray-200 shadow-md relative"
      >
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-t-xl"></div>

        <h2 className="text-2xl font-extrabold text-center text-gray-900">
          🎟️ Tech Conference 2024
        </h2>
        <div className="mt-3 space-y-2 text-center text-gray-700">
          <p><span className="font-semibold">Name:</span> {userDetails.name}</p>
          <p><span className="font-semibold">Phone:</span> {phoneNumber}</p>
          <p><span className="font-semibold">Gender:</span> {userDetails.sex}</p>
          <p><span className="font-semibold">Age:</span> {userDetails.age}</p>
          <p><span className="font-semibold">Seat Category:</span> {userDetails.seatCategory}</p>
        </div>

        <div className="flex justify-center my-6">
          <div className="bg-gray-100 p-3 rounded-lg border shadow-md">
            <QRCode 
              value={`https://event.ticket/${phoneNumber}`} 
              size={100} 
            />
          </div>
        </div>

        <p className="text-center text-gray-500 text-sm">
          Scan this QR code at the entrance
        </p>
      </div>

      <div className="mt-6 flex gap-4">
        <button
          onClick={captureTicket}
          className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-lg shadow-lg hover:scale-105 transition transform duration-300"
        >
          Download Ticket 🎟️
        </button>

        <button
          onClick={shareOnWhatsApp}
          className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg hover:scale-105 transition transform duration-300"
        >
          Share on WhatsApp 📲
        </button>
      </div>
    </div>
  );
};

export default Ticket;