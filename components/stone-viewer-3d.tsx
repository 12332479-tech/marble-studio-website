"use client"

import { useMemo, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import * as THREE from "three"
import type { Stone } from "@/lib/products-data"

// Procedurally paint a marble/granite texture onto a canvas using the
// stone's real base + vein colors, then use it as a Three.js texture.
function useStoneTexture(stone: Stone) {
  return useMemo(() => {
    const size = 512
    const canvas = document.createElement("canvas")
    canvas.width = size
    canvas.height = size
    const ctx = canvas.getContext("2d")!

    // Base fill
    ctx.fillStyle = stone.base
    ctx.fillRect(0, 0, size, size)

    // Mottled base variation
    for (let i = 0; i < 1400; i++) {
      const x = Math.random() * size
      const y = Math.random() * size
      const r = Math.random() * 26 + 4
      ctx.globalAlpha = Math.random() * 0.05
      ctx.fillStyle = Math.random() > 0.5 ? stone.vein : stone.base
      ctx.beginPath()
      ctx.arc(x, y, r, 0, Math.PI * 2)
      ctx.fill()
    }
    ctx.globalAlpha = 1

    const isGranite = stone.category === "granite"

    if (isGranite) {
      // Speckled granite grains
      for (let i = 0; i < 9000; i++) {
        const x = Math.random() * size
        const y = Math.random() * size
        const r = Math.random() * 2.2 + 0.4
        ctx.globalAlpha = Math.random() * 0.5 + 0.1
        ctx.fillStyle = Math.random() > 0.45 ? stone.vein : "#ffffff"
        ctx.beginPath()
        ctx.arc(x, y, r, 0, Math.PI * 2)
        ctx.fill()
      }
    } else {
      // Flowing marble veins
      const veinCount = 5 + Math.floor(Math.random() * 4)
      for (let v = 0; v < veinCount; v++) {
        ctx.globalAlpha = 0.5 + Math.random() * 0.4
        ctx.strokeStyle = stone.vein
        ctx.lineWidth = Math.random() * 3 + 0.6
        ctx.beginPath()
        let x = Math.random() * size
        let y = Math.random() * -40
        ctx.moveTo(x, y)
        while (y < size + 40) {
          x += (Math.random() - 0.5) * 90
          y += Math.random() * 46 + 18
          const cx = x + (Math.random() - 0.5) * 80
          const cy = y - Math.random() * 30
          ctx.quadraticCurveTo(cx, cy, x, y)
        }
        ctx.stroke()

        // faint hairline branches
        ctx.globalAlpha = 0.18
        ctx.lineWidth = 0.5
        ctx.stroke()
      }
    }
    ctx.globalAlpha = 1

    const texture = new THREE.CanvasTexture(canvas)
    texture.anisotropy = 8
    texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping
    // The canvas was painted with plain sRGB hex colors (stone.base /
    // stone.vein). Three's color-managed renderer treats texture data as
    // linear unless told otherwise, which was washing dark colors out
    // toward white. Flag it as sRGB so it's decoded correctly.
    texture.colorSpace = THREE.SRGBColorSpace
    return texture
  }, [stone])
}

function Slab({ stone }: { stone: Stone }) {
  const group = useRef<THREE.Group>(null)
  const texture = useStoneTexture(stone)

  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.35
  })

  const materials = useMemo(() => {
    const face = new THREE.MeshStandardMaterial({
      map: texture,
      roughness: stone.category === "granite" ? 0.6 : 0.42,
      metalness: 0,
    })
    const edge = new THREE.MeshStandardMaterial({
      color: stone.base,
      roughness: 0.65,
      metalness: 0,
    })
    // BoxGeometry material order: +X, -X, +Y, -Y, +Z, -Z
    return [edge, edge, face, edge, face, face]
  }, [texture, stone])

  return (
    <group ref={group} rotation={[0.15, 0.4, 0]}>
      <mesh material={materials} castShadow>
        <boxGeometry args={[3, 0.28, 2]} />
      </mesh>
    </group>
  )
}

export function StoneViewer3D({ stone }: { stone: Stone }) {
  return (
    <Canvas
      shadows
      camera={{ position: [3.4, 2.4, 3.8], fov: 42 }}
      dpr={[1, 2]}
      gl={{ antialias: true }}
    >
      <color attach="background" args={["#141210"]} />
      {/* Plain, controlled lights only — no HDRI environment map. An
          environment texture (e.g. drei's <Environment preset="studio" />)
          adds its own reflections/color on top of the material, and a
          bright softbox-style preset was overpowering every stone's true
          color, rendering slabs as near-white regardless of their texture. */}
      <hemisphereLight args={["#3a3632", "#0a0908", 0.5]} />
      <directionalLight position={[5, 8, 5]} intensity={1.3} castShadow />
      <directionalLight position={[-4, 3, -4]} intensity={0.45} />
      <directionalLight position={[0, 2, -6]} intensity={0.25} />
      <Slab stone={stone} />
      <OrbitControls
        enablePan={false}
        minDistance={3}
        maxDistance={8}
        minPolarAngle={0.4}
        maxPolarAngle={Math.PI / 2 - 0.05}
      />
    </Canvas>
  )
}
