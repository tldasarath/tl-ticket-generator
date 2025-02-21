// "use client";
// import React, { useRef } from "react";
// import html2canvas from "html2canvas";
// import { FaUser, FaPhone, FaVenusMars, FaHashtag, FaChair, FaDownload, FaWhatsapp } from "react-icons/fa";
// import bg from "../../public/tickets.png";

// const Ticket = ({ userDetails = {}, phoneNumber = "" }) => {
//   const ticketRef = useRef(null);

//   const captureTicket = () => {
//     if (ticketRef.current) {
//       html2canvas(ticketRef.current, { scale: 2 }).then((canvas) => {
//         const imgData = canvas.toDataURL("image/png");
//         const link = document.createElement("a");
//         link.href = imgData;
//         link.download = "event-ticket.png";
//         link.click();
//       });
//     }
//   };

//   const shareOnWhatsApp = () => {
//     const message = encodeURIComponent(
//       `🎟️ *Tech Conference 2024*\n\n` +
//         `👤 *Name:* ${userDetails.name || "N/A"}\n` +
//         `📱 *Phone:* ${phoneNumber || "N/A"}\n` +
//         `👥 *Gender:* ${userDetails.sex || "N/A"}\n` +
//         `🔢 *Age:* ${userDetails.age || "N/A"}\n` +
//         `🪑 *Seat Category:* ${userDetails.seatCategory || "N/A"}\n\n` +
//         `🔗 *Event Link:* https://www.swayamvarasilks.com/`
//     );

//     const whatsappURL = `https://wa.me/918086229572?text=${message}`;
//     window.open(whatsappURL, "_blank");
//   };

//   return (
//     <div className="flex flex-col items-center justify-center p-6 ">
//       {/* Ticket Container */}
//       <div
//         ref={ticketRef}
//         className="relative w-[550px] h-[320px] rounded-xl overflow-hidden shadow-lg border-2 border-gray-800 bg-black"
//       >
//         {/* Background Image */}
//         <div
//           className="absolute inset-0 w-full h-full bg-cover bg-center"
//           style={{ backgroundImage: `url(${bg.src})` }}
//         />
//         {/* Overlay for Readability */}
//         <div className="absolute inset-0 bg-black bg-opacity-50"></div>

//         {/* Ticket Content */}
//         <div className="relative z-10 p-6  text-white">
//           <h2 className="text-xl w-fit p-2 font-bold text-center bg-pink-600 ">
//             New Branch Opening Event{" "}
//             <span className="bg-white px-3 py-1 rounded-lg text-black font-bold">
//               Pass
//             </span>
//           </h2>

//           <div className="mt-4 space-y-2 text-sm">
//             <p className="flex items-center gap-2">
//               <FaUser className="text-yellow-400" />
//               <span className="font-semibold">Name:</span>{" "}
//               <span className="text-lg font-bold">{userDetails.name || "N/A"}</span>
//             </p>
//             <p className="flex items-center gap-2">
//               <FaVenusMars className="text-pink-400" />
//               <span className="font-semibold">Gender:</span> {userDetails.sex || "N/A"}
//             </p>
//             <p className="flex items-center gap-2">
//               <FaPhone className="text-green-400" />
//               <span className="font-semibold">Phone:</span> {phoneNumber || "N/A"}
//             </p>
//             <p className="flex items-center gap-2">
//               <FaHashtag className="text-blue-400" />
//               <span className="font-semibold">Age:</span> {userDetails.age || "N/A"}
//             </p>
//             <p className="flex items-center gap-2">
//               <FaChair className="text-purple-400" />
//               <span className="font-semibold">Seat Category:</span>{" "}
//               {userDetails.seatCategory || "N/A"}
//             </p>
//           </div>

//           <p className="text-center text-xs text-gray-300 mt-4">
//             🎫 Scan this QR code at the entrance
//           </p>
//         </div>
//       </div>

//       {/* Action Buttons */}
//       <div className="mt-6 flex flex-wrap justify-center gap-4">
//         <button
//           onClick={captureTicket}
//           className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-purple-700 text-white px-6 py-3 rounded-lg shadow-lg hover:scale-105 transition duration-300 transform hover:shadow-purple-500"
//         >
//           <FaDownload />
//           Download Ticket
//         </button>

//         <button
//           onClick={shareOnWhatsApp}
//           className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-700 text-white px-6 py-3 rounded-lg shadow-lg hover:scale-105 transition duration-300 transform hover:shadow-green-500"
//         >
//           <FaWhatsapp />
//           Share on WhatsApp
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Ticket;
import React, { useRef } from "react";
import html2canvas from "html2canvas";
import { User, Phone, Calendar as GenderMale, Hash, Armchair, Download, Share2, MapPin, Calendar, Clock, Ticket as TicketIcon } from 'lucide-react';

