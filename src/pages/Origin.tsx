import React, { useState, useEffect, Suspense, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Stars, Html } from '@react-three/drei';
import * as THREE from 'three';

// Custom error boundary component
class ThreeJSErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; fallback: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.error('Error in 3D scene:', error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// Simplified Earth component without external textures
function Earth() {
  const earthRef = useRef<THREE.Group>(null);
  
  // Rotate the earth
  useFrame(() => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.0005;
    }
  });

  return (
    <group position={[0, 0, -15]} ref={earthRef}>
      {/* Earth sphere */}
      <mesh>
        <sphereGeometry args={[5, 32, 32]} />
        <meshPhongMaterial 
          color="#1a66ff"
          emissive="#00287a"
          specular="#111111"
          shininess={5}
        />
      </mesh>
      
      {/* Atmosphere glow */}
      <mesh>
        <sphereGeometry args={[5.05, 32, 32]} />
        <meshBasicMaterial 
          color="#4fc3f7"
          transparent={true}
          opacity={0.2}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

// Window component that frames the view of Earth
function PanoramicWindow() {
  return (
    <mesh position={[0, 0, -10]}>
      <planeGeometry args={[30, 15]} />
      <meshBasicMaterial color="#0f0f1f" opacity={0.1} transparent />
      <Box position={[-15, 0, 0]} args={[0.5, 15, 1]} color="#1a1a2e" />
      <Box position={[15, 0, 0]} args={[0.5, 15, 1]} color="#1a1a2e" />
      <Box position={[0, 7.5, 0]} args={[30, 0.5, 1]} color="#1a1a2e" />
      <Box position={[0, -7.5, 0]} args={[30, 0.5, 1]} color="#1a1a2e" />
    </mesh>
  );
}

// Reusable Box component for window frames and furniture
interface BoxProps {
  position: [number, number, number];
  args: [number, number, number];
  color: string;
}

function Box({ position, args, color }: BoxProps) {
  return (
    <mesh position={position}>
      <boxGeometry args={args} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

// Furniture components
function ReadingChair({ position = [5, -3, -5] as [number, number, number] }) {
  return (
    <group position={position} rotation={[0, -Math.PI / 4, 0]}>
      <Box position={[0, 0.5, 0]} args={[1.5, 1, 1.5]} color="#8B4513" />
      <Box position={[0, 1.5, -0.6]} args={[1.5, 2, 0.3]} color="#8B4513" />
    </group>
  );
}

function Couch({ position = [-5, -3, -5] as [number, number, number] }) {
  return (
    <group position={position} rotation={[0, Math.PI / 4, 0]}>
      <Box position={[0, 0.5, 0]} args={[3, 1, 1.5]} color="#2E4053" />
      <Box position={[0, 1.5, -0.7]} args={[3, 1, 0.2]} color="#2E4053" />
      <Box position={[-1.5, 1, 0]} args={[0.2, 2, 1.5]} color="#2E4053" />
      <Box position={[1.5, 1, 0]} args={[0.2, 2, 1.5]} color="#2E4053" />
    </group>
  );
}

function Desk({ position = [0, -3, -7] as [number, number, number] }) {
  return (
    <group position={position}>
      <Box position={[0, 1, 0]} args={[3, 0.2, 1.5]} color="#5D6D7E" />
      <Box position={[-1.3, 0, 0]} args={[0.2, 2, 1.5]} color="#5D6D7E" />
      <Box position={[1.3, 0, 0]} args={[0.2, 2, 1.5]} color="#5D6D7E" />
    </group>
  );
}

// Holographic display component
interface HologramProps {
  position: [number, number, number];
  title: string;
  content: React.ReactNode;
}

function Hologram({ position, title, content }: HologramProps) {
  const { camera } = useThree();
  const hologramRef = useRef<THREE.Group>(null);
  
  // Always face the camera
  useFrame(() => {
    if (hologramRef.current) {
      hologramRef.current.lookAt(camera.position);
    }
  });
  
  return (
    <group position={position} ref={hologramRef}>
      <mesh>
        <planeGeometry args={[4, 3]} />
        <meshBasicMaterial color="#4FC3F7" opacity={0.2} transparent side={THREE.DoubleSide} />
      </mesh>
      <Html transform distanceFactor={10} position={[0, 0, 0.1]}>
        <div className="hologram-content bg-blue-900/20 backdrop-blur-sm p-4 rounded text-blue-100 w-64">
          <h3 className="text-lg font-bold text-blue-300 mb-2">{title}</h3>
          <div className="text-xs">{content}</div>
        </div>
      </Html>
    </group>
  );
}

// Main scene component
function Scene() {
  // Hologram content
  const holograms = [
    {
      title: "Narrative Bio",
      content: (
        <p>
          Engineer turned analyst turned tech startup leader, now investor and consultant. 
          Driven by first principles thinking and building innovative solutions across sectors.
          Obsessed with the intersection of technology and possibility.
        </p>
      ),
      position: [7, 2, -8] as [number, number, number]
    },
    {
      title: "Life Journey",
      content: (
        <div>
          <p className="mb-2">A map of my evolving path:</p>
          <ul className="list-disc pl-4">
            <li>Minneapolis, MN - Current Base</li>
            <li>New York - Finance & Tech</li>
            <li>California - Startups</li>
            <li>International Projects - Africa, Asia, Europe</li>
          </ul>
        </div>
      ),
      position: [-7, 2, -8] as [number, number, number]
    },
    {
      title: "Systems Theory",
      content: (
        <p>
          Exploring the critical intersections of energy systems, infrastructure development, 
          and information networks. Analyzing how these three pillars form the foundation 
          of technological advancement and societal transformation.
        </p>
      ),
      position: [-4, 2, -5] as [number, number, number]
    },
    {
      title: "Focus Areas",
      content: (
        <div>
          <p className="mb-1">Passionate about the future of:</p>
          <ul className="list-disc pl-4">
            <li>Machine Learning</li>
            <li>Aerospace Innovation</li>
            <li>Robotics & Automation</li>
            <li>Data Visualization</li>
          </ul>
        </div>
      ),
      position: [4, 2, -5] as [number, number, number]
    }
  ];
  
  return (
    <>
      {/* Ambient light and point light for the scene */}
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      
      {/* Controls to navigate the scene */}
      <OrbitControls 
        enableZoom={true} 
        enablePan={true} 
        enableRotate={true}
        minDistance={5}
        maxDistance={20}
        target={[0, 0, -10]}
      />
      
      {/* Background stars */}
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0.5} fade />
      
      {/* Earth outside the window */}
      <Earth />
      
      {/* Window frame */}
      <PanoramicWindow />
      
      {/* Room furniture */}
      <ReadingChair />
      <Couch />
      <Desk />
      
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -5, 0]}>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color="#2C3E50" />
      </mesh>
      
      {/* Holographic displays */}
      {holograms.map((hologram, index) => (
        <Hologram 
          key={index}
          position={hologram.position}
          title={hologram.title}
          content={hologram.content}
        />
      ))}
    </>
  );
}

// Main Origin component
const Origin = () => {
  const [hasError, setHasError] = useState(false);

  // Error fallback component
  const Fallback = () => {
    // Set the error state when the fallback is rendered
    useEffect(() => {
      setHasError(true);
    }, []);
    
    return null; // This won't be visible, we'll show our own fallback UI
  };

  return (
    <div className="w-full h-screen bg-black overflow-hidden">
      {/* Top navigation bar */}
      <div className="absolute top-0 left-0 right-0 z-10 p-4 bg-gradient-to-b from-black to-transparent">
        <Link to="/" className="text-blue-300 hover:text-blue-500 px-4 py-2 rounded-full bg-gray-900/30 backdrop-blur-sm">
          ← Back to Nexus
        </Link>
      </div>
      
      {/* Main 3D canvas or fallback */}
      {!hasError ? (
        <ThreeJSErrorBoundary fallback={<Fallback />}>
          <Canvas camera={{ position: [0, 0, 5], fov: 70 }}>
            <Suspense fallback={null}>
              <Scene />
            </Suspense>
          </Canvas>
        </ThreeJSErrorBoundary>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center text-white">
          <div className="bg-matted p-8 rounded-lg max-w-xl shadow-2xl">
            <h1 className="text-4xl font-heading mb-6">Origin</h1>
            <p className="text-lg mb-8">
              A cozy, introspective space—an orbital den with a panoramic view of Earth.
            </p>
            <p className="mb-4">
              There was an error loading the 3D environment. 
              The complete experience includes an orbital room with Earth visible through a panoramic window,
              comfortable furniture, and holographic displays sharing my journey.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Origin; 