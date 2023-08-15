import { usePlane } from "@react-three/cannon";
import { extend } from "@react-three/fiber";
import { PlaneGeometry, MeshStandardMaterial } from "three";
extend({ MeshStandardMaterial, PlaneGeometry });

import { floorTexture } from "../images/textures";
import { useStore } from "../hooks/useStore";




export function Ground() {
    const [ref] = usePlane(() => ({
        rotation: [-Math.PI / 2, 0, 0],
        position: [ 0,-0.5, 0],
        scale: [1, 1, 1],
    }));

    const [ addCube ] = useStore(state => [state.addCube])

    const handleClickGround = event => {
        event.stopPropagation();
        const [x, y, z] = Object.values(event.point).map(n => Math.ceil(n));
        addCube(x, y, z);
    }
    
    floorTexture.repeat.set(50, 50);
    return (
        <mesh 
            onClick={handleClickGround}
            ref={ref}>
            <planeGeometry attach='geometry' args={[50, 50]} />
            <meshStandardMaterial attach='material' map={floorTexture}/>
        </mesh>
    );
    }