import * as THREE from 'three';

const vertexShader = `
  varying vec2 vUv;
  
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec2 uSize;
  uniform sampler2D uTexture;
  varying vec2 vUv;

  float noise(vec2 point) {
    float frequency = 1.0;
    float angle = atan(point.y, point.x) + uTime * 0.02;
    
    float w0 = (cos(angle * frequency) + 1.0) / 2.0;
    float w1 = (sin(2.0 * angle * frequency) + 1.0) / 2.0;
    float w2 = (cos(3.0 * angle * frequency) + 1.0) / 2.0;
    return (w0 + w1 + w2) / 3.0;
  }

  float circleSDF(vec2 pos, float rad) {
    float a = sin(uTime * 0.2) * 0.25;
    float amt = 0.5 + a;
    float circle = length(pos);
    circle += noise(pos) * rad * amt;
    return step(circle, rad);
  }

  float softMin(float a, float b, float k) {
    return -log(exp(-k * a) + exp(-k * b)) / k;
  }

  void main() {
    vec4 bg = vec4(vec3(0.0), 1.0);
    vec4 texture = texture2D(uTexture, vUv);
    vec2 coords = vUv * uSize;
    
    float rad = 0.3;
    vec2 center = vec2(0.5) * uSize;
    float c1 = circleSDF(coords - center, rad);
    
    vec2 o1 = vec2(0.3, 0.3) * uSize;
    vec2 o2 = vec2(0.7, 0.7) * uSize;
    
    float c2 = circleSDF(coords - o1, rad * 0.7);
    float c3 = circleSDF(coords - o2, rad * 0.7);
    
    float circle = softMin(c1, c2, 0.01);
    circle = softMin(circle, c3, 0.01);
    
    vec4 color = mix(bg, texture, circle);
    gl_FragColor = color;
  }
`;

export class RevealMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uSize: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        uTexture: { value: null }
      },
    });
  }
} 