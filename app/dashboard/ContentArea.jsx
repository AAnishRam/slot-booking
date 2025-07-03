"use client";

import React from "react";
import { Building } from "lucide-react";

const ContentArea = ({ children }) => {
  return (
    <div className="lg:col-span-2">
      <div className="bg-orange-100 border border-orange-300 rounded-2xl p-8 shadow-lg min-h-[400px] flex items-center justify-center">
        {children || (
          <div className="text-center text-orange-600">
            <Building className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-semibold mb-2">Content Area</h3>
            <p className="text-sm">
              This space is available for rendering other components
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentArea;
