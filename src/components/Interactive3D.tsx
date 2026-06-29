import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Sparkles, MousePointerClick } from "lucide-react";

export default function Interactive3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight || 450;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0b0c10, 0.015);

    const camera = new THREE.PerspectiveCamera(60, width / height, 1, 1000);
    camera.position.set(0, 45, 110);
    camera.lookAt(0, 0, 0);

    // 2. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // 3. Sedona Soundwave Particles Geometry
    const SEPARATION = 4.5;
    const AMOUNTX = 65;
    const AMOUNTY = 65;
    const numParticles = AMOUNTX * AMOUNTY;

    const positions = new Float32Array(numParticles * 3);
    const colors = new Float32Array(numParticles * 3);

    // Warm Sedona clay, orange, and copper shades updated to match Elegant Dark spec
    const colorRed = new THREE.Color(0xb34d2e); // #b34d2e
    const colorOrange = new THREE.Color(0xd97706); // #d97706
    const colorCopper = new THREE.Color(0xe3d5ca); // #e3d5ca

    let i = 0;
    for (let ix = 0; ix < AMOUNTX; ix++) {
      for (let iy = 0; iy < AMOUNTY; iy++) {
        // Center-relative layout
        const xVal = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2;
        const zVal = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2;

        positions[i] = xVal;
        positions[i + 1] = 0; // calculated dynamically in render loop
        positions[i + 2] = zVal;

        // Blending colors to form a sunset canyon gradient
        const t = ix / AMOUNTX;
        const colorMix = new THREE.Color().copy(colorRed).lerp(colorOrange, t).lerp(colorCopper, iy / AMOUNTY);
        colors[i] = colorMix.r;
        colors[i + 1] = colorMix.g;
        colors[i + 2] = colorMix.b;

        i += 3;
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    // Custom round particle shader texture using Canvas
    const createParticleTexture = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 16;
      canvas.height = 16;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const gradient = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
        gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
        gradient.addColorStop(0.3, "rgba(255, 180, 120, 0.8)");
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 16, 16);
      }
      return new THREE.CanvasTexture(canvas);
    };

    const material = new THREE.PointsMaterial({
      size: 1.8,
      vertexColors: true,
      map: createParticleTexture(),
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // 4. Grid floor for tech-landscape vibe
    const gridHelper = new THREE.GridHelper(260, 20, 0x7c2a17, 0x1c1e24);
    gridHelper.position.y = -10;
    scene.add(gridHelper);

    // 5. Light Source
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xd97548, 1, 300);
    pointLight.position.set(0, 50, 0);
    scene.add(pointLight);

    // 6. Interaction State
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let count = 0;
    let scrollY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      mouseX = (x / rect.width) * 2 - 1;
      mouseY = -(y / rect.height) * 2 + 1;
    };

    const handleScroll = () => {
      scrollY = window.scrollY;
    };

    container.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    // 7. Resize Observer (Sizing standard constraints)
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: w, height: h } = entry.contentRect;
        camera.aspect = w / (h || 450);
        camera.updateProjectionMatrix();
        renderer.setSize(w, h || 450);
      }
    });
    resizeObserver.observe(container);

    // 8. Dynamic Animation Loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      count += 0.035;

      // Calculate dynamic particle heights mimicking sound waves & desert mountains
      const positionAttr = geometry.getAttribute("position") as THREE.BufferAttribute;
      const posArray = positionAttr.array as Float32Array;

      // Scroll height trigger adjustment
      const scrollFactor = Math.min(scrollY / 1000, 1.5);
      const waveAmplitude = 12 + scrollFactor * 10;

      let index = 0;
      for (let ix = 0; ix < AMOUNTX; ix++) {
        for (let iy = 0; iy < AMOUNTY; iy++) {
          // Double sine-wave synthesis (canyon mountains + musical soundwaves)
          const heightVal =
            Math.sin((ix + count) * 0.25) * waveAmplitude +
            Math.sin((iy + count) * 0.15) * (waveAmplitude / 2) +
            Math.cos((ix + iy + count) * 0.1) * 3;

          // Update position Y (index + 1)
          posArray[index + 1] = heightVal;
          index += 3;
        }
      }
      positionAttr.needsUpdate = true;

      // Interpolate mouse coordinates for fluid tilt
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      // Rotate particles mesh and move camera slightly based on mouse
      particles.rotation.y = targetX * 0.3 + count * 0.02;
      particles.rotation.x = targetY * 0.15;
      
      gridHelper.rotation.y = particles.rotation.y;

      // Smooth camera drift
      camera.position.x = Math.sin(count * 0.05) * 10;

      renderer.render(scene, camera);
    };

    animate();

    // 9. Cleanup cycle
    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      container.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <section id="interactive-3d" className="py-24 bg-sedona-dark/95 relative overflow-hidden border-t border-b border-sedona-clay/10">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-sedona-orange flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5 mr-2 animate-pulse" /> Real-time 3D Experience
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-sedona-sand mt-3 mb-6">
            Sedona Soundscape Canvas
          </h2>
          <div className="w-16 h-0.5 bg-sedona-red mx-auto"></div>
        </div>

        {/* 3D Canvas Box with a picture that matches the business model (Acoustic Guitar sunset background) */}
        <div 
          className="relative w-full h-[450px] bg-cover bg-center border border-sedona-clay/15 rounded-3xl overflow-hidden shadow-2xl group"
          style={{ backgroundImage: "linear-gradient(to bottom, rgba(18, 18, 18, 0.6), rgba(18, 18, 18, 0.8)), url('https://images.unsplash.com/photo-1510915361894-db8b60106cb1?q=80&w=1200&auto=format&fit=crop')" }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          id="canvas-3d-wrapper"
        >
          {/* Three.js attachment target */}
          <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" id="threejs-canvas-target"></div>

          {/* User Guides Overlay */}
          <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row items-center justify-between pointer-events-none gap-4">
            <div className="bg-sedona-dark/90 backdrop-blur-md px-4 py-2 border border-sedona-clay/20 rounded-xl text-left">
              <span className="block text-[9px] font-mono uppercase tracking-widest text-sedona-orange">
                Visual Engine
              </span>
              <p className="text-xs text-sedona-sand/90 font-medium mt-0.5">
                Mathematical Sunset Waves &bull; Interactive 3D Particles
              </p>
            </div>

            <div className="flex items-center space-x-2 bg-sedona-clay/60 backdrop-blur-md px-4 py-2 border border-sedona-orange/30 rounded-xl">
              <MousePointerClick className="w-4 h-4 text-sedona-orange animate-pulse" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-sedona-sand">
                {isHovered ? "Move Mouse to Sculpt Wave" : "Hover to Interact"}
              </span>
            </div>
          </div>

          {/* Elegant top overlay shading */}
          <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-sedona-dark to-transparent pointer-events-none"></div>
          {/* Elegant bottom overlay shading */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-sedona-dark to-transparent pointer-events-none"></div>
        </div>

        {/* Additional poetic info */}
        <p className="text-center text-xs text-sedona-copper/70 max-w-lg mx-auto mt-6 font-mono uppercase tracking-[0.15em] leading-relaxed">
          Scroll up/down to amplify the sunset mountain ridges. Move cursor horizontally to spin the desert winds.
        </p>

      </div>
    </section>
  );
}
