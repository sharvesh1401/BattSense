import React, { useRef, useEffect, useState, useCallback } from 'react';

interface InteractiveBackgroundProps {
  className?: string;
}

interface Dot {
  x: number;
  y: number;
  originalX: number;
  originalY: number;
  targetX: number;
  targetY: number;
}

const InteractiveBackground: React.FC<InteractiveBackgroundProps> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const dotsRef = useRef<Dot[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Debounce function for resize handling
  const debounce = useCallback(<F extends (...args: any[]) => any>(func: F, waitFor: number) => {
    let timeout: ReturnType<typeof setTimeout> | null = null;
    return (...args: Parameters<F>): void => {
      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(() => func(...args), waitFor);
    };
  }, []);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    const debouncedCheck = debounce(checkMobile, 250);
    window.addEventListener('resize', debouncedCheck);
    
    return () => window.removeEventListener('resize', debouncedCheck);
  }, [debounce]);

  // Initialize dots grid
  const initializeDots = useCallback((width: number, height: number) => {
    const dots: Dot[] = [];
    
    // Responsive dot configuration
    const dotSpacing = isMobile ? 28 : 32; // Slightly closer on mobile
    const cols = Math.ceil(width / dotSpacing);
    const rows = Math.ceil(height / dotSpacing);
    
    // Center the grid
    const offsetX = (width - (cols - 1) * dotSpacing) / 2;
    const offsetY = (height - (rows - 1) * dotSpacing) / 2;
    
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = offsetX + col * dotSpacing;
        const y = offsetY + row * dotSpacing;
        
        dots.push({
          x,
          y,
          originalX: x,
          originalY: y,
          targetX: x,
          targetY: y,
        });
      }
    }
    
    dotsRef.current = dots;
  }, [isMobile]);

  // Handle mouse movement
  const handleMouseMove = useCallback((event: MouseEvent) => {
    if (!canvasRef.current || isMobile) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    mouseRef.current = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  }, [isMobile]);

  // Animation loop
  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Update dot positions
    dotsRef.current.forEach((dot) => {
      if (isMobile) {
        // Mobile: gentle floating animation
        const time = Date.now() * 0.001;
        const floatX = Math.sin(time * 0.5 + dot.originalX * 0.01) * 2;
        const floatY = Math.cos(time * 0.3 + dot.originalY * 0.01) * 1.5;
        
        dot.targetX = dot.originalX + floatX;
        dot.targetY = dot.originalY + floatY;
      } else {
        // Desktop: cursor repulsion
        const dx = mouseRef.current.x - dot.originalX;
        const dy = mouseRef.current.y - dot.originalY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        const maxDistance = 120; // Influence radius
        const maxDisplacement = 15; // Maximum displacement
        
        if (distance < maxDistance && distance > 0) {
          const force = (1 - distance / maxDistance) * maxDisplacement;
          const angle = Math.atan2(dy, dx);
          
          dot.targetX = dot.originalX - Math.cos(angle) * force;
          dot.targetY = dot.originalY - Math.sin(angle) * force;
        } else {
          dot.targetX = dot.originalX;
          dot.targetY = dot.originalY;
        }
      }
      
      // Smooth interpolation
      const lerp = 0.1;
      dot.x += (dot.targetX - dot.x) * lerp;
      dot.y += (dot.targetY - dot.y) * lerp;
    });
    
    // Draw dots
    ctx.fillStyle = '#CBD83B'; // Pear Green
    dotsRef.current.forEach((dot) => {
      ctx.beginPath();
      const dotSize = isMobile ? 4 : 5; // Responsive dot size
      ctx.arc(dot.x, dot.y, dotSize / 2, 0, Math.PI * 2);
      ctx.fill();
    });
    
    animationFrameRef.current = requestAnimationFrame(animate);
  }, [isMobile]);

  // Handle canvas resize
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const container = canvas.parentElement;
    if (!container) return;
    
    const { clientWidth, clientHeight } = container;
    
    // Set canvas size with device pixel ratio for crisp rendering
    const dpr = window.devicePixelRatio || 1;
    canvas.width = clientWidth * dpr;
    canvas.height = clientHeight * dpr;
    canvas.style.width = `${clientWidth}px`;
    canvas.style.height = `${clientHeight}px`;
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(dpr, dpr);
    }
    
    setDimensions({ width: clientWidth, height: clientHeight });
  }, []);

  // Initialize canvas and start animation
  useEffect(() => {
    handleResize();
    const debouncedResize = debounce(handleResize, 250);
    window.addEventListener('resize', debouncedResize);
    
    return () => window.removeEventListener('resize', debouncedResize);
  }, [handleResize, debounce]);

  // Initialize dots when dimensions change
  useEffect(() => {
    if (dimensions.width > 0 && dimensions.height > 0) {
      initializeDots(dimensions.width, dimensions.height);
    }
  }, [dimensions, initializeDots]);

  // Start animation and mouse tracking
  useEffect(() => {
    if (dotsRef.current.length > 0) {
      animate();
      
      if (!isMobile) {
        window.addEventListener('mousemove', handleMouseMove);
      }
      
      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        if (!isMobile) {
          window.removeEventListener('mousemove', handleMouseMove);
        }
      };
    }
  }, [animate, handleMouseMove, isMobile]);

  return (
    <div className={`fixed inset-0 pointer-events-none ${className}`} style={{ zIndex: -10 }}>
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{
          backgroundColor: '#000000',
          display: 'block',
        }}
      />
    </div>
  );
};

export default InteractiveBackground;
  )
}