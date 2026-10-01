"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, type RefObject } from "react";
import { MathUtils, PMREMGenerator, type Group, type Texture, type WebGLRenderer } from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { createEmblemGeometry } from "./emblemGeometry";

export type PointerTarget = { x: number; y: number };

type SceneProps = {
  /** Position du pointeur normalisée [-1, 1], mise à jour hors React. */
  pointer: RefObject<PointerTarget>;
  animate: boolean;
  lowPower: boolean;
};

const LIME = "#75D52F";

/** Reflets de studio générés localement (aucun fichier HDR à télécharger). */
function createStudioEnvironment(gl: WebGLRenderer) {
  const pmrem = new PMREMGenerator(gl);
  const room = new RoomEnvironment();
  const texture = pmrem.fromScene(room, 0.04).texture;
  room.dispose();
  pmrem.dispose();
  return texture;
}

function Emblem({ pointer, animate, lowPower }: SceneProps) {
  const group = useRef<Group>(null);
  const geometry = useMemo(() => createEmblemGeometry(lowPower ? "low" : "high"), [lowPower]);
  useEffect(() => () => geometry.dispose(), [geometry]);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g || !animate) return;
    const t = state.clock.elapsedTime;
    // Oscillation lente + inclinaison limitée vers le pointeur, amortie
    const targetY = Math.sin(t * 0.45) * 0.22 + pointer.current.x * 0.28;
    const targetX = Math.sin(t * 0.3) * 0.05 - pointer.current.y * 0.16;
    const k = 1 - Math.exp(-delta * 3);
    g.rotation.y = MathUtils.lerp(g.rotation.y, targetY, k);
    g.rotation.x = MathUtils.lerp(g.rotation.x, targetX, k);
    g.position.y = Math.sin(t * 0.8) * 0.025;
  });

  return (
    <group ref={group} rotation={[0, -0.18, 0]}>
      <mesh geometry={geometry} castShadow receiveShadow>
        <meshPhysicalMaterial
          color={LIME}
          metalness={0.25}
          roughness={0.32}
          clearcoat={lowPower ? 0 : 0.6}
          clearcoatRoughness={0.25}
        />
      </mesh>
    </group>
  );
}

export default function EmblemScene({ pointer, animate, lowPower, active, onReady }: SceneProps & {
  /** false lorsque le hero est hors écran : la boucle de rendu est suspendue. */
  active: boolean;
  onReady: () => void;
}) {
  const envMap = useRef<Texture | null>(null);
  useEffect(() => () => envMap.current?.dispose(), []);

  return (
    <Canvas
      shadows="percentage"
      dpr={lowPower ? [1, 1.5] : [1, 2]}
      frameloop={!active ? "never" : animate ? "always" : "demand"}
      camera={{ position: [0, 0, 5], fov: 32 }}
      gl={{ antialias: true, alpha: true, powerPreference: lowPower ? "low-power" : "default" }}
      onCreated={({ gl, scene }) => {
        gl.setClearColor(0x000000, 0);
        envMap.current = createStudioEnvironment(gl);
        scene.environment = envMap.current;
        scene.environmentIntensity = 0.55;
        onReady();
      }}
      aria-hidden="true"
    >
      <ambientLight intensity={0.25} />
      {/* Lumière principale haute-gauche : ombre portée sur la façade */}
      <directionalLight
        position={[-2.4, 3.2, 3.4]}
        intensity={2.2}
        castShadow
        shadow-mapSize={lowPower ? [512, 512] : [1024, 1024]}
        shadow-radius={6}
        shadow-bias={-0.0004}
        shadow-camera-left={-2}
        shadow-camera-right={2}
        shadow-camera-top={2}
        shadow-camera-bottom={-2}
        shadow-camera-near={0.5}
        shadow-camera-far={10}
      />
      {/* Contre-jour froid pour détacher les arêtes */}
      <directionalLight position={[2.5, 1, -2]} intensity={1.1} color="#cfe3ff" />
      <Emblem pointer={pointer} animate={animate} lowPower={lowPower} />
      {/* Plan invisible derrière l'objet : ne reçoit que l'ombre (comme un mur de façade) */}
      <mesh position={[0, 0, -0.45]} receiveShadow>
        <planeGeometry args={[8, 8]} />
        <shadowMaterial opacity={0.45} />
      </mesh>
    </Canvas>
  );
}
