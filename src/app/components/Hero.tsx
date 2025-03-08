import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import SubscribeModal from "./SubscribeModal";

function Hero() {
  const router = useRouter();
  const [isSubscribeModalOpen, setIsSubscribeModalOpen] = useState(false);

  return (
    <div className="relative bg-gradient-to-br from-white to-blue-50 py-20 pt-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
          <div className="mb-12 lg:mb-0">
            <span className="inline-block px-4 py-1.5 bg-blue-600 text-white rounded-full text-sm font-medium mb-6">
              Value-Based Care Intelligence
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-blue-900">
              Advancing Healthcare Through Value-Based Models
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              Expert analysis, proven strategies, and actionable insights to
              help healthcare organizations successfully navigate the transition
              to value-based care and improve population health outcomes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => router.push("/articles")}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors"
              >
                Latest Insights
              </button>
              <button
                onClick={() => setIsSubscribeModalOpen(true)}
                className="px-6 py-3 border border-blue-600 text-blue-600 hover:bg-blue-50 font-medium rounded-md transition-colors"
              >
                Subscribe to Updates
              </button>
            </div>
          </div>
          <div className="relative h-64 md:h-96 lg:h-full rounded-lg overflow-hidden shadow-xl">
            {/* Replace with your own image or import from public folder */}
            <div className="absolute inset-0 bg-blue-100 flex items-center justify-center">
              <Image
                src="https://media.istockphoto.com/id/1421919753/photo/doctor-nurse-and-medical-meeting-with-tablet-paper-and-lab-data-for-medicine-innovation-idea.jpg?s=612x612&w=0&k=20&c=ZtkWNBRbbznYpS2gl8r_LvKEO3qQsWz0XEFcIBFO_y0="
                alt="Healthcare professionals collaborating"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
      <SubscribeModal
        isOpen={isSubscribeModalOpen}
        onClose={() => setIsSubscribeModalOpen(false)}
      />
    </div>
  );
}

export default Hero;
