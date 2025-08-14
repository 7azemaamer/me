import { onMount, onCleanup } from "solid-js";
import * as THREE from "three";

export default function ExperienceCanvas() {
  let container;
  let renderer, scene, camera;
  let animationId;
  let mouse = new THREE.Vector2();

  onMount(() => {
    scene = new THREE.Scene();
    scene.background = null;

    camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 30);

    renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const binaryElements = [];
    const binaryCount = 30;
    const createBinaryDigit = (value, position) => {
      const geometry = new THREE.PlaneGeometry(1, 1);
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const context = canvas.getContext('2d');
      
      context.fillStyle = 'rgba(0, 0, 0, 0.8)';
      context.font = '48px monospace';
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText(value, 32, 32);
      
      const texture = new THREE.CanvasTexture(canvas);
      const material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        opacity: 0.6
      });
      
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.copy(position);
      
      return {
        mesh,
        originalPosition: position.clone(),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.1,
          (Math.random() - 0.5) * 0.1,
          0
        ),
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        pulsePhase: Math.random() * Math.PI * 2,
        value: value
      };
    };

    for (let i = 0; i < binaryCount; i++) {
      const value = Math.random() > 0.5 ? '1' : '0';
      const position = new THREE.Vector3(
        (Math.random() - 0.5) * 60,
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 20
      );
      
      const binaryElement = createBinaryDigit(value, position);
      binaryElements.push(binaryElement);
      scene.add(binaryElement.mesh);
    }

    const onMouseMove = (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', onMouseMove);

    const clock = new THREE.Clock();
    const animate = () => {
      const elapsed = clock.getElapsedTime();

      camera.position.x = mouse.x * 5;
      camera.position.y = mouse.y * 3;
      camera.lookAt(0, 0, 0);

      const mouseInfluence = new THREE.Vector3(
        mouse.x * 20,
        mouse.y * 15,
        0
      );

      binaryElements.forEach((element, i) => {
        const { mesh, originalPosition, velocity, rotationSpeed, pulsePhase } = element;
        
        const floatY = Math.sin(elapsed * 0.5 + pulsePhase) * 2;
        const floatX = Math.cos(elapsed * 0.3 + pulsePhase) * 1;
        
        mesh.position.x = originalPosition.x + floatX + velocity.x * elapsed;
        mesh.position.y = originalPosition.y + floatY + velocity.y * elapsed;
        mesh.position.z = originalPosition.z + Math.sin(elapsed * 0.2 + i) * 3;

        mesh.rotation.z += rotationSpeed;

        const distanceToMouse = mesh.position.distanceTo(mouseInfluence);
        if (distanceToMouse < 15) {
          const attraction = mouseInfluence.clone().sub(mesh.position).normalize().multiplyScalar(0.2);
          mesh.position.add(attraction);
          
          const scale = 1 + (1 - distanceToMouse / 15) * 0.5;
          mesh.scale.setScalar(scale);
          
          mesh.material.opacity = 0.6 + (1 - distanceToMouse / 15) * 0.4;
        } else {
          mesh.scale.setScalar(1);
          mesh.material.opacity = 0.6;
        }

        if (mesh.position.x > 35) mesh.position.x = -35;
        if (mesh.position.x < -35) mesh.position.x = 35;
        if (mesh.position.y > 25) mesh.position.y = -25;
        if (mesh.position.y < -25) mesh.position.y = 25;

        if (Math.random() < 0.002) {
          element.value = element.value === '1' ? '0' : '1';
          const canvas = document.createElement('canvas');
          canvas.width = 64;
          canvas.height = 64;
          const context = canvas.getContext('2d');
          
          context.fillStyle = 'rgba(255, 255, 255, 0.8)';
          context.font = '48px monospace';
          context.textAlign = 'center';
          context.textBaseline = 'middle';
          context.fillText(element.value, 32, 32);
          
          mesh.material.map = new THREE.CanvasTexture(canvas);
        }
      });

      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };
    animate();

    const onResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", onResize);

    onCleanup(() => {
      cancelAnimationFrame(animationId);
      renderer.dispose();
      window.removeEventListener("resize", onResize);
      window.removeEventListener('mousemove', onMouseMove);
    });
  });

  return (
    <div
      ref={(el) => (container = el)}
      style="position:absolute;top:0;left:0;width:100%;height:100%;z-index:-1;"
    />
  );
}