function Ticket() {
  const ticketRef = useRef(null);
  const userDetails = {
    name: "Sarah Johnson",
    sex: "Female",
    age: "28",
    seatCategory: "VIP"
  };
  const phoneNumber = "+1 (555) 123-4567";

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
      `🎟️ *Grand Opening Celebration*\n\n` +
      `👤 *Name:* ${userDetails.name}\n` +
      `📱 *Phone:* ${phoneNumber}\n` +
      `👥 *Gender:* ${userDetails.sex}\n` +
      `🔢 *Age:* ${userDetails.age}\n` +
      `🪑 *Seat Category:* ${userDetails.seatCategory}\n\n` +
      `📍 Join us for an unforgettable evening!`
    );
    window.open(`https://wa.me/?text=${message}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-500 via-pink-400 to-pink-300 flex flex-col items-center justify-center p-6">
      {/* Demo Preview */}
      <div className="mb-8 text-center">
        <h2 className="text-white text-2xl font-bold mb-4">Your Digital Event Pass</h2>
        <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl inline-block">
          <img 
            src="https://images.unsplash.com/photo-1589041127168-9b1915731dc6?q=80&w=800" 
            alt="Textile Store Opening"
            className="w-[300px] h-[200px] object-cover rounded-lg shadow-lg mb-4"
          />
          <p className="text-white text-sm">Join us for an exclusive shopping experience</p>
        </div>
      </div>

      {/* Ticket Container */}
      <div
        ref={ticketRef}
        className="relative w-[600px] bg-white rounded-2xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-300"
      >
        {/* Header Section with Background Image */}
        <div 
          className="relative h-48 bg-cover bg-center p-6 text-white overflow-hidden"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1606743776248-a4e5ea3665c8?q=80&w=1200")',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500/90 to-pink-400/90"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <TicketIcon className="w-6 h-6" />
              <span className="text-sm font-medium uppercase tracking-wider">Exclusive Pass</span>
            </div>
            <h1 className="text-3xl font-bold mb-2">Grand Opening Celebration</h1>
            <div className="flex gap-6 text-sm">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>March 25, 2024</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>6:00 PM</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>Main Showroom</span>
              </div>
            </div>
          </div>
        </div>

        {/* Ticket Content */}
        <div className="p-6">
          <div className="grid grid-cols-2 gap-8">
            {/* Left Column - User Details */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="bg-pink-50 p-2 rounded-lg">
                  <User className="w-5 h-5 text-pink-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="font-semibold">{userDetails.name}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-pink-50 p-2 rounded-lg">
                  <Phone className="w-5 h-5 text-pink-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-semibold">{phoneNumber}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-pink-50 p-2 rounded-lg">
                  <GenderMale className="w-5 h-5 text-pink-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Gender</p>
                  <p className="font-semibold">{userDetails.sex}</p>
                </div>
              </div>
            </div>

            {/* Right Column - Additional Details */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="bg-pink-50 p-2 rounded-lg">
                  <Hash className="w-5 h-5 text-pink-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Age</p>
                  <p className="font-semibold">{userDetails.age}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-pink-50 p-2 rounded-lg">
                  <Armchair className="w-5 h-5 text-pink-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Seat Category</p>
                  <p className="font-semibold">{userDetails.seatCategory}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Event Image and Description */}
          <div className="mt-6 relative rounded-xl overflow-hidden">
            <div className="h-40 relative">
              <img 
                src="https://images.unsplash.com/photo-1612423284934-2850a4ea6b0f?q=80&w=1200" 
                alt="Luxury Textiles"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <p className="text-lg font-semibold mb-1">Exclusive Preview</p>
                <p className="text-sm opacity-90">
                  Be among the first to experience our curated collection of premium textiles and traditional wear
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-pink-50 p-4 border-t border-pink-100">
          <p className="text-center text-sm text-pink-500">
            #GrandOpening2024 • www.example.com
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex gap-4">
        <button
          onClick={captureTicket}
          className="flex items-center gap-2 bg-white text-pink-500 px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition duration-300 font-medium"
        >
          <Download className="w-5 h-5" />
          Download Ticket
        </button>

        <button
          onClick={shareOnWhatsApp}
          className="flex items-center gap-2 bg-pink-500 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition duration-300 font-medium"
        >
          <Share2 className="w-5 h-5" />
          Share Ticket
        </button>
      </div>
    </div>
  );
}

export default Ticket;