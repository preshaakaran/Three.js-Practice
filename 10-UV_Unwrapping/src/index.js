import './style/main.css'
import * as THREE from 'three'
import imageSource1 from './textures/color.jpg'

const loadingmanager = new THREE.LoadingManager()
const textureLoader = new THREE.TextureLoader(loadingmanager)
const colortexture = textureLoader.load(imageSource1)
// colortexture.repeat.x = 2
// colortexture.repeat.y = 3
// colortexture.wrapS = THREE.RepeatWrapping
// colortexture.wrapT = THREE.MirroredRepeatWrapping

// colortexture.offset.x = 0.5
// colortexture.offset.y = 0.5

colortexture.rotation = Math.PI * 0.25
colortexture.center.x = 0.5
colortexture.center.y = 0.5

//Img checkerboad 1024x1024
// colorTexture.generateMipmaps = false;
// colorTexture.minFilter = THREE.NearestFilter;

//Img checkerboad 8X8
//Img minecraft
// colortexture.magFilter = THREE.NearestFilter


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
const geometry = new THREE.BoxGeometry(1,1,1);
const material = new THREE.MeshBasicMaterial({map: colortexture});
const cube = new THREE.Mesh(geometry,material);
scene.add(cube);

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