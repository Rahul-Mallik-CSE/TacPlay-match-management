/** @format */

"use client";

import React from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

type LightboxModalProps = {
  isOpen: boolean;
  imageUrls: string[];
  currentSlide: number;
  onClose: () => void;
  onPrevSlide: () => void;
  onNextSlide: () => void;
  onGoToSlide: (index: number) => void;
};

const LightboxModal: React.FC<LightboxModalProps> = ({
  isOpen,
  imageUrls,
  currentSlide,
  onClose,
  onPrevSlide,
  onNextSlide,
  onGoToSlide,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95 backdrop-blur-md p-4 animate-in fade-in duration-200 select-none"
      onClick={onClose}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="absolute top-6 right-6 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-2.5 rounded-full transition-all duration-300 cursor-pointer z-50 shadow-lg"
        aria-label="Close Lightbox"
      >
        <X className="w-6 h-6" />
      </button>

      <div
        className="relative w-full max-w-5xl h-[65vh] md:h-[75vh] flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={imageUrls[currentSlide]}
          alt={`Arena Cover Full ${currentSlide + 1}`}
          className="max-w-full max-h-full object-contain rounded-lg shadow-2xl transition-all duration-500 ease-in-out border border-white/10"
        />

        {imageUrls.length > 1 && (
          <>
            <button
              onClick={onPrevSlide}
              className="absolute left-4 p-3 rounded-full bg-black/40 hover:bg-black/60 text-white hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer border border-white/5 shadow-md"
              aria-label="Previous Image"
            >
              <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>
            <button
              onClick={onNextSlide}
              className="absolute right-4 p-3 rounded-full bg-black/40 hover:bg-black/60 text-white hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer border border-white/5 shadow-md"
              aria-label="Next Image"
            >
              <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>
          </>
        )}
      </div>

      {imageUrls.length > 1 && (
        <div
          className="mt-6 flex flex-col items-center gap-4 z-40"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-center gap-2 max-w-[90vw] overflow-x-auto py-1 px-3 bg-white/5 backdrop-blur-md rounded-xl border border-white/5 shadow-inner">
            {imageUrls.map((url, idx) => (
              <button
                key={idx}
                onClick={() => onGoToSlide(idx)}
                className={`relative w-12 h-9 sm:w-16 sm:h-12 rounded-lg overflow-hidden transition-all duration-300 border-2 cursor-pointer shrink-0 ${
                  idx === currentSlide
                    ? "border-custom-yellow scale-105 shadow-md shadow-custom-yellow/30"
                    : "border-transparent opacity-50 hover:opacity-100"
                }`}
              >
                <img
                  src={url}
                  alt={`Thumb ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
          <div className="text-white/60 text-xs sm:text-sm font-semibold select-none tracking-wider">
            {currentSlide + 1} / {imageUrls.length}
          </div>
        </div>
      )}
    </div>
  );
};

export default LightboxModal;
