import React, { useState } from "react";

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState("browse");

  const events = [
    {
      id: 1,
      name: "Tech Conference 2024",
      date: "2024-03-15",
      time: "09:00 AM",
      venue: "Convention Center",
      category: "Technology",
      price: "$50",
      image:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=200&fit=crop",
      description:
        "Join us for the biggest tech conference of the year featuring industry leaders and cutting-edge innovations.",
    },
    {
      id: 2,
      name: "Music Festival",
      date: "2024-04-20",
      time: "06:00 PM",
      venue: "Central Park",
      category: "Entertainment",
      price: "$75",
      image:
        "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=200&fit=crop",
      description:
        "A spectacular evening of live music featuring top artists from around the world.",
    },
    {
      id: 3,
      name: "Business Networking",
      date: "2024-03-25",
      time: "07:00 PM",
      venue: "Grand Hotel",
      category: "Business",
      price: "$30",
      image:
        "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=200&fit=crop",
      description:
        "Connect with industry professionals and expand your business network.",
    },
    {
      id: 4,
      name: "Art Exhibition",
      date: "2024-04-10",
      time: "10:00 AM",
      venue: "Modern Art Gallery",
      category: "Arts",
      price: "$25",
      image:
        "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=200&fit=crop",
      description:
        "Explore contemporary art from emerging and established artists.",
    },
  ];

  const tickets = [
    {
      id: 1,
      eventName: "Tech Conference 2024",
      date: "2024-03-15",
      ticketType: "General Admission",
      price: "$50",
      status: "confirmed",
      qrCode: "ABC123",
    },
    {
      id: 2,
      eventName: "Business Networking",
      date: "2024-03-25",
      ticketType: "VIP Access",
      price: "$75",
      status: "confirmed",
      qrCode: "XYZ789",
    },
  ];

  const categories = [
    "All",
    "Technology",
    "Entertainment",
    "Business",
    "Arts",
    "Sports",
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-slate-100 text-slate-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">
          Discover Events
        </h1>
        <p className="text-slate-600">
          Browse upcoming events and manage your tickets
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab("browse")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === "browse"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
            }`}
          >
            Browse Events
          </button>
          <button
            onClick={() => setActiveTab("tickets")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === "tickets"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
            }`}
          >
            My Tickets ({tickets.length})
          </button>
        </nav>
      </div>

      {/* Browse Events Tab */}
      {activeTab === "browse" && (
        <div className="space-y-6">
          {/* Categories Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                className="px-4 py-2 rounded-full bg-slate-100 text-slate-700 hover:bg-blue-100 hover:text-blue-700 transition-colors text-sm font-medium"
              >
                {category}
              </button>
            ))}
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="h-48 bg-slate-200 relative">
                  <img
                    src={event.image}
                    alt={event.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3">
                    <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                      {event.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-slate-800 mb-2">
                    {event.name}
                  </h3>
                  <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                    {event.description}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-slate-600">
                      <span className="mr-2">📅</span>
                      {event.date} at {event.time}
                    </div>
                    <div className="flex items-center text-sm text-slate-600">
                      <span className="mr-2">📍</span>
                      {event.venue}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-slate-800">
                      {event.price}
                    </span>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* My Tickets Tab */}
      {activeTab === "tickets" && (
        <div className="space-y-6">
          {tickets.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🎫</div>
              <h3 className="text-lg font-medium text-slate-800 mb-2">
                No tickets yet
              </h3>
              <p className="text-slate-600">
                Start browsing events to book your first ticket!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className="bg-white rounded-xl shadow-sm border border-slate-200 p-6"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-800 mb-1">
                        {ticket.eventName}
                      </h3>
                      <p className="text-sm text-slate-600">{ticket.date}</p>
                    </div>
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                        ticket.status
                      )}`}
                    >
                      {ticket.status}
                    </span>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Ticket Type:</span>
                      <span className="font-medium text-slate-800">
                        {ticket.ticketType}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Price:</span>
                      <span className="font-medium text-slate-800">
                        {ticket.price}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">QR Code:</span>
                      <span className="font-mono text-slate-800">
                        {ticket.qrCode}
                      </span>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                      View Details
                    </button>
                    <button className="flex-1 bg-slate-100 text-slate-700 py-2 px-4 rounded-lg hover:bg-slate-200 transition-colors text-sm font-medium">
                      Download
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
