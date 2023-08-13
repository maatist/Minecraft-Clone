import { usePlane } from "@react-three/cannon";
import { extend } from "@react-three/fiber";
import { PlaneGeometry, MeshStandardMaterial } from "three";
extend({ MeshStandardMaterial, PlaneGeometry });

import { grassTexture } from "../images/textures";

grassTexture.repeat.set(100, 100);


export function Ground() {
    const [ref] = usePlane(() => ({
        rotation: [-Math.PI / 2, 0, 0],
        position: [ 0,-0.5, 0],
        scale: [1, 1, 1],
    }));

    
    return (
        <mesh ref={ref} re>
            <planeGeometry attach='geometry' args={[100, 100]} />
            <meshStandardMaterial attach='material' map={grassTexture}/>
        </mesh>
    );
    }