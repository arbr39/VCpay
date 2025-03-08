import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Настройка сцены
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf0f0f0);

// Настройка камеры
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Настройка рендерера
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.outputEncoding = THREE.sRGBEncoding;
document.getElementById('3d-container').appendChild(renderer.domElement);

// Освещение
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);

// Загрузка 3D-модели
const loader = new GLTFLoader();
let smartphone;

loader.load(
  'assets/models/smartphone.glb', // Путь к вашей модели
  function (gltf) {
    smartphone = gltf.scene;
    smartphone.scale.set(1.5, 1.5, 1.5);
    scene.add(smartphone);
    
    // Анимация появления
    gsap.from(smartphone.rotation, {
      y: Math.PI * 2,
      duration: 2,
      ease: "power2.out"
    });
  },
  function (xhr) {
    console.log((xhr.loaded / xhr.total * 100) + '% загружено');
  },
  function (error) {
    console.error('Ошибка при загрузке модели:', error);
  }
);

// Добавление контролов для управления моделью
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.maxDistance = 10;
controls.minDistance = 3;

// Функция анимации
function animate() {
  requestAnimationFrame(animate);
  
  if (smartphone) {
    // Легкое вращение модели
    smartphone.rotation.y += 0.002;
  }
  
  controls.update();
  renderer.render(scene, camera);
}

// Ресайз при изменении размера окна
window.addEventListener('resize', function() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();
