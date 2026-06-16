import { useRef, useEffect } from "react";
import gsap from "gsap";

export const useGsap3DTilt = (options = {}) => {
  const elementRef = useRef(null);
  const { maxRotation = 10, scale = 1.03, duration = 0.4 } = options;

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const onMouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Calculate relative position (-0.5 to 0.5)
      const relX = (x / rect.width) - 0.5;
      const relY = (y / rect.height) - 0.5;

      // Calculate rotations
      const rotX = -relY * maxRotation * 2;
      const rotY = relX * maxRotation * 2;

      gsap.to(el, {
        rotateX: rotX,
        rotateY: rotY,
        scale: scale,
        transformPerspective: 1000,
        transformOrigin: "center center",
        ease: "power2.out",
        duration: duration,
        overwrite: "auto",
      });
    };

    const onMouseLeave = () => {
      gsap.to(el, {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        ease: "power3.out",
        duration: duration + 0.2,
        overwrite: "auto",
      });
    };

    el.addEventListener("mousemove", onMouseMove);
    el.addEventListener("mouseleave", onMouseLeave);

    return () => {
      el.removeEventListener("mousemove", onMouseMove);
      el.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [maxRotation, scale, duration]);

  return elementRef;
};
