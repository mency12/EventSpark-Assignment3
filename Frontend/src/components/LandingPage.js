import React, { useState } from "react";
import AdminDashboard from "./AdminDashboard";
import OrganizerPanel from "./OrganizerPanel";
import UserDashboard from "./UserDashboard";
import Logo from "./Logo";

const LandingPage = ({ userRole = "user", userName = "User", onLogout }) => {
  const [isLoading, setIsLoading] = useState(false);

  const renderRoleBasedView = () => {
    switch (userRole) {
      case "admin":
        return <AdminDashboard />;
      case "organizer":
        return <OrganizerPanel />;
      case "user":
        return <UserDashboard />;
      default:
        return <UserDashboard />;
    }
  };

  const getRoleDisplayName = (role) => {
    switch (role) {
      case "admin":
        return "Administrator";
      case "organizer":
        return "Event Organizer";
      case "user":
        return "Event Attendee";
      default:
        return "User";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Logo size={40} />
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-slate-600">Welcome back,</p>
                <p className="text-sm font-medium text-slate-800">{userName}</p>
              </div>
              <div className="flex items-center space-x-2 px-3 py-1 bg-slate-100 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs font-medium text-slate-700">
                  {getRoleDisplayName(userRole)}
                </span>
              </div>
              {/* Logout Button */}
              <button
                onClick={onLogout}
                className="ml-4 px-4 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-xs font-medium"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          renderRoleBasedView()
        )}
      </main>
    </div>
  );
};

export default LandingPage;
