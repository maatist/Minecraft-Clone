
import { nanoid } from 'nanoid';
import create from 'zustand';

const getLocalStorage = (key) => JSON.parse(window.localStorage.getItem(key));
const setLocalStorage = (key, value) => window.localStorage.setItem(key,JSON.stringify(value));



export const useStore = create((set) => ({ 
    texture: 'dirt',
    cubes: getLocalStorage('cubes') || [],
    addCube: (x, y, z) => {
        set(state => ({
            cubes: [...state.cubes, {
                id: nanoid(),
                pos: [x, y, z],
                texture: state.texture,
            }]
        }))

    },
    removeCube: (x, y, z) => {
        set(state => ({
            cubes: state.cubes.filter(cube => {
                const [X, Y, Z] = cube.pos;
                return x !== X || y !== Y || z !== Z;
            })
        }))
    },
    setTexture: (texture) => {
        set(() => ({texture}))
    },
    saveWorld: () => {
        set((prev) => {
            setLocalStorage('cubes', prev.cubes);
            return prev;
        })
    },
    resetWorld: () => {
        set(() => ({cubes: []}))
    },

}));