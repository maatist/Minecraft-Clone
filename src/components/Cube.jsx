import { useBox } from "@react-three/cannon"
import { extend } from "@react-three/fiber";
import { useStore } from "../hooks/useStore";
import * as textures from "../images/textures";
import { MeshStandardMaterial, BoxGeometry } from "three";
import { useState } from "react";
extend({ MeshStandardMaterial, BoxGeometry });

export const Cube = ({position, texture}) => {

    const [isHovered, setIsHovered] = useState(false)
    const [ removeCube ] = useStore(state => [state.removeCube])

    const [ref] = useBox(() => ({
        type: "Static",
        position,
    }))


    const activeTexture = textures[texture + 'Texture'] 

    return (
        <mesh 
            ref={ref}
            onPointerMove={(e) => {
                e.stopPropagation()
                setIsHovered(true)
            }}
            onPointerOut={(e) => {
                e.stopPropagation()
                setIsHovered(false)
            }}
            onClick={(e) => {
                e.stopPropagation()
                console.log(e.button)
                if (e.button === 2) {
                    const {x, y, z} = ref.current.position
                    console.log(x, y, z)
                    removeCube(x, y, z)
                }
            }}
        >
            <boxGeometry attach="geometry" />
            <meshStandardMaterial attach="material" map={activeTexture} color={isHovered ? 'grey' : 'white'} /> 
        </mesh>
    )
    

}