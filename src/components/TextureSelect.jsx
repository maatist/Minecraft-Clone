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
        glass,
        grass,
        log,
        wood,
    } = useKeyboard();

    useEffect(() => {
        const options = {
            dirt,
            glass,
            grass,
            log,
            wood,
        };
        const selectedTexture = Object
            .entries(options)
            .find(([texture, isEnabled]) => isEnabled) 

            if (selectedTexture) {
                const [ textureName ] = selectedTexture
                setTexture(textureName);
            }
            console.log(selectedTexture);
        }, [dirt,
            glass,
            grass,
            log,
            wood]);


    if (!visible) return null;

    return (
        <div
            className='texture-selector'    
        >
            {
                Object.entries(images).map(([textureName, textureImage]) => {
                    return (
                        <img
                            className={texture === textureName.replace('Img', '') ? 'selected' : ''}
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