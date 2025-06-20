import React, { useRef, useEffect, useState, useCallback } from 'react'; // Added useState and useCallback
import * as THREE from 'three';

interface AnimatedDotBackgroundProps {
  className?: string;
}

const AnimatedDotBackground: React.FC<AnimatedDotBackgroundProps> = ({ className }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Debounce function to limit resize handler calls
  const debounce = <F extends (...args: any[]) => any>(func: F, waitFor: number) => {
    let timeout: ReturnType<typeof setTimeout> | null = null;
    return (...args: Parameters<F>): void => {
      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(() => func(...args), waitFor);
    };
  };

  useEffect(() => {
    const checkDeviceSize = () => {
      const mobileState = window.innerWidth < 640;
      setIsMobile(mobileState);
    };

    checkDeviceSize(); // Initial check

    const debouncedCheck = debounce(checkDeviceSize, 250);
    window.addEventListener('resize', debouncedCheck);

    return () => {
      window.removeEventListener('resize', debouncedCheck);
    };
  }, []);


  useEffect(() => {
    if (!mountRef.current) return;

    const currentMount = mountRef.current; // Capture mountRef.current for cleanup

    // Scene, camera, and renderer setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });

    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    currentMount.appendChild(renderer.domElement);

    // Background color
    renderer.setClearColor(0x000000);

    // Dots setup
    const dotGeometry = new THREE.CircleGeometry(isMobile ? 0.035 : 0.025, isMobile ? 12 : 16); // Slightly larger, less segments on mobile
    const dotMaterial = new THREE.MeshBasicMaterial({ color: 0x1a1a1a });

    interface Dot extends THREE.Mesh {
      originalPosition: THREE.Vector3;
    }

    const dots: Dot[] = [];

    // Responsive dot density: Reduce gridSize by ~50% for mobile, which is 75% fewer dots.
    // Adjust spacing to maintain visual density.
    const gridSize = isMobile ? 15 : 30;
    const spacing = isMobile ? 1.0 : 0.75;

    for (let x = -gridSize / 2; x < gridSize / 2; x++) {
      for (let y = -gridSize / 2; y < gridSize / 2; y++) {
        const dot = new THREE.Mesh(dotGeometry, dotMaterial) as Dot;
        const originalX = x * spacing;
        const originalY = y * spacing;
        dot.position.set(originalX, originalY, 0);
        dot.originalPosition = new THREE.Vector3(originalX, originalY, 0);
        scene.add(dot);
        dots.push(dot);
      }
    }

    camera.position.z = isMobile ? 12 : 10; // Adjust camera based on density

    const mousePosition = new THREE.Vector2();
    let animationFrameId: number;

    // Mouse move listener
    const onMouseMove = (event: MouseEvent) => {
      if (currentMount) { // Check if currentMount is still valid
        mousePosition.x = (event.clientX / currentMount.clientWidth) * 2 - 1;
        mousePosition.y = -(event.clientY / currentMount.clientHeight) * 2 + 1;
      }
    };
    window.addEventListener('mousemove', onMouseMove);

    // Animation loop
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Conditional mouse interaction parameters
      const currentMaxInfluenceRadius = isMobile ? 1.25 : 2.5; // Reduced radius on mobile
      const currentMaxDisplacement = isMobile ? 0.15 : 0.3;   // Reduced displacement on mobile
      const smoothingFactor = isMobile ? 0.06 : 0.08; // Slightly slower smoothing on mobile if desired

      dots.forEach(dot => {
        // Simplified interaction: direct vector to mouse, less emphasis on camera perspective for mobile
        const vecToMouse = new THREE.Vector2(
          mousePosition.x * (isMobile ? 5 : (camera.position.z * 0.5)) - dot.originalPosition.x,
          mousePosition.y * (isMobile ? 5 : (camera.position.z * 0.5)) - dot.originalPosition.y
        );

        const distanceToMouse = vecToMouse.length();

        let displacement = 0;
        if (distanceToMouse < currentMaxInfluenceRadius) {
          displacement = (1 - distanceToMouse / currentMaxInfluenceRadius) * currentMaxDisplacement;
        }

        const targetPosition = new THREE.Vector3().copy(dot.originalPosition);
        if (distanceToMouse > 0.01) {
          targetPosition.x -= (vecToMouse.x / distanceToMouse) * displacement;
          targetPosition.y -= (vecToMouse.y / distanceToMouse) * displacement;
        }

        dot.position.x += (targetPosition.x - dot.position.x) * smoothingFactor;
        dot.position.y += (targetPosition.y - dot.position.y) * smoothingFactor;
      });

      renderer.render(scene, camera);
    };
    animate();

    // Resize listener for camera and renderer size
    const handleThreeResize = () => {
      if (currentMount) {
        camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
      }
    };
    const debouncedThreeResize = debounce(handleThreeResize, 250);
    window.addEventListener('resize', debouncedThreeResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', debouncedThreeResize);

      if (currentMount && renderer.domElement) {
        if (currentMount.contains(renderer.domElement)) {
            currentMount.removeChild(renderer.domElement);
        }
      }
      renderer.dispose();
      dotGeometry.dispose();
      dotMaterial.dispose();
      dots.forEach(dot => scene.remove(dot));
      // Consider scene.dispose() if scene itself has complex objects not manually cleaned
    };
  }, [isMobile]); // Re-run effect if isMobile changes

  return <div ref={mountRef} className={className} style={{ width: '100%', height: '100%', overflow: 'hidden', cursor: 'none' }} />;
};

export default AnimatedDotBackground;
