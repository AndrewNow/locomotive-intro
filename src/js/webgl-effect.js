import * as THREE from 'three';
import { WebGLReveal } from '../components/WebGLReveal';

export function initWebGL() {
  console.log("WebGL init starting");
  const container = document.getElementById("webgl-container");
  const heroText = document.getElementById("hero-text");
  
  if (!container || !heroText) {
    console.log("Container or hero text not found");
    return;
  }

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  if (!ctx) return;

  ctx.fillStyle = "white";
  ctx.font = "64px serif";
  ctx.textBaseline = "bottom";
  ctx.fillText(heroText.textContent || "", 32, canvas.height - 32);

  const texture = new THREE.CanvasTexture(canvas);
  const effect = new WebGLReveal(container, texture);

  window.addEventListener("resize", () => effect.resize());
} 