import * as THREE from 'three';
import gsap from 'gsap';
import MeshItem from './MeshItem';
import Loader from './Loader';

console.log('ShaderScript.js - Starting execution');

// Basic THREE.js setup to test if imports are working
try {
  console.log('Imports successful');
  
  // Create a simple scene to verify THREE.js works
  const scene = new THREE.Scene();
  console.log('Scene created successfully');
  
  // Try to get the canvas
  document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded');
    const canvas = document.getElementById('webgl');
    console.log('Canvas element found:', !!canvas);
    
    if (canvas) {
      // Basic renderer setup
      const renderer = new THREE.WebGLRenderer({ canvas });
      console.log('Renderer created successfully');

      const sizes = {
        width: window.innerWidth,
        height: window.innerHeight
      };

      const camera = new THREE.PerspectiveCamera(
        75,
        sizes.width / sizes.height,
        0.1,
        100
      );
      camera.position.set(0, 0, 1.5);
      scene.add(camera);

      // Create mesh items
      const loader = new Loader();
      loader.loadTextures((textures) => {
        console.log('Textures loaded:', textures.length);
        
        const mesh = new MeshItem(1, 1);
        mesh.material.uniforms.uTexture.value = textures[0];
        scene.add(mesh);
        
        // Animation
        const tick = () => {
          renderer.render(scene, camera);
          window.requestAnimationFrame(tick);
        };
        
        tick();
      });

      // Handle resize
      window.addEventListener('resize', () => {
        sizes.width = window.innerWidth;
        sizes.height = window.innerHeight;
        
        camera.aspect = sizes.width / sizes.height;
        camera.updateProjectionMatrix();
        
        renderer.setSize(sizes.width, sizes.height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      });
    }
  });
  
} catch (error) {
  console.error('Error in ShaderScript.js:', error);
}

console.log('ShaderScript.js - Reached end of file');
