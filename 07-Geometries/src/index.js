import './style/main.css'
import * as THREE from 'three'

/**
 * Sizes
 */
const sizes = {}
sizes.width = window.innerWidth
sizes.height = window.innerHeight

window.addEventListener('resize', () =>
{
    // Save sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
})

/**
 * Environnements
 */
// Scene
const scene = new THREE.Scene()

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// Test
// const geometry = new THREE.BoxBufferGeometry(1,1,1,4,4,4);

// const positionArray = new Float32Array(9)
// //First vertices
// positionArray[0] = 0
// positionArray[1] = 0
// positionArray[2] = 0
// //Second vertices
// positionArray[3] = 0
// positionArray[4] = 1
// positionArray[5] = 0
// //Third vertices
// positionArray[6] = 1
// positionArray[7] = 0
// positionArray[8] = 0

// const positionArray = new Float32Array([
//     0,0,0, 
//     0,1,0, 
//     1,0,0
// ])

const count=500
const positionArray = new Float32Array(count * 3 * 3)
for (let i = 0; i < count*3*3; i++){
    positionArray[i] = (Math.random() - 0.5) * 2
}
const positionAttribute = new THREE.BufferAttribute(positionArray, 3)
const geometry = new THREE.BufferGeometry()
geometry.setAttribute('position', positionAttribute)

const material = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true});
const cube = new THREE.Mesh(geometry,material);
scene.add(cube)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('.webgl')
})
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(sizes.width, sizes.height)

/**
 * Loop
 */
const loop = () =>
{
    // Update
    cube.rotation.y += 0.01
    cube.rotation.z += 0.01

    // Render
    renderer.render(scene, camera)

    // Keep looping
    window.requestAnimationFrame(loop)
}
loop()