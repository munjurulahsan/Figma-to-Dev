"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";

function TurntablePlane({
  url,
  rotationRef,
}: {
  url: string;
  rotationRef: React.MutableRefObject<number>;
}) {
  const texture = useTexture(url);
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();
  const bob = useRef(0);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    bob.current += delta;
    const wobble = Math.sin(rotationRef.current) * 0.5;
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, wobble, 0.12);
    meshRef.current.scale.x = 1 - Math.abs(Math.sin(meshRef.current.rotation.y)) * 0.08;
    meshRef.current.position.y = Math.sin(bob.current * 1.2) * 0.05;
  });

  const aspect = 512 / 382;
  const width = Math.min(viewport.width * 0.6, viewport.height * 0.7 * aspect);
  const height = width / aspect;

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[width, height]} />
      <meshBasicMaterial map={texture} transparent toneMapped={false} />
    </mesh>
  );
}

export default function ProductTurntable({
  imageUrl,
  onDegreesChange,
}: {
  imageUrl: string;
  onDegreesChange?: (deg: number) => void;
}) {
  const rotationRef = useRef(0);
  const dragging = useRef(false);
  const lastX = useRef(0);

  const handlePointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    lastX.current = e.clientX;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    const deltaX = e.clientX - lastX.current;
    lastX.current = e.clientX;
    rotationRef.current += deltaX * 0.012;
    let deg = Math.round((rotationRef.current * 180) / Math.PI) % 360;
    if (deg < 0) deg += 360;
    onDegreesChange?.(deg);
  };

  const handlePointerUp = () => {
    dragging.current = false;
  };

  // pan-y: horizontal drags rotate, vertical swipes still scroll the page on touch.
  return (
    <div
      className="absolute inset-0 cursor-grab touch-pan-y active:cursor-grabbing"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 5], fov: 30 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <TurntablePlane url={imageUrl} rotationRef={rotationRef} />
        </Suspense>
      </Canvas>
    </div>
  );
}
