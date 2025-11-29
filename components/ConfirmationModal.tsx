"use client"
import React from "react";
import Image from "next/image";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
  type?: "danger" | "success" | "warning";
}

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText,
  cancelText,
  type = "danger"
}: ConfirmationModalProps) {
  if (!isOpen) return null;

  const iconColors = {
    danger: "bg-red-100",
    success: "bg-green-100",
    warning: "bg-yellow-100"
  };

  const iconColor = {
    danger: "text-red-600",
    success: "text-green-600",
    warning: "text-yellow-600"
  };

  const confirmButtonColors = {
    danger: "bg-red-600 hover:bg-red-700",
    success: "bg-green-600 hover:bg-green-700",
    warning: "bg-yellow-600 hover:bg-yellow-700"
  };

  const cancelButtonColors = {
    danger: "border-red-600 text-red-600 hover:bg-red-50",
    success: "border-green-600 text-green-600 hover:bg-green-50",
    warning: "border-yellow-600 text-yellow-600 hover:bg-yellow-50"
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full mx-4 p-8">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className={`rounded-full ${iconColors[type]} flex items-center justify-center`}>
            {type === "danger" ? (
              <Image
                src="/icondelete.svg"
                alt="Alerta"
                width={40}
                height={40}
                className="object-contain"
              />
            ) : (
              <svg 
                className={`w-10 h-10 ${iconColor[type]}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
                />
              </svg>
            )}
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-slate-900 text-center mb-4">
          {title}
        </h2>

        {/* Message */}
        <p className="text-slate-600 text-center mb-8 leading-relaxed">
          {message}
        </p>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className={`flex-1 px-6 py-3 rounded-lg border-2 ${cancelButtonColors[type]} font-semibold transition-colors`}
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 px-6 py-3 rounded-lg ${confirmButtonColors[type]} text-white font-semibold transition-colors`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}