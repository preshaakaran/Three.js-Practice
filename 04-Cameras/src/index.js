import './style/main.css'
import * as THREE from 'three'
//Scene
const scene = new THREE.Scene();

//Red cube
const geometry = new THREE.BoxGeometry(1,1,1);
const material = new THREE.MeshBasicMaterial({color: 0xff0000});
const mesh = new THREE.Mesh(geometry,material);
scene.add(mesh);

//Sizes
const sizes = {
    width: 800,
    height: 600
}

const cursor={
    x:0,
    y:0
}

window.addEventListener('mousemove', (event) => {
    cursor.x=event.clientX / sizes.width - 0.5
    cursor.y=-(event.clientY / sizes.height - 0.5)
    console.log(cursor.x, cursor.y)
})

//Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000);
camera.position.z = 5;
camera.lookAt(mesh.position)
scene.add(camera);

//Renderer
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});
renderer.setSize(sizes.width, sizes.height);
// renderer.render(scene, camera);


const tick=() =>{
    // camera.position.x=cursor.x*3

    camera.position.x=Math.sin(cursor.x*Math.PI*2)*2
    camera.position.z=Math.cos(cursor.x*Math.PI*2)*2

    camera.position.y=cursor.y*3
    camera.lookAt(mesh.position)
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}

tick()
