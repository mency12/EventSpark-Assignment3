import React from "react";

const AdminDashboard = () => {
  const stats = [
    {
      title: "Total Users",
      value: "1,234",
      change: "+12%",
      changeType: "positive",
      icon: "👥",
    },
    {
      title: "Active Events",
      value: "45",
      change: "+8%",
      changeType: "positive",
      icon: "🎉",
    },
    {
      title: "Total Revenue",
      value: "$12,450",
      change: "+23%",
      changeType: "positive",
      icon: "💰",
    },
    {
      title: "Pending Approvals",
      value: "7",
      change: "-3",
      changeType: "negative",
      icon: "⏳",
    },
  ];

  const recentActivities = [
    {
      id: 1,
      action: "New user registered",
      user: "john@example.com",
      time: "2 minutes ago",
    },
    {
      id: 2,
      action: "Event created",
      user: "Tech Conference 2024",
      time: "15 minutes ago",
    },
    { id: 3, action: "Payment processed", user: "$150.00", time: "1 hour ago" },
    {
      id: 4,
      action: "User role updated",
      user: "admin@example.com",
      time: "2 hours ago",
    },
  ];

  return (
    <div className="space-y-6 px-2 sm:px-4 md:px-8 lg:px-16 xl:px-32 max-w-7xl mx-auto w-full">
      {/* Page Header */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-1 sm:mb-2">
            Admin Dashboard
          </h1>
          <p className="text-slate-600 text-sm sm:text-base">
            Monitor your platform's performance and user activity
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-6 hover:shadow-md transition-shadow min-w-0"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-slate-600 mb-1">
                  {stat.title}
                </p>
                <p className="text-xl sm:text-2xl font-bold text-slate-800">
                  {stat.value}
                </p>
                <div className="flex items-center mt-2">
                  <span
                    className={`text-xs sm:text-sm font-medium ${
                      stat.changeType === "positive"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {stat.change}
                  </span>
                  <span className="text-xs sm:text-sm text-slate-500 ml-1">
                    from last month
                  </span>
                </div>
              </div>
              <div className="text-2xl sm:text-3xl">{stat.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold text-slate-800 mb-3 sm:mb-4">
            Recent Activity
          </h2>
          <div className="space-y-3 sm:space-y-4">
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 p-2 sm:p-3 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-xs sm:text-sm font-medium text-slate-800">
                    {activity.action}
                  </p>
                  <p className="text-xs text-slate-500">{activity.user}</p>
                </div>
                <span className="text-xs text-slate-400">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-6 flex flex-col gap-2 sm:gap-3">
          <h2 className="text-lg sm:text-xl font-semibold text-slate-800 mb-2 sm:mb-4">
            Quick Actions
          </h2>
          <button className="w-full bg-blue-600 text-white py-2 px-2 sm:px-4 rounded-lg hover:bg-blue-700 transition-colors text-xs sm:text-sm font-medium">
            View All Users
          </button>
          <button className="w-full bg-green-600 text-white py-2 px-2 sm:px-4 rounded-lg hover:bg-green-700 transition-colors text-xs sm:text-sm font-medium">
            Approve Events
          </button>
          <button className="w-full bg-purple-600 text-white py-2 px-2 sm:px-4 rounded-lg hover:bg-purple-700 transition-colors text-xs sm:text-sm font-medium">
            Generate Reports
          </button>
          <button className="w-full bg-slate-100 text-slate-700 py-2 px-2 sm:px-4 rounded-lg hover:bg-slate-200 transition-colors text-xs sm:text-sm font-medium">
            System Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
