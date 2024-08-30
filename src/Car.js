import React, { useEffect } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { TextureLoader, Mesh } from "three";

export function Car() {
  const gltf = useLoader(
    GLTFLoader,
    process.env.PUBLIC_URL + "models/car/scene.gltf"
  );

  // Load your custom texture
  const bodyTexture = useLoader(TextureLoader, process.env.PUBLIC_URL + "/models/car/textures/ai.png");

  useEffect(() => {
    gltf.scene.scale.set(0.005, 0.005, 0.005);
    gltf.scene.position.set(0, -0.035, 0);

    gltf.scene.traverse((object) => {
      if (object instanceof Mesh) {
        object.castShadow = true;
        object.receiveShadow = true;

        // Check if the object corresponds to the car body
        if (object.material.name === "Car_Paint") {
          ///console.log(object.material.color);
          object.material.color=null
        }
        if (object.material.name === "Car_Paint2") {
          //console.log(object.material.color);
          object.material.color=null
        }
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
