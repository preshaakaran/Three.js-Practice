import './style/main.css'
import * as THREE from 'three'

import imageSource1 from './textures/color.jpg'
import imageSource2 from './textures/ambientOcclusion.jpg'
import imageSource3 from './textures/height.jpg'
const imageSource4 = '/alpha.jpg'
// console.log(imageSource1)


//1.Native Javascript
/* const image = new Image()
// image.onload=() =>{
//     const textures = new THREE.Texture(image)
//     //Object code
//     const geometry = new THREE.BoxGeometry(1,1,1);
//     const material = new THREE.MeshBasicMaterial({map: textures});
//     const mesh = new THREE.Mesh(geometry,material);
//     scene.add(mesh);
// }

const texture = new THREE.Texture(image)
image.addEventListener('load',() => {
    texture.needsUpdate=true
})
image.src=imageSource1 */

//2.TextureLoader
/* const textureLoader = new THREE.TextureLoader()
const texture = textureLoader.load(imageSource1) */

//3.LoadingManager
const loadingmanager = new THREE.LoadingManager()
loadingmanager.onStart = () => {
    console.log('started')
}
loadingmanager.onLoad = () => {
    console.log('loaded')
}
loadingmanager.onProgress = () => {
    console.log('progress')
}
loadingmanager.onError = () => {
    console.log('error')
}

const textureLoader = new THREE.TextureLoader(loadingmanager)
const colortexture = textureLoader.load(imageSource1)
const ambientOcclusiontexture = textureLoader.load(imageSource2)
const heighttexture = textureLoader.load(imageSource3)
const alphatexture = textureLoader.load(imageSource4)




//Scene
const scene = new THREE.Scene();

//Red cube
const geometry = new THREE.BoxGeometry(1,1,1);
const material = new THREE.MeshBasicMaterial({map: colortexture});
const mesh = new THREE.Mesh(geometry,material);
scene.add(mesh);

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

const loop = () =>
{

    mesh.rotation.y += 0.01
    mesh.rotation.z += 0.01
    mesh.rotation.x += 0.01
    // Render
    renderer.render(scene, camera)

    // Keep looping
    window.requestAnimationFrame(loop)
}
loop()