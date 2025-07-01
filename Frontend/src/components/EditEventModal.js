import React, { useState, useEffect } from "react";

const EditEventModal = ({ isOpen, onClose, event, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    date: "",
    time: "",
    venue: "",
    category: "",
    totalSeats: "",
    priceTiers: [{ name: "General", price: "", seats: "" }],
  });

  const [errors, setErrors] = useState({});

  const categories = [
    "Technology",
    "Entertainment",
    "Business",
    "Arts",
    "Sports",
    "Education",
    "Health",
    "Food",
  ];

  // Pre-fill form when event data changes
  useEffect(() => {
    if (event) {
      setFormData({
        name: event.name || "",
        description: event.description || "",
        date: event.date || "",
        time: event.time || "",
        venue: event.venue || "",
        category: event.category || "",
        totalSeats: event.capacity || "",
        priceTiers: event.priceTiers || [
          { name: "General", price: "", seats: "" },
        ],
      });
    }
  }, [event]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handlePriceTierChange = (index, field, value) => {
    const newPriceTiers = [...formData.priceTiers];
    newPriceTiers[index][field] = value;
    setFormData((prev) => ({
      ...prev,
      priceTiers: newPriceTiers,
    }));
  };

  const addPriceTier = () => {
    setFormData((prev) => ({
      ...prev,
      priceTiers: [...prev.priceTiers, { name: "", price: "", seats: "" }],
    }));
  };

  const removePriceTier = (index) => {
    if (formData.priceTiers.length > 1) {
      const newPriceTiers = formData.priceTiers.filter((_, i) => i !== index);
      setFormData((prev) => ({
        ...prev,
        priceTiers: newPriceTiers,
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Event name is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.date) newErrors.date = "Date is required";
    if (!formData.time) newErrors.time = "Time is required";
    if (!formData.venue.trim()) newErrors.venue = "Venue is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.totalSeats || formData.totalSeats <= 0)
      newErrors.totalSeats = "Total seats must be greater than 0";

    // Validate price tiers
    formData.priceTiers.forEach((tier, index) => {
      if (!tier.name.trim())
        newErrors[`tier${index}Name`] = "Tier name is required";
      if (!tier.price || tier.price <= 0)
        newErrors[`tier${index}Price`] = "Price must be greater than 0";
      if (!tier.seats || tier.seats <= 0)
        newErrors[`tier${index}Seats`] = "Seats must be greater than 0";
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({ ...formData, id: event.id });
    }
  };

  if (!isOpen || !event) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-800">Edit Event</h2>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Event Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.name ? "border-red-500" : "border-slate-300"
                }`}
                placeholder="Enter event name"
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.category ? "border-red-500" : "border-slate-300"
                }`}
              >
                <option value="">Select category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="text-red-500 text-xs mt-1">{errors.category}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.description ? "border-red-500" : "border-slate-300"
              }`}
              placeholder="Describe your event"
            />
            {errors.description && (
              <p className="text-red-500 text-xs mt-1">{errors.description}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Date *
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.date ? "border-red-500" : "border-slate-300"
                }`}
              />
              {errors.date && (
                <p className="text-red-500 text-xs mt-1">{errors.date}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Time *
              </label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.time ? "border-red-500" : "border-slate-300"
                }`}
              />
              {errors.time && (
                <p className="text-red-500 text-xs mt-1">{errors.time}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Total Seats *
              </label>
              <input
                type="number"
                name="totalSeats"
                value={formData.totalSeats}
                onChange={handleInputChange}
                min="1"
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.totalSeats ? "border-red-500" : "border-slate-300"
                }`}
                placeholder="100"
              />
              {errors.totalSeats && (
                <p className="text-red-500 text-xs mt-1">{errors.totalSeats}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Venue *
            </label>
            <input
              type="text"
              name="venue"
              value={formData.venue}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.venue ? "border-red-500" : "border-slate-300"
              }`}
              placeholder="Enter venue address"
            />
            {errors.venue && (
              <p className="text-red-500 text-xs mt-1">{errors.venue}</p>
            )}
          </div>

          {/* Price Tiers */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <label className="block text-sm font-medium text-slate-700">
                Price Tiers
              </label>
              <button
                type="button"
                onClick={addPriceTier}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                + Add Tier
              </button>
            </div>

            <div className="space-y-4">
              {formData.priceTiers.map((tier, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-lg"
                >
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Tier Name
                    </label>
                    <input
                      type="text"
                      value={tier.name}
                      onChange={(e) =>
                        handlePriceTierChange(index, "name", e.target.value)
                      }
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors[`tier${index}Name`]
                          ? "border-red-500"
                          : "border-slate-300"
                      }`}
                      placeholder="e.g., VIP"
                    />
                    {errors[`tier${index}Name`] && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors[`tier${index}Name`]}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Price ($)
                    </label>
                    <input
                      type="number"
                      value={tier.price}
                      onChange={(e) =>
                        handlePriceTierChange(index, "price", e.target.value)
                      }
                      min="0"
                      step="0.01"
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors[`tier${index}Price`]
                          ? "border-red-500"
                          : "border-slate-300"
                      }`}
                      placeholder="50.00"
                    />
                    {errors[`tier${index}Price`] && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors[`tier${index}Price`]}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Seats
                    </label>
                    <input
                      type="number"
                      value={tier.seats}
                      onChange={(e) =>
                        handlePriceTierChange(index, "seats", e.target.value)
                      }
                      min="1"
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors[`tier${index}Seats`]
                          ? "border-red-500"
                          : "border-slate-300"
                      }`}
                      placeholder="50"
                    />
                    {errors[`tier${index}Seats`] && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors[`tier${index}Seats`]}
                      </p>
                    )}
                  </div>

                  <div className="flex items-end">
                    {formData.priceTiers.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removePriceTier(index)}
                        className="w-full bg-red-100 text-red-600 py-2 px-3 rounded-lg hover:bg-red-200 transition-colors text-sm font-medium"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Update Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEventModal;
