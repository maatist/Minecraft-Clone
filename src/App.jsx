import { Canvas } from '@react-three/fiber'
import { Sky} from '@react-three/drei'
import { Physics } from '@react-three/cannon'
import { Ground } from './components/Ground'
import { FPV } from './components/FPV'

import WebGL from 'three/addons/capabilities/WebGL.js';
import { Player } from './components/Player'

function App() {

  if ( WebGL.isWebGLAvailable() ) {

  return (
      <Canvas>
        <Sky sunPosition={[100, 200, 100]} />
        <ambientLight intensity={0.6} />
        <FPV />
        <Physics>
          <Player />
          <Ground />
        </Physics>
      </Canvas>
  ) }
  else {
    const warning = WebGL.getWebGLErrorMessage();
    document.getElementById( 'container' ).appendChild( warning );
  
  }
}

export default App
