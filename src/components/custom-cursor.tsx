'use client';

import { useEffect, useRef, useState } from 'react';
import { useIsMobile } from '@/lib/useIsMobile';

export default function CustomCursor() {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<HTMLDivElement>(null);
  const touchIndicatorRef = useRef<HTMLDivElement>(null);
  const touchRippleRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile(768);
  const [cursorText, setCursorText] = useState('');

  useEffect(() => {
    const outerEl = outerRef.current;
    const innerEl = innerRef.current;
    const dotsEl = dotsRef.current;
    const touchIndicatorEl = touchIndicatorRef.current;
    const touchRippleEl = touchRippleRef.current;

    if (isMobile) {
      if (!touchIndicatorEl || !touchRippleEl) return;
      // ═══════════════ MOBILE TOUCH EXPERIENCE ═══════════════
      let touchX = 0;
      let touchY = 0;

      const handleTouchStart = (e: TouchEvent) => {
        if (e.touches.length > 0) {
          const touch = e.touches[0];
          touchX = touch.clientX;
          touchY = touch.clientY;

          touchIndicatorEl.style.left = `${touchX}px`;
          touchIndicatorEl.style.top = `${touchY}px`;
          touchIndicatorEl.style.transform = 'translate3d(-50%, -50%, 0) scale(1)';
          touchIndicatorEl.style.opacity = '1';

          touchRippleEl.style.left = `${touchX}px`;
          touchRippleEl.style.top = `${touchY}px`;
          touchRippleEl.style.transform = 'translate3d(-50%, -50%, 0) scale(0.3)';
          touchRippleEl.style.opacity = '0.8';

          touchRippleEl.classList.remove('ripple-anim');
          void touchRippleEl.offsetWidth; // force reflow
          touchRippleEl.classList.add('ripple-anim');
        }
      };

      const handleTouchMove = (e: TouchEvent) => {
        if (e.touches.length > 0) {
          const touch = e.touches[0];
          touchX = touch.clientX;
          touchY = touch.clientY;
          touchIndicatorEl.style.left = `${touchX}px`;
          touchIndicatorEl.style.top = `${touchY}px`;
        }
      };

      const handleTouchEnd = () => {
        touchIndicatorEl.style.transform = 'translate3d(-50%, -50%, 0) scale(0.3)';
        touchIndicatorEl.style.opacity = '0';
      };

      document.addEventListener('touchstart', handleTouchStart, { passive: true });
      document.addEventListener('touchmove', handleTouchMove, { passive: true });
      document.addEventListener('touchend', handleTouchEnd, { passive: true });

      return () => {
        document.removeEventListener('touchstart', handleTouchStart);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
      };
    } else {
      if (!outerEl || !innerEl || !dotsEl) return;
      // ═══════════════ DESKTOP PREMIUM CURSOR ═══════════════
      let mouseX = typeof window !== 'undefined' ? window.innerWidth / 2 : 0;
      let mouseY = typeof window !== 'undefined' ? window.innerHeight / 2 : 0;
      
      let currentX = mouseX;
      let currentY = mouseY;
      let outerX = mouseX;
      let outerY = mouseY;
      let dotsX = mouseX;
      let dotsY = mouseY;

      let isHovered = false;
      let isMouseDown = false;
      let magneticEl: HTMLElement | null = null;

      const handleMouseMove = (e: MouseEvent) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        const target = e.target as HTMLElement | null;
        magneticEl = target ? target.closest('[data-magnetic]') : null;

        if (!isHovered) {
          isHovered = true;
          [outerEl, innerEl, dotsEl].forEach(el => {
            el.style.opacity = '1';
            el.style.display = 'block';
            el.style.visibility = 'visible';
          });
        }
      };

      let animationFrameId: number;

      const updatePosition = () => {
        let targetX = mouseX;
        let targetY = mouseY;

        // Optimized magnetic pull calculation
        if (magneticEl) {
          const rect = magneticEl.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          const distance = Math.sqrt(
            Math.pow(mouseX - centerX, 2) + Math.pow(mouseY - centerY, 2)
          );

          if (distance < 120) {
            const pullX = (centerX - mouseX) * 0.3;
            const pullY = (centerY - mouseY) * 0.3;
            targetX = mouseX + pullX;
            targetY = mouseY + pullY;
          }
        }

        // Extremely smooth Lerp coordinate updates
        currentX += (targetX - currentX) * 0.3;
        currentY += (targetY - currentY) * 0.3;

        outerX += (targetX - outerX) * 0.15;
        outerY += (targetY - outerY) * 0.15;

        dotsX += (targetX - dotsX) * 0.08;
        dotsY += (targetY - dotsY) * 0.08;

        // Performant direct layout position updates
        innerEl.style.left = `${currentX}px`;
        innerEl.style.top = `${currentY}px`;
        if (isMouseDown) {
          innerEl.style.transform = 'translate3d(-55%, -55%, 0) scale(0.5)';
        } else {
          innerEl.style.transform = 'translate3d(-50%, -50%, 0) scale(1)';
        }

        outerEl.style.left = `${outerX}px`;
        outerEl.style.top = `${outerY}px`;

        dotsEl.style.left = `${dotsX}px`;
        dotsEl.style.top = `${dotsY}px`;

        animationFrameId = requestAnimationFrame(updatePosition);
      };

      animationFrameId = requestAnimationFrame(updatePosition);

      const handleMouseDown = () => {
        isMouseDown = true;
        outerEl.classList.add('cursor-mousedown');
      };

      const handleMouseUp = () => {
        isMouseDown = false;
        outerEl.classList.remove('cursor-mousedown');
      };

      const handleOver = (e: MouseEvent) => {
        const target = e.target as HTMLElement | null;
        if (!target) return;

        if (target.closest('a, button')) {
          outerEl.classList.add('cursor-hover-link');
          innerEl.classList.add('cursor-hover-link-inner');
        }
        if (target.closest('input, textarea')) {
          outerEl.classList.add('cursor-hover-input');
        }
        if (target.closest('img')) {
          outerEl.classList.add('cursor-hover-image');
          innerEl.classList.add('cursor-hover-image-inner');
        }
        const textAttr = target.closest('[data-cursor-text]')?.getAttribute('data-cursor-text');
        if (textAttr) {
          setCursorText(textAttr);
          outerEl.classList.add('cursor-hover-text');
          innerEl.classList.add('cursor-hover-text-inner');
        }
      };

      const handleOut = (e: MouseEvent) => {
        const target = e.target as HTMLElement | null;
        if (!target) return;

        if (target.closest('a, button')) {
          outerEl.classList.remove('cursor-hover-link');
          innerEl.classList.remove('cursor-hover-link-inner');
        }
        if (target.closest('input, textarea')) {
          outerEl.classList.remove('cursor-hover-input');
        }
        if (target.closest('img')) {
          outerEl.classList.remove('cursor-hover-image');
          innerEl.classList.remove('cursor-hover-image-inner');
        }
        const textAttr = target.closest('[data-cursor-text]')?.getAttribute('data-cursor-text');
        if (textAttr) {
          setCursorText('');
          outerEl.classList.remove('cursor-hover-text');
          innerEl.classList.remove('cursor-hover-text-inner');
        }
      };

      const handleMouseLeave = () => {
        isHovered = false;
        [outerEl, innerEl, dotsEl].forEach(el => {
          el.style.opacity = '0';
        });
      };

      const handleMouseEnter = () => {
        isHovered = true;
        [outerEl, innerEl, dotsEl].forEach(el => {
          el.style.opacity = '1';
        });
      };

      document.addEventListener('mousemove', handleMouseMove, { passive: true });
      document.addEventListener('mousedown', handleMouseDown, { passive: true });
      document.addEventListener('mouseup', handleMouseUp, { passive: true });
      document.addEventListener('mouseover', handleOver, { passive: true });
      document.addEventListener('mouseout', handleOut, { passive: true });
      document.addEventListener('mouseleave', handleMouseLeave, { passive: true });
      document.addEventListener('mouseenter', handleMouseEnter, { passive: true });

      // Initialize position
      [outerEl, innerEl, dotsEl].forEach(el => {
        el.style.left = `${mouseX}px`;
        el.style.top = `${mouseY}px`;
        el.style.opacity = '0';
      });

      return () => {
        cancelAnimationFrame(animationFrameId);
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mousedown', handleMouseDown);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('mouseover', handleOver);
        document.removeEventListener('mouseout', handleOut);
        document.removeEventListener('mouseleave', handleMouseLeave);
        document.removeEventListener('mouseenter', handleMouseEnter);
      };
    }
  }, [isMobile]);

  return (
    <>
      {/* Desktop Premium Cursor */}
      <div 
        ref={outerRef} 
        className="cursor-outer fixed flex items-center justify-center"
      >
        {cursorText && (
          <span className="cursor-text text-white text-xs font-semibold uppercase tracking-wider">
            {cursorText}
          </span>
        )}
      </div>
      <div ref={innerRef} className="cursor-inner fixed block" />
      <div ref={dotsRef} className="cursor-dots fixed block" />

      {/* Mobile Touch Indicator */}
      <div ref={touchIndicatorRef} className="touch-indicator" />
      <div ref={touchRippleRef} className="touch-ripple" />

      <style jsx global>{`
        /* Hide default cursor */
        * {
          cursor: none !important;
        }

        @media (max-width: 768px) {
          .cursor-outer, .cursor-inner, .cursor-dots {
            display: none !important;
          }
          .touch-indicator, .touch-ripple {
            display: block !important;
          }
        }

        /* Desktop Cursor Styles */
        .cursor-outer {
          position: fixed;
          top: 0;
          left: 0;
          width: 40px;
          height: 40px;
          border: 2px solid rgba(132, 152, 38, 0.5);
          border-radius: 50%;
          pointer-events: none;
          z-index: 99999;
          transform: translate3d(-50%, -50%, 0);
          transition: width 0.3s cubic-bezier(0.25, 1, 0.5, 1), 
                      height 0.3s cubic-bezier(0.25, 1, 0.5, 1), 
                      border-color 0.3s ease, 
                      background-color 0.3s ease,
                      border-width 0.3s ease;
          backdrop-filter: blur(2px);
          will-change: left, top;
        }

        .cursor-inner {
          position: fixed;
          top: 0;
          left: 0;
          width: 8px;
          height: 8px;
          background: #849826;
          border-radius: 50%;
          pointer-events: none;
          z-index: 99999;
          box-shadow: 0 0 10px rgba(132, 152, 38, 0.5);
          transform: translate3d(-50%, -50%, 0);
          transition: transform 0.2s cubic-bezier(0.25, 1, 0.5, 1), background-color 0.3s ease;
          will-change: left, top, transform;
        }

        .cursor-dots {
          position: fixed;
          top: 0;
          left: 0;
          width: 4px;
          height: 4px;
          pointer-events: none;
          z-index: 99998;
          transform: translate3d(-50%, -50%, 0);
          will-change: left, top;
        }

        .cursor-dots::before,
        .cursor-dots::after {
          content: '';
          position: absolute;
          width: 4px;
          height: 4px;
          background: rgba(132, 152, 38, 0.3);
          border-radius: 50%;
        }

        .cursor-dots::before {
          top: -15px;
          left: -15px;
        }

        .cursor-dots::after {
          bottom: -15px;
          right: -15px;
        }

        .cursor-text {
          white-space: nowrap;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        /* Hover States for Outer Cursor */
        .cursor-outer.cursor-mousedown {
          width: 30px;
          height: 30px;
          border-width: 3px;
        }

        .cursor-outer.cursor-hover-link {
          width: 80px;
          height: 80px;
          border-color: #849826;
          background-color: rgba(132, 152, 38, 0.1);
        }

        .cursor-outer.cursor-hover-input {
          width: 60px;
          height: 60px;
          border-color: #849826;
        }

        .cursor-outer.cursor-hover-image {
          width: 100px;
          height: 100px;
          border-width: 1px;
          border-color: #849826;
        }

        .cursor-outer.cursor-hover-text {
          width: 120px;
          height: 120px;
          background-color: rgba(132, 152, 38, 0.95);
          border-color: #849826;
        }

        /* Hover States for Inner Cursor */
        .cursor-inner.cursor-hover-link-inner,
        .cursor-inner.cursor-hover-text-inner {
          transform: translate3d(-50%, -50%, 0) scale(0) !important;
        }

        .cursor-inner.cursor-hover-image-inner {
          transform: translate3d(-50%, -50%, 0) scale(1.5) !important;
          background-color: rgba(132, 152, 38, 0.5);
        }

        /* Mobile Touch Styles */
        .touch-indicator {
          position: fixed;
          top: 0;
          left: 0;
          width: 60px;
          height: 60px;
          border: 3px solid rgba(132, 152, 38, 0.8);
          border-radius: 50%;
          pointer-events: none;
          z-index: 99999;
          opacity: 0;
          background: radial-gradient(circle, rgba(132, 152, 38, 0.2) 0%, transparent 70%);
          box-shadow: 
            0 0 20px rgba(132, 152, 38, 0.4),
            inset 0 0 20px rgba(132, 152, 38, 0.2);
          transform: translate3d(-50%, -50%, 0) scale(0.3);
          transition: left 0.05s ease, top 0.05s ease, transform 0.15s ease, opacity 0.4s ease;
          will-change: left, top, transform;
        }

        .touch-ripple {
          position: fixed;
          top: 0;
          left: 0;
          width: 80px;
          height: 80px;
          border: 2px solid rgba(132, 152, 38, 0.6);
          border-radius: 50%;
          pointer-events: none;
          z-index: 99998;
          opacity: 0;
          transform: translate3d(-50%, -50%, 0);
          will-change: left, top, transform;
        }

        .touch-ripple.ripple-anim {
          animation: touchRippleEffect 0.8s cubic-bezier(0.1, 0.8, 0.3, 1) forwards;
        }

        @keyframes touchRippleEffect {
          0% {
            transform: translate3d(-50%, -50%, 0) scale(0.3);
            opacity: 0.8;
          }
          100% {
            transform: translate3d(-50%, -50%, 0) scale(1.8);
            opacity: 0;
          }
        }

        /* Smooth transitions */
        @media (prefers-reduced-motion: reduce) {
          .cursor-outer,
          .cursor-inner,
          .cursor-dots,
          .touch-indicator,
          .touch-ripple {
            transition: none !important;
            animation: none !important;
          }
        }
      `}</style>
    </>
  );
}