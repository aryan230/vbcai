"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../lib/firebase";
import {
  X,
  CalendarClock,
  Mail,
  User,
  Building,
  Phone,
  Check,
  Loader2,
  ChevronLeft,
  ChevronRight,
  Clock,
} from "lucide-react";
import {
  format,
  addDays,
  startOfWeek,
  addWeeks,
  isSameDay,
  parse,
} from "date-fns";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "getStarted" | "scheduleDemo";
}

function CTA2() {
  const [activeModal, setActiveModal] = useState<
    "getStarted" | "scheduleDemo" | null
  >(null);

  const handleGetStarted = () => setActiveModal("getStarted");
  const handleScheduleDemo = () => setActiveModal("scheduleDemo");
  const handleCloseModal = () => setActiveModal(null);

  return (
    <section className="my-24 text-center">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-900 via-blue-600 to-blue-900 bg-clip-text text-transparent">
          Ready to Transform Your Healthcare Delivery?
        </h2>
        <p className="text-blue-900/70 mb-8">
          Join leading healthcare organizations in their journey towards
          value-based care excellence.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <button
            onClick={handleGetStarted}
            className="w-full sm:w-auto px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Get Started
          </button>
          <button
            onClick={handleScheduleDemo}
            className="w-full sm:w-auto px-8 py-3 border border-blue-200 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
          >
            Schedule Demo
          </button>
        </div>
      </div>

      {/* Dynamic Modal based on which button was clicked */}
      <DynamicModal
        isOpen={activeModal !== null}
        onClose={handleCloseModal}
        type={activeModal || "getStarted"}
      />
    </section>
  );
}

