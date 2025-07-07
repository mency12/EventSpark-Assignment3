import React, { useState } from "react";
import AddEventModal from "./AddEventModal";
import EditEventModal from "./EditEventModal";
import DeleteEventModal from "./DeleteEventModal";

const OrganizerPanel = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const events = [
    {
      id: 1,
      name: "Tech Conference 2024",
      date: "2024-03-15",
      time: "09:00 AM",
      venue: "Convention Center",
      category: "Technology",
      status: "active",
      attendees: 150,
      capacity: 200,
      revenue: "$7,500",
    },
    {
      id: 2,
      name: "Music Festival",
      date: "2024-04-20",
      time: "06:00 PM",
      venue: "Central Park",
      category: "Entertainment",
      status: "draft",
      attendees: 0,
      capacity: 500,
      revenue: "$0",
    },
    {
      id: 3,
      name: "Business Networking",
      date: "2024-03-25",
      time: "07:00 PM",
      venue: "Grand Hotel",
      category: "Business",
      status: "active",
      attendees: 75,
      capacity: 100,
      revenue: "$3,750",
    },
  ];

  const stats = [
    { title: "Total Events", value: events.length, icon: "📅" },
    {
      title: "Active Events",
      value: events.filter((e) => e.status === "active").length,
      icon: "✅",
    },
    { title: "Total Revenue", value: "$11,250", icon: "💰" },
    { title: "Total Attendees", value: "225", icon: "👥" },
  ];

  const handleEditEvent = (event) => {
    setSelectedEvent(event);
    setShowEditModal(true);
  };

  const handleDeleteEvent = (event) => {
    setSelectedEvent(event);
    setShowDeleteModal(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "draft":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-slate-100 text-slate-800";
    }
  };

  return (
    <div className="space-y-6 px-2 sm:px-4 md:px-8 lg:px-16 xl:px-32 max-w-7xl mx-auto w-full">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 gap-2 sm:gap-0">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-1 sm:mb-2">
            Event Management
          </h1>
          <p className="text-slate-600 text-sm sm:text-base">Create and manage your events</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="mt-2 sm:mt-0 bg-blue-600 text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center space-x-2 text-xs sm:text-sm"
        >
          <span>+</span>
          <span>Add Event</span>
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-6 min-w-0"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-slate-600 mb-1">
                  {stat.title}
                </p>
                <p className="text-xl sm:text-2xl font-bold text-slate-800">
                  {stat.value}
                </p>
              </div>
              <div className="text-2xl sm:text-3xl">{stat.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Events Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-x-auto">
        <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-slate-200">
          <h2 className="text-lg sm:text-xl font-semibold text-slate-800">Your Events</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] text-xs sm:text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 sm:px-6 py-2 sm:py-3 text-left font-medium text-slate-500 uppercase tracking-wider whitespace-nowrap">
                  Event
                </th>
                <th className="px-4 sm:px-6 py-2 sm:py-3 text-left font-medium text-slate-500 uppercase tracking-wider whitespace-nowrap">
                  Date & Time
                </th>
                <th className="px-4 sm:px-6 py-2 sm:py-3 text-left font-medium text-slate-500 uppercase tracking-wider whitespace-nowrap">
                  Venue
                </th>
                <th className="px-4 sm:px-6 py-2 sm:py-3 text-left font-medium text-slate-500 uppercase tracking-wider whitespace-nowrap">
                  Status
                </th>
                <th className="px-4 sm:px-6 py-2 sm:py-3 text-left font-medium text-slate-500 uppercase tracking-wider whitespace-nowrap">
                  Attendees
                </th>
                <th className="px-4 sm:px-6 py-2 sm:py-3 text-left font-medium text-slate-500 uppercase tracking-wider whitespace-nowrap">
                  Revenue
                </th>
                <th className="px-4 sm:px-6 py-2 sm:py-3 text-left font-medium text-slate-500 uppercase tracking-wider whitespace-nowrap">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {events.map((event) => (
                <tr
                  key={event.id}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <td className="px-4 sm:px-6 py-3 whitespace-nowrap">
                    <div>
                      <div className="font-medium text-slate-800">
                        {event.name}
                      </div>
                      <div className="text-slate-500">
                        {event.category}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-3 whitespace-nowrap">
                    <div className="text-slate-800">{event.date}</div>
                    <div className="text-slate-500">{event.time}</div>
                  </td>
                  <td className="px-4 sm:px-6 py-3 whitespace-nowrap text-slate-800">
                    {event.venue}
                  </td>
                  <td className="px-4 sm:px-6 py-3 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                        event.status
                      )}`}
                    >
                      {event.status}
                    </span>
                  </td>
                  <td className="px-4 sm:px-6 py-3 whitespace-nowrap text-slate-800">
                    {event.attendees}/{event.capacity}
                  </td>
                  <td className="px-4 sm:px-6 py-3 whitespace-nowrap font-medium text-slate-800">
                    {event.revenue}
                  </td>
                  <td className="px-4 sm:px-6 py-3 whitespace-nowrap font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditEvent(event)}
                        className="text-blue-600 hover:text-blue-900 transition-colors text-xs sm:text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteEvent(event)}
                        className="text-red-600 hover:text-red-900 transition-colors text-xs sm:text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      {showAddModal && (
        <AddEventModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onSubmit={(eventData) => {
            console.log("Add event:", eventData);
            setShowAddModal(false);
          }}
        />
      )}

      {showEditModal && selectedEvent && (
        <EditEventModal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          event={selectedEvent}
          onSubmit={(eventData) => {
            console.log("Update event:", eventData);
            setShowEditModal(false);
          }}
        />
      )}

      {showDeleteModal && selectedEvent && (
        <DeleteEventModal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          event={selectedEvent}
          onConfirm={() => {
            console.log("Delete event:", selectedEvent.id);
            setShowDeleteModal(false);
          }}
        />
      )}
    </div>
  );
};

export default OrganizerPanel;
