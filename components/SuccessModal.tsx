"use client";
import React from "react";
import Image from "next/image";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
  buttonText?: string;
}

export default function SuccessModal({
  isOpen,
  onClose,
  title = "Sucesso!",
  message = "Ação realizada com sucesso!",
  buttonText = "Voltar"
}: SuccessModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 p-6">
        {/* Icon */}
        <div className="flex justify-center mb-3">
          <div className="rounded-full flex items-center justify-center">
            <Image
              src="/iconsuccess.svg"
              alt="Sucesso"
              width={40}
              height={40}
              className="object-contain"
            />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-slate-900 text-center mb-4">
          {title}
        </h2>

        {/* Message */}
        <p className="text-slate-600 text-center mb-3 leading-relaxed">
          {message}
        </p>

        {/* Button */}
        <button
          onClick={onClose}
          className="w-full px-6 py-3 rounded-lg bg-green-500 hover:bg-green-600 text-white font-semibold transition-colors"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}