function DynamicModal({ isOpen, onClose, type }: ModalProps) {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    organization: "",
    phone: "",
    message: "",
  });

  // For Schedule Demo modal
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [currentWeekStart, setCurrentWeekStart] = useState(
    startOfWeek(new Date(), { weekStartsOn: 1 })
  );
  const [step, setStep] = useState<1 | 2>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  // Available time slots
  const timeSlots = [
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const nextWeek = () => {
    setCurrentWeekStart(addWeeks(currentWeekStart, 1));
  };

  const prevWeek = () => {
    setCurrentWeekStart(addWeeks(currentWeekStart, -1));
  };

  const validateForm = () => {
    // For step 1 of schedule demo, only validate date and time selection
    if (type === "scheduleDemo" && step === 1) {
      if (!selectedDate || !selectedTime) {
        setError("Please select both a date and time");
        return false;
      }
      return true;
    }

    // For step 2 and get started form, validate name and email
    if (!formState.name.trim()) {
      setError("Please enter your name");
      return false;
    }

    if (
      !formState.email.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)
    ) {
      setError("Please enter a valid email address");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      await addDoc(collection(db, "subscribe"), {
        name: formState.name,
        email: formState.email,
        organization: formState.organization,
        phone: formState.phone,
        message: formState.message,
        source: type === "getStarted" ? "get_started" : "schedule_demo",
        timestamp: serverTimestamp(),
        ...(type === "scheduleDemo" && {
          scheduledDate: selectedDate
            ? format(selectedDate, "yyyy-MM-dd")
            : null,
          scheduledTime: selectedTime,
        }),
      });

      setIsSuccess(true);

      // Reset form after success
      setTimeout(() => {
        setIsSubmitting(false);
        setFormState({
          name: "",
          email: "",
          organization: "",
          phone: "",
          message: "",
        });
        setSelectedDate(null);
        setSelectedTime(null);
        setStep(1);
        setIsSuccess(false);
        onClose();
      }, 3000);
    } catch (err) {
      console.error("Error submitting form: ", err);
      setError("Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  };

  const getDateArray = () => {
    const dates = [];
    for (let i = 0; i < 5; i++) {
      dates.push(addDays(currentWeekStart, i));
    }
    return dates;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 backdrop-blur-sm"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md mx-auto"
            >
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                {/* Header with gradient */}
                <div className="relative bg-gradient-to-r from-blue-900 via-blue-600 to-blue-700 text-white p-6">
                  <button
                    onClick={onClose}
                    className="absolute right-4 top-4 text-white/80 hover:text-white"
                    aria-label="Close"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-full mb-4">
                    {type === "getStarted" ? (
                      <Mail className="w-6 h-6" />
                    ) : (
                      <CalendarClock className="w-6 h-6" />
                    )}
                  </div>
                  <h3 className="text-xl font-bold mb-2">
                    {type === "getStarted"
                      ? "Get Started with VBC"
                      : "Schedule a Demo"}
                  </h3>
                  <p className="text-blue-100">
                    {type === "getStarted"
                      ? "Fill out the form below and our team will reach out to you shortly."
                      : "Choose a convenient date and time for your personalized demo."}
                  </p>
                </div>

                {/* Content */}
                <div className="p-6">
                  {!isSuccess ? (
                    <form onSubmit={handleSubmit} className="text-left">
                      {error && (
                        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg flex items-start">
                          <div className="flex-shrink-0 mt-0.5">
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM8 4C8.55228 4 9 4.44772 9 5V9C9 9.55228 8.55228 10 8 10C7.44772 10 7 9.55228 7 9V5C7 4.44772 7.44772 4 8 4ZM9 12C9 12.5523 8.55228 13 8 13C7.44772 13 7 12.5523 7 12C7 11.4477 7.44772 11 8 11C8.55228 11 9 11.4477 9 12Z"
                                fill="currentColor"
                              />
                            </svg>
                          </div>
                          <span className="ml-2">{error}</span>
                        </div>
                      )}

                      {/* Dynamic content based on modal type and step */}
                      {type === "getStarted" ||
                      (type === "scheduleDemo" && step === 2) ? (
                        <>
                          <div className="space-y-4">
                            <div>
                              <label
                                htmlFor="name"
                                className="block text-left text-sm font-medium text-gray-700 mb-1"
                              >
                                Your Name*
                              </label>
                              <div className="relative">
                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                  type="text"
                                  id="name"
                                  name="name"
                                  value={formState.name}
                                  onChange={handleInputChange}
                                  placeholder="John Doe"
                                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300"
                                  required
                                />
                              </div>
                            </div>

                            <div>
                              <label
                                htmlFor="email"
                                className="block text-left text-sm font-medium text-gray-700 mb-1"
                              >
                                Email Address*
                              </label>
                              <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                  type="email"
                                  id="email"
                                  name="email"
                                  value={formState.email}
                                  onChange={handleInputChange}
                                  placeholder="your@email.com"
                                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300"
                                  required
                                />
                              </div>
                            </div>

                            <div>
                              <label
                                htmlFor="organization"
                                className="block text-left text-sm font-medium text-gray-700 mb-1"
                              >
                                Organization
                              </label>
                              <div className="relative">
                                <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                  type="text"
                                  id="organization"
                                  name="organization"
                                  value={formState.organization}
                                  onChange={handleInputChange}
                                  placeholder="Your organization"
                                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300"
                                />
                              </div>
                            </div>

                            <div>
                              <label
                                htmlFor="phone"
                                className="block text-left text-sm font-medium text-gray-700 mb-1"
                              >
                                Phone Number
                              </label>
                              <div className="relative">
                                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                  type="tel"
                                  id="phone"
                                  name="phone"
                                  value={formState.phone}
                                  onChange={handleInputChange}
                                  placeholder="(123) 456-7890"
                                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300"
                                />
                              </div>
                            </div>

                            {type === "getStarted" && (
                              <div>
                                <label
                                  htmlFor="message"
                                  className="block text-left text-sm font-medium text-gray-700 mb-1"
                                >
                                  Message (Optional)
                                </label>
                                <textarea
                                  id="message"
                                  name="message"
                                  value={formState.message}
                                  onChange={handleInputChange}
                                  placeholder="Tell us about your needs or questions..."
                                  rows={3}
                                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300"
                                />
                              </div>
                            )}

                            {type === "scheduleDemo" && (
                              <div className="bg-blue-50 rounded-lg p-3 mb-2 flex items-center">
                                <CalendarClock className="w-5 h-5 text-blue-600 mr-2" />
                                <div className="text-left text-sm">
                                  <span className="font-medium block">
                                    Selected time:
                                  </span>
                                  <span className="text-blue-700">
                                    {selectedDate &&
                                      format(selectedDate, "MMMM d, yyyy")}{" "}
                                    at {selectedTime}
                                  </span>
                                </div>
                              </div>
                            )}

                            <div className="flex justify-between mt-6">
                              {type === "scheduleDemo" && (
                                <button
                                  type="button"
                                  onClick={() => setStep(1)}
                                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100"
                                >
                                  Back
                                </button>
                              )}

                              <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors ${
                                  type === "scheduleDemo" ? "ml-auto" : "w-full"
                                }`}
                              >
                                {isSubmitting ? (
                                  <div className="flex items-center justify-center">
                                    <Loader2 className="animate-spin mr-2 h-5 w-5" />
                                    <span>Submitting...</span>
                                  </div>
                                ) : (
                                  "Submit"
                                )}
                              </button>
                            </div>
                          </div>
                        </>
                      ) : (
                        /* Schedule Demo Calendar UI (Step 1) */
                        <div className="space-y-6">
                          {/* Calendar Header */}
                          <div className="flex justify-between items-center mb-4">
                            <button
                              onClick={prevWeek}
                              className="p-2 hover:bg-gray-100 rounded-full"
                              aria-label="Previous week"
                            >
                              <ChevronLeft className="w-5 h-5" />
                            </button>
                            <h4 className="font-medium">
                              {format(currentWeekStart, "MMMM yyyy")}
                            </h4>
                            <button
                              onClick={nextWeek}
                              className="p-2 hover:bg-gray-100 rounded-full"
                              aria-label="Next week"
                            >
                              <ChevronRight className="w-5 h-5" />
                            </button>
                          </div>
                          {/* Date Selector */}
                          <div className="flex justify-between">
                            {getDateArray().map((date) => (
                              <button
                                key={date.toString()}
                                onClick={() => setSelectedDate(date)}
                                className={`flex flex-col items-center p-2 rounded-lg ${
                                  selectedDate && isSameDay(date, selectedDate)
                                    ? "bg-blue-600 text-white"
                                    : "hover:bg-blue-50"
                                }`}
                              >
                                <span className="text-xs uppercase mb-1">
                                  {format(date, "EEE")}
                                </span>
                                <span className="text-lg font-medium">
                                  {format(date, "d")}
                                </span>
                              </button>
                            ))}
                          </div>
                          {/* Time Selector */}
                          {selectedDate && (
                            <div className="mt-6">
                              <h5 className="font-medium mb-3 text-left text-gray-700 flex items-center">
                                <Clock className="w-4 h-4 mr-2" />
                                Available Times
                              </h5>
                              <div className="grid grid-cols-2 gap-2">
                                {timeSlots.map((time) => (
                                  <button
                                    key={time}
                                    type="button"
                                    onClick={() => setSelectedTime(time)}
                                    className={`py-2 px-3 rounded-lg text-center text-sm ${
                                      selectedTime === time
                                        ? "bg-blue-600 text-white"
                                        : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                                    }`}
                                  >
                                    {time}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                          {/* Next Button */}
                          {/* // Fix 3: Update the Next button click handler */}
                          <button
                            type="button"
                            disabled={!selectedDate || !selectedTime}
                            onClick={() => {
                              if (selectedDate && selectedTime) {
                                setError(""); // Clear any previous errors
                                setStep(2);
                              } else {
                                setError("Please select both a date and time");
                              }
                            }}
                            className="w-full py-2.5 mt-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300"
                          >
                            Next
                          </button>
                        </div>
                      )}
                    </form>
                  ) : (
                    <div className="text-center py-6">
                      <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                        <Check className="w-8 h-8 text-green-600" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {type === "getStarted"
                          ? "Request Received!"
                          : "Demo Scheduled!"}
                      </h3>
                      <p className="text-gray-600 mb-6">
                        {type === "getStarted"
                          ? "Thank you for your interest. Our team will contact you shortly."
                          : `Your demo is scheduled for ${
                              selectedDate
                                ? format(selectedDate, "MMMM d, yyyy")
                                : ""
                            } at ${selectedTime}.`}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

export default CTA2;
