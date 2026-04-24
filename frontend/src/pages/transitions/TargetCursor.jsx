// src/components/TargetCursor.jsx
import { useEffect, useRef, useState } from "react";

const TargetCursor = ({ size = 48, color = "#ffd96f", speed = 0.12 }) => {
  const cursorRef = useRef(null);
  const outerRingRef = useRef(null);
  const pos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const mouse = useRef({ x: pos.current.x, y: pos.current.y });
  const rafRef = useRef(null);
  const rotationRef = useRef(0);
  const [clicked, setClicked] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const onMouseMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseDown = () => setClicked(true);
    const onMouseUp = () => setClicked(false);

    const onMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.style.cursor === "pointer" ||
        window.getComputedStyle(target).cursor === "pointer"
      ) {
        setHovered(true);
      } else {
        setHovered(false);
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("mouseover", onMouseOver);

    const animate = () => {
      pos.current.x += (mouse.current.x - pos.current.x) * speed;
      pos.current.y += (mouse.current.y - pos.current.y) * speed;

      rotationRef.current += 0.6;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${pos.current.x - size / 2}px, ${pos.current.y - size / 2}px)`;
      }

      if (outerRingRef.current) {
        outerRingRef.current.style.transform = `rotate(${rotationRef.current}deg)`;
        outerRingRef.current.style.transformOrigin = `${size / 2}px ${size / 2}px`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mouseover", onMouseOver);
      cancelAnimationFrame(rafRef.current);
    };
  }, [speed, size]);

  const half = size / 2;
  const gap = 7;
  const outerR = half - 2;
  const innerR = half - 10;

  // Dashed segments for the outer ring (4 arcs with gaps)
  const dashArray = `${(2 * Math.PI * outerR) * 0.18} ${(2 * Math.PI * outerR) * 0.07}`;

  return (
    <>
      {/* Main cursor */}
      <div
        ref={cursorRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: size,
          height: size,
          pointerEvents: "none",
          zIndex: 99999,
          willChange: "transform",
          transition: "none",
        }}
      >
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          style={{
            overflow: "visible",
            filter: "drop-shadow(0 0 3px rgba(0,0,0,0.35))",
          }}
        >
          {/* Rotating outer dashed ring */}
          <circle
            ref={outerRingRef}
            cx={half}
            cy={half}
            r={outerR}
            fill="none"
            stroke={color}
            strokeWidth="1.2"
            strokeDasharray={dashArray}
            opacity="0.9"
            style={{
              transition: hovered
                ? "r 0.3s ease, stroke-width 0.3s ease, opacity 0.3s ease"
                : "none",
            }}
          />

          {/* Inner solid ring */}
          <circle
            cx={half}
            cy={half}
            r={innerR}
            fill="none"
            stroke={color}
            strokeWidth={clicked ? "2.5" : hovered ? "2" : "1"}
            opacity={clicked ? "1" : "0.5"}
            style={{ transition: "stroke-width 0.15s ease, opacity 0.15s ease" }}
          />

          {/* Crosshair — top */}
          <line
            x1={half} y1={2}
            x2={half} y2={half - gap}
            stroke={color} strokeWidth="1.5"
            strokeLinecap="round"
          />
          {/* Crosshair — bottom */}
          <line
            x1={half} y1={half + gap}
            x2={half} y2={size - 2}
            stroke={color} strokeWidth="1.5"
            strokeLinecap="round"
          />
          {/* Crosshair — left */}
          <line
            x1={2} y1={half}
            x2={half - gap} y2={half}
            stroke={color} strokeWidth="1.5"
            strokeLinecap="round"
          />
          {/* Crosshair — right */}
          <line
            x1={half + gap} y1={half}
            x2={size - 2} y2={half}
            stroke={color} strokeWidth="1.5"
            strokeLinecap="round"
          />

          {/* Center dot */}
          <circle
            cx={half}
            cy={half}
            r={clicked ? "3.5" : hovered ? "3" : "2"}
            fill={color}
            style={{ transition: "r 0.15s ease" }}
          />

          {/* Click ripple */}
          {clicked && (
            <circle
              cx={half}
              cy={half}
              r={outerR + 4}
              fill="none"
              stroke={color}
              strokeWidth="1"
              opacity="0.4"
            />
          )}
        </svg>
      </div>

      {/* Global cursor style */}
      <style>{`
        *, *::before, *::after {
          cursor: none !important;
        }
      `}</style>
    </>
  );
};

export default TargetCursor;