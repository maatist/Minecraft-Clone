
import { nanoid } from 'nanoid';
import create from 'zustand';

export const useStore = create((set) => ({ 
    texture: 'dirt',
    cubes: [{
        id: nanoid(),
        pos: [1, 1, 1],
        texture: 'dirt',
    },
    {
        id: nanoid(),
        pos: [1, 3, 1],
        texture: 'log',
    },
    {
        id: nanoid(),
        pos: [2, 1, 1],
        texture: 'grass',
    },

],
    addCube: (x, y, z) => {
        set(state => ({
            cubes: [...state.cubes, {
                id: nanoid(),
                pos: [x, y, z],
                texture: state.texture,
            }]
        }))

    },
    removeCube: () => {},
    setTexture: () => {},
    saveWorld: () => {},
    resetWorld: () => {},

}));