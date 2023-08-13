import { useSphere } from "@react-three/cannon"
import { useFrame, useThree } from "@react-three/fiber"
import { useEffect, useRef } from "react"
import { Vector3 } from "three"
import { useKeyboard } from "../hooks/useKeyboard"

const CHARACTER_SPEED = 2
const CHARACTER_JUMP_FORCE = 10


export const Player = () => {

    const {
        moveForward,
        moveBackward,
        moveLeft,
        moveRight,
        jump,
    } = useKeyboard()
    
    const {camera} = useThree()
    const [ref, api] = useSphere(() => ({
        mass: 1,
        type: "Dynamic",
        position: [0, 0.5, 0],

    }))

    const pos = useRef([0, 0, 0])
    useEffect(() => {
        api.position.subscribe((p) => (pos.current = p))
    }, [api.position])

    const vel = useRef([0, 0, 0])
    useEffect(() => {
        api.velocity.subscribe((p) => (vel.current = p))
    }, [api.velocity])

    useFrame(() => {
        camera.position.copy(
            new Vector3(
               pos.current[0],
               pos.current[1],
               pos.current[2]
            )
        )
        
        // movimiento

        const direction = new Vector3()

        const frontVector = new Vector3(
            0,
            0,
            (moveBackward ? 1 : 0) - (moveForward ? 1 : 0)
        )

        const sideVector = new Vector3(
            (moveLeft ? 1 : 0) - (moveRight ? 1 : 0),
            0,
            0
        )

        direction
            .subVectors(frontVector, sideVector)
            .normalize()
            .multiplyScalar(CHARACTER_SPEED)
            .applyEuler(camera.rotation)

        api.velocity.set(
            direction.x, 
            vel.current[1], 
            direction.z)

    })

    return (
        <mesh ref={ref}>

        </mesh>
    )
}
