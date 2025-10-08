"use client"
import React, { useState } from "react";

/**
 * Simple FlipCard component
 * Props:
 *  - front: JSX | string shown on front
 *  - back: JSX | string shown on back
 *  - className: extra classes for container
 *  - w/h: Tailwind width/height classes (default: w-64 h-40)
 */
export function FlipCard({
  front,
  back,
  className = "",
  w = "w-64",
  h = "h-40",
}) {
  const [flipped, setFlipped] = useState(false);

  const toggle = () => setFlipped((s) => !s);
  const onKey = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle();
    }
  };

  return (
    <div
      className={`relative ${w} ${h} ${className}`}
      style={{ perspective: 1000 }} // required for 3D
    >
      {/* inner container that rotates */}
      <div
        role="button"
        tabIndex={0}
        aria-pressed={flipped}
        onClick={toggle}
        onKeyDown={onKey}
        className={`relative w-full h-full cursor-pointer select-none`}
      >
        <div
          className={`card-inner w-full h-full relative transform transition-transform duration-600 ease-in-out`}
          style={{
            transformStyle: "preserve-3d",
            transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
            transition: "transform 600ms",
          }}
        >
          {/* FRONT */}
          <div
            className="card-face absolute inset-0 rounded-lg shadow-md bg-white flex items-center justify-center p-4"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
            }}
          >
            {front}
          </div>

          {/* BACK */}
          <div
            className="card-face card-back absolute inset-0 rounded-lg shadow-md bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center p-4"
            style={{
              transform: "rotateY(180deg)",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
            }}
          >
            {back}
          </div>
        </div>
      </div>
    </div>
  );
}

/* Example usage component */
export default function FlipCardDemo() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <FlipCard
          front={
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-800">Card A</h3>
              <p className="mt-2 text-sm text-gray-600">Click to flip</p>
            </div>
          }
          back={
            <div className="text-center">
              <h3 className="text-lg font-bold">Details A</h3>
              <p className="mt-2 text-sm">More info shown on the back.</p>
            </div>
          }
        />

        <FlipCard
          front={
            <div className="flex flex-col items-center">
              <div className="text-4xl">🎯</div>
              <div className="mt-2 font-medium">Target</div>
            </div>
          }
          back={
            <div>
              <p className="text-sm">Progress: 75%</p>
            </div>
          }
        />

        <FlipCard
          front={
            <div>
              <h3 className="font-semibold">Profile</h3>
              <p className="text-xs text-gray-500">Tap to see contact</p>
            </div>
          }
          back={
            <div className="text-center">
              <p className="text-sm">Email: user@example.com</p>
              <p className="text-sm">Phone: +123456789</p>
            </div>
          }
        />
      </div>
    </div>
  );
}
