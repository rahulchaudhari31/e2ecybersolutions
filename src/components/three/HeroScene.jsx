import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { gsap, useGSAP } from "../../utils/gsap";

const PARTICLE_COUNT = 1400;
const MAX_NODES = 48;

const seededRandom = (seed) => {
  const value = Math.sin(seed * 127.1) * 43758.5453;
  return value - Math.floor(value);
};

function NetworkGlobe({ pointer }) {
  const group = useRef(null);
  const lineMaterial = useRef(null);
  const nodeMesh = useRef(null);

  const shellGeometry = useMemo(() => new THREE.IcosahedronGeometry(1.55, 2), []);
  const shellMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: "#2f6bff",
        wireframe: true,
        transparent: true,
        opacity: 0.2,
      }),
    [],
  );
  const nodeGeometry = useMemo(() => new THREE.SphereGeometry(0.034, 6, 6), []);
  const nodeMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: "#5c8bff",
        transparent: true,
        opacity: 0.9,
      }),
    [],
  );

  const { nodes, connections } = useMemo(() => {
    const position = shellGeometry.getAttribute("position");
    const unique = [];
    const seen = new Set();

    for (let index = 0; index < position.count; index += 1) {
      const point = new THREE.Vector3().fromBufferAttribute(position, index);
      const key = `${point.x.toFixed(2)}|${point.y.toFixed(2)}|${point.z.toFixed(2)}`;
      if (seen.has(key)) continue;
      seen.add(key);
      unique.push(point);
    }

    const picked = unique.filter((_, index) => index % Math.ceil(unique.length / MAX_NODES) === 0)
      .slice(0, MAX_NODES);
    const segments = [];

    picked.forEach((point, index) => {
      picked.slice(index + 1).forEach((other) => {
        if (point.distanceTo(other) < 0.78) {
          segments.push(point.x, point.y, point.z, other.x, other.y, other.z);
        }
      });
    });

    return {
      nodes: picked,
      connections: new Float32Array(segments),
    };
  }, [shellGeometry]);

  useEffect(() => {
    if (!nodeMesh.current) return;
    const dummy = new THREE.Object3D();
    nodes.forEach((point, index) => {
      dummy.position.copy(point);
      dummy.updateMatrix();
      nodeMesh.current.setMatrixAt(index, dummy.matrix);
    });
    nodeMesh.current.instanceMatrix.needsUpdate = true;
  }, [nodes]);

  useEffect(
    () => () => {
      shellGeometry.dispose();
      shellMaterial.dispose();
      nodeGeometry.dispose();
      nodeMaterial.dispose();
    },
    [shellGeometry, shellMaterial, nodeGeometry, nodeMaterial],
  );

  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.075;
      group.current.rotation.x = THREE.MathUtils.lerp(
        group.current.rotation.x,
        pointer.current.y * 0.12,
        0.035,
      );
      group.current.rotation.z = THREE.MathUtils.lerp(
        group.current.rotation.z,
        -pointer.current.x * 0.08,
        0.035,
      );
    }

    if (lineMaterial.current) {
      lineMaterial.current.opacity = 0.12 + (Math.sin(state.clock.elapsedTime * 2.2) + 1) * 0.05;
    }
  });

  return (
    <group ref={group}>
      <mesh geometry={shellGeometry} material={shellMaterial} />
      <instancedMesh
        ref={nodeMesh}
        args={[nodeGeometry, nodeMaterial, nodes.length]}
      />
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[connections, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          ref={lineMaterial}
          color="#5c8bff"
          transparent
          opacity={0.14}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}

function ParticleField() {
  const points = useRef(null);

  const geometry = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);

    for (let index = 0; index < PARTICLE_COUNT; index += 1) {
      const radius = 2.1 + seededRandom(index * 3 + 1) * 3.2;
      const theta = seededRandom(index * 3 + 2) * Math.PI * 2;
      const phi = Math.acos(2 * seededRandom(index * 3 + 3) - 1);
      positions[index * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[index * 3 + 1] = radius * Math.cos(phi) * 0.72;
      positions[index * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
    }

    const buffer = new THREE.BufferGeometry();
    buffer.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return buffer;
  }, []);

  const material = useMemo(
    () =>
      new THREE.PointsMaterial({
        color: "#b8c2d8",
        size: 0.017,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.55,
        depthWrite: false,
      }),
    [],
  );

  useEffect(
    () => () => {
      geometry.dispose();
      material.dispose();
    },
    [geometry, material],
  );

  useFrame((_, delta) => {
    if (!points.current) return;
    points.current.rotation.y -= delta * 0.012;
    points.current.rotation.z += delta * 0.004;
  });

  return <points ref={points} geometry={geometry} material={material} />;
}

function CameraRig({ pointer }) {
  useFrame(({ camera }) => {
    camera.position.x += (pointer.current.x * 0.24 - camera.position.x) * 0.045;
    camera.position.y += (-pointer.current.y * 0.16 - camera.position.y) * 0.045;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

function SceneContent({ pointer }) {
  const scrollGroup = useRef(null);
  const { camera } = useThree();

  // ScrollTrigger is already synced to Lenis by SmoothScrollProvider.
  useGSAP(() => {
    const trigger = document.querySelector('[data-story-anchor="hero"]');
    if (!trigger || !scrollGroup.current) return;

    const scrollTrigger = () => ({
      trigger,
      start: "top top",
      end: "bottom top",
      scrub: 0.6,
    });

    gsap.to(scrollGroup.current.rotation, {
      y: Math.PI * 1.25,
      z: -0.22,
      ease: "none",
      scrollTrigger: scrollTrigger(),
    });
    gsap.to(scrollGroup.current.scale, {
      x: 0.66,
      y: 0.66,
      z: 0.66,
      ease: "none",
      scrollTrigger: scrollTrigger(),
    });
    gsap.to(camera.position, { z: 6.3, ease: "none", scrollTrigger: scrollTrigger() });
  }, []);

  return (
    <>
      <group ref={scrollGroup}>
        <Float speed={1.2} rotationIntensity={0.16} floatIntensity={0.38}>
          <NetworkGlobe pointer={pointer} />
        </Float>
        <ParticleField />
      </group>
      <CameraRig pointer={pointer} />
    </>
  );
}

export default function HeroScene({ pointer, active }) {
  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      dpr={[1, 2]}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 5.2], fov: 42, near: 0.1, far: 30 }}
      style={{ background: "transparent" }}
    >
      <SceneContent pointer={pointer} />
    </Canvas>
  );
}
