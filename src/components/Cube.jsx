import { useBox } from "@react-three/cannon"
import { extend } from "@react-three/fiber";
import * as textures from "../images/textures";
import { MeshStandardMaterial, BoxGeometry } from "three";
extend({ MeshStandardMaterial, BoxGeometry });

export const Cube = ({position, texture}) => {
    const [ref] = useBox(() => ({
        type: "Static",
        position,
    }))

    const activeTexture = textures[texture + 'Texture'] 

    return (
        <mesh ref={ref}>
            <boxGeometry attach="geometry" />
            <meshStandardMaterial attach="material" map={activeTexture} /> 
        </mesh>
    )
    

}