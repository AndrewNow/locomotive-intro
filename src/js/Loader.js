import * as THREE from 'three'
import image1 from 'https://iiodzelpjz.ufs.sh/f/uU55CSHY2nOZ0VjUX7MoQFWieS5JjcpCAfZBUn7hEDXO8vIP'

export default class Loader {
    loadTextures(onComplete) {
        const textureLoader = new THREE.TextureLoader()
        let loadCount = 0
        const imageSources = [image1]
        const textures = []
        
        imageSources.forEach((src, index) => {
            const onLoad = (texture) => {
                textures[index] = texture
    
                loadCount += 1
                if (loadCount == imageSources.length) {
                    onComplete(textures)
                }
            }
            textureLoader.load(src, onLoad)
        })
    }
}