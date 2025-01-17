import './style/main.css'
import * as THREE from 'three'
import * as dat from 'dat.gui'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { color } from 'dat.gui';
import gsap from 'gsap'
//Scene
const scene = new THREE.Scene();
const gui = new dat.GUI({closed: true, width: 400})
// gui.hide()

const parameter={
    color: 0xff0000,
    spin: () => {
        gsap.to(mesh.rotation, {duration: 1, y: mesh.rotation.y + Math.PI * 2})
    }
}

//Red cube
const geometry = new THREE.BoxGeometry(1,1,1);
const material = new THREE.MeshBasicMaterial({color: parameter.color});
const mesh = new THREE.Mesh(geometry,material);
scene.add(mesh);

//Debug UI
gui.add(mesh.position, 'y',-3,3,0.01)
gui.add(mesh.position, 'x',-3,3,0.01)
gui.add(mesh.position, 'z')
    .min(-3)
    .max(3)
    .step(0.01)
    .name('elevation')

gui.add(mesh, 'visible')  
// gui.add(material, 'wireframe')  
gui.add(mesh.material, 'wireframe')
gui.addColor(parameter, 'color')
    .onChange(() => {
        material.color.set(parameter.color)
    })
gui.add(parameter, 'spin')    

//Sizes
const sizes = {
    width: 800,
    height: 600
}

//Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

//Renderer
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

//Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping=true

const tick=() =>{

    //Update
    controls.update()       

    //Render
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)      

}

tick()