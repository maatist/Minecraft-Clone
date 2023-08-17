import { useBox } from "@react-three/cannon"
import { extend } from "@react-three/fiber";
import { useStore } from "../hooks/useStore";
import * as textures from "../images/textures";
import { MeshStandardMaterial, BoxGeometry } from "three";
import { useState } from "react";
extend({ MeshStandardMaterial, BoxGeometry });

export const Cube = ({position, texture}) => {

    const [isHovered, setIsHovered] = useState(false)
    const [ removeCube, addCube ] = useStore(state => [state.removeCube, state.addCube])

    const [ref] = useBox(() => ({
        type: "Static",
        position,
    }))

    const handleFaceClick = (e) => {
        const clickedFace = Math.floor(e.faceIndex / 2)
            const {x, y, z} = ref.current.position
            console.log('clicked face', clickedFace)
            if (clickedFace === 0) {
                addCube(x + 1, y, z)
            } else if (clickedFace === 1) {
                addCube(x - 1, y, z)
            } else if (clickedFace === 2) {
                addCube(x, y + 1, z)
            } else if (clickedFace === 3) {
                addCube(x, y - 1, z)
            } else if (clickedFace === 4) {
                addCube(x , y , z + 1)
            } else if (clickedFace === 5) {
                addCube(x, y, z - 1)
            } 
    }


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
                } else if (e.button === 0) {
                    handleFaceClick(e)
                }
            }}
        >
            <boxGeometry attach="geometry" />
            <meshStandardMaterial attach="material" map={activeTexture} color={isHovered ? 'grey' : 'white'} /> 
        </mesh>
    )
    

}