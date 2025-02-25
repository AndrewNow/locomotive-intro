import * as THREE from 'three';
import vertexShader from '../shaders/vertex.glsl';
import fragmentShader from '../shaders/fragment.glsl';
import gsap from 'gsap';

export class WebGLReveal {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  mesh: THREE.Mesh;

  constructor(container: HTMLElement, texture: THREE.Texture) {
    try {
      // Scene setup
      this.scene = new THREE.Scene();
      console.log("Scene created");
      
      // Camera
      this.camera = new THREE.PerspectiveCamera(
        35,
        window.innerWidth / window.innerHeight,
        0.1,
        2000
      );
      this.camera.position.set(0, 0, 1600);

      // Renderer
      this.renderer = new THREE.WebGLRenderer({
        alpha: true
      });
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(this.renderer.domElement);

      // Mesh
      const geometry = new THREE.PlaneGeometry(1000, 667, 128, 128);
      const material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          uProgress: { value: 0.0 },
          uSize: { value: new THREE.Vector2(1000, 667) },
          uTexture: { value: texture }
        }
      });

      this.mesh = new THREE.Mesh(geometry, material);
      this.scene.add(this.mesh);

      // Start animation
      gsap.to(material.uniforms.uProgress, {
        duration: 3.0,
        value: 1.0
      });

      this.animate();
    } catch (error) {
      console.error("WebGL setup failed:", error);
    }
  }

  animate = () => {
    requestAnimationFrame(this.animate);
    this.renderer.render(this.scene, this.camera);
  }

  resize = () => {
    const aspect = window.innerWidth / window.innerHeight;
    this.camera.aspect = aspect;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }
}