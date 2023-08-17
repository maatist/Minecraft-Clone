import { useEffect, useState } from 'react';
import * as images from '../images/images';
import { useKeyboard } from '../hooks/useKeyboard';
import { useStore } from '../hooks/useStore';
import './../index.css'

export const TextureSelector = () => {
    const [visible, setVisible] = useState(true);
    const [texture, setTexture] = useStore(state => [state.texture, state.setTexture]);

    const {
        dirt,
        grass,
        glass,
        wood,
        log
    } = useKeyboard();

    useEffect(() => {
        const options = {
            dirt,
            grass,
            glass,
            wood,
            log
        };
        const selectedTexture = Object
            .entries(options)
            .find(([texture, isEnabled]) => isEnabled) 

            if (selectedTexture) {
                const [ textureName ] = selectedTexture
                setTexture(textureName);
            }
            console.log(selectedTexture);
        }, [dirt, grass, glass, wood, log]);


    if (!visible) return null;

    return (
        <div
            className='texture-selector'    
        >
            {
                Object.entries(images).map(([textureName, textureImage]) => {
                    return (
                        <img
                            key={textureName}
                            src={textureImage}
                            alt={textureName}
                       />

                    )
                })
            }
        </div>
    )
}