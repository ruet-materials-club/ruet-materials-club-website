"use client";

import IconFallback from "@/images/logo-3d.webp";
import { cn } from "@/lib/utils";
import { useThrottle } from "@react-hook/throttle";
import { Canvas, ThreeElements, useThree, Vector3 } from "@react-three/fiber";
import Image from "next/image";
import { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";

function Node(props: ThreeElements["mesh"]) {
  const meshRef = useRef<THREE.Mesh>(null!);

  return (
    <mesh castShadow {...props} ref={meshRef}>
      <sphereGeometry args={[0.15, 16, 32]} />
      <meshStandardMaterial color="#71797E" metalness={0.6} roughness={0.6} />
    </mesh>
  );
}

function Edge(props: ThreeElements["mesh"] & { l: number; i: number }) {
  const meshRef = useRef<THREE.Mesh>(null!);

  return (
    <mesh
      castShadow
      {...props}
      ref={meshRef}
      position={[Math.sqrt(0.75) * (props.i - 2), 0, 0]}
    >
      <cylinderGeometry args={[0.03, 0.03, props.l, 8]} />
      <meshStandardMaterial color="#71797E" metalness={0.6} roughness={0.6} />
    </mesh>
  );
}

function Edges(props: ThreeElements["mesh"]) {
  return [-1, 0, 1].map((x) => (
    <group key={x} rotation={[0, 0, (x * Math.PI) / 3]}>
      {[2, 3, 4, 3, 2].map((l, i) => (
        <Edge key={i} i={i} l={l} {...props} />
      ))}
    </group>
  ));
}

const nodes = [
  [0, 2, 0],
  [0, 1, 0],
  [0, 0, 0],
  [0, -1, 0],
  [0, -2, 0],
  [(Math.sqrt(3) / 2) * -1, 0.5, 0],
  [(Math.sqrt(3) / 2) * -1, 1.5, 0],
  [(Math.sqrt(3) / 2) * -1, -0.5, 0],
  [(Math.sqrt(3) / 2) * -1, -1.5, 0],
  [(Math.sqrt(3) / 2) * 1, 0.5, 0],
  [(Math.sqrt(3) / 2) * 1, 1.5, 0],
  [(Math.sqrt(3) / 2) * 1, -0.5, 0],
  [(Math.sqrt(3) / 2) * 1, -1.5, 0], // 12
  [(Math.sqrt(3) / 2) * -2, 1, 0], // 13
  [(Math.sqrt(3) / 2) * -2, 0, 0],
  [(Math.sqrt(3) / 2) * -2, -1, 0], // 15
  [(Math.sqrt(3) / 2) * 2, 1, 0],
  [(Math.sqrt(3) / 2) * 2, 0, 0],
  [(Math.sqrt(3) / 2) * 2, -1, 0],
] as THREE.Vector3Tuple[];

function ResponsiveGroup() {
  const { viewport } = useThree();
  return (
    <group
      position={[0, 0, 0.15]}
      scale={(1.05 * viewport.width) / 4.8}
      castShadow
    >
      {nodes.map((node, i) => (
        <Node position={node} key={i} />
      ))}
      <Edges />
    </group>
  );
}

const isWebGLSupported = () => {
  if (typeof window === "undefined") return false;
  const canvas = document.createElement("canvas");
  return (
    !!canvas.getContext("webgl") || !!canvas.getContext("experimental-webgl")
  );
};

export default function Icon() {
  const [pointLightPosition, setPointLightPosition] = useThrottle<Vector3>([
    -Math.SQRT1_2,
    Math.SQRT1_2,
    1.5,
  ]);
  const [isSupported, setIsSupported] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    setIsSupported(isWebGLSupported());
    function handleMouseMove(event: MouseEvent) {
      if (!canvasRef.current) return;
      const { width, height, x, y } = canvasRef.current.getBoundingClientRect();
      const dx = event.clientX - x - width / 2;
      const dy = -(event.clientY - y - height / 2);
      setPointLightPosition([
        Math.max(Math.min((2 * dx) / width, 1), -1),
        Math.max(Math.min((2 * dy) / height, 1), -1),
        1.5,
      ]);
    }
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [setPointLightPosition]);

  const style = { maxWidth: "min(480px, calc(100% - 8rem))" };
  const className = cn("box-content aspect-square w-full px-16");
  const fallback = (
    <Image src={IconFallback} alt="Icon" className={className} style={style} />
  );

  return isSupported ? (
    <Suspense fallback={fallback}>
      <Canvas
        shadows
        ref={canvasRef}
        className={className}
        style={style}
        orthographic
        camera={{ position: [0, 0, 2], zoom: 100 }}
      >
        <ambientLight intensity={Math.PI / 2} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          decay={0}
          intensity={Math.PI}
        />
        <directionalLight
          position={pointLightPosition}
          // decay={0}
          intensity={Math.PI}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <ResponsiveGroup />
        <mesh
          position={[0, 0, 0]}
          receiveShadow
          material={new THREE.ShadowMaterial({ opacity: 0.25 })}
        >
          <planeGeometry args={[5, 5]} />
        </mesh>
      </Canvas>
    </Suspense>
  ) : (
    fallback
  );
}
