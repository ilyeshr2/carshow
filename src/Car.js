import React, { useEffect } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { TextureLoader, Mesh } from "three";

export function Car() {
  const gltf = useLoader(
    GLTFLoader,
    process.env.PUBLIC_URL + "models/car/scene.gltf"
  );

  // Load your texture (replace with your actual image path)
  const bodyTexture = useLoader(TextureLoader, process.env.PUBLIC_URL + "/models/car/textures/TireMaterial_baseColor.png");

  useEffect(() => {
    gltf.scene.scale.set(0.005, 0.005, 0.005);
    gltf.scene.position.set(0, -0.035, 0);
    gltf.scene.traverse((object) => {
      if (object instanceof Mesh) {
        object.castShadow = true;
        object.receiveShadow = true;

        object.material.map = bodyTexture;
        object.material.needsUpdate = true;
         
      }
    });
  }, [gltf, bodyTexture]);

  useFrame((state) => {
    let t = state.clock.getElapsedTime();

    let group = gltf.scene.children[0].children[0].children[0];
    group.children[0].rotation.x = t * 2;
    group.children[2].rotation.x = t * 2;
    group.children[4].rotation.x = t * 2;
    group.children[6].rotation.x = t * 2;
  });

  return <primitive object={gltf.scene} />;
}
