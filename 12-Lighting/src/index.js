import './style/main.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
//Scene
const scene = new THREE.Scene();
const gui = new dat.GUI()

const textureLoader = new THREE.TextureLoader()
const doorColorTexture = textureLoader.load('/textures/door/color.jpg');
const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg');
const doorAmbientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg');
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg');
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg');
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg');
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg');

const matcapTexture = textureLoader.load('/textures/matcaps/6.png');
const gradientsTexture = textureLoader.load('/textures/gradients/5.jpg');

//Red cube



//5.Mesh Lambert Material
/* const material = new THREE.MeshLambertMaterial({color:0xff0000});
// material.map = doorColorTexture */


//6.Mesh Phong Material
/* const material = new THREE.MeshPhongMaterial({
    color:0xff0000,
    specular: 0x1188ff,
    shininess: 100
}) */

//7.Mesh Toon Material
/* const material = new THREE.MeshToonMaterial({
    gradientMap: gradientsTexture
}) */


//8.Mesh Standard Material
/* const material = new THREE.MeshStandardMaterial({
    map: doorColorTexture,
    aoMap: doorAmbientOcclusionTexture,
    aoMapIntensity: 1,
    displacementMap: doorHeightTexture,
    displacementScale: 0.1,
    metalnessMap: doorMetalnessTexture,
    roughnessMap: doorRoughnessTexture,
    normalMap: doorNormalTexture,
    normalScale: new THREE.Vector2(0.5, 0.5),
})

material.roughness = 1
material.metalness = 0
// material.normalScale.set(0.5, 0.5)
material.transparent=true
material.alphaMap=doorAlphaTexture

gui.add(material, 'metalness').min(0).max(1).step(0.001)
gui.add(material, 'roughness').min(0).max(1).step(0.001)
gui.add(material, 'aoMapIntensity').min(0).max(10).step(0.001) */


//Environment Map
const material = new THREE.MeshStandardMaterial({
    metalness: 0.7,
    roughness: 0.2
})

gui.add(material, 'metalness').min(0).max(1).step(0.001)
gui.add(material, 'roughness').min(0).max(1).step(0.001)

const cubeTextureLoader = new THREE.CubeTextureLoader()
const environmentMapTexture = cubeTextureLoader.load([
    '/textures/environmentMaps/0/px.jpg',
    '/textures/environmentMaps/0/nx.jpg',
    '/textures/environmentMaps/0/py.jpg',
    '/textures/environmentMaps/0/ny.jpg',
    '/textures/environmentMaps/0/pz.jpg',
    '/textures/environmentMaps/0/nz.jpg'
])

material.envMap = environmentMapTexture

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 0.5);
pointLight.position.set(2, 3, 4);
scene.add(pointLight);




const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 64, 64),
    material
)
sphere.position.x=-1.5


// sphere.geometry.setAttribute('uv2', new THREE.BufferAttribute(sphere.geometry.attributes.uv.array,2))

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1, 100, 100),
    material
)
// plane.geometry.setAttribute('uv2', new THREE.BufferAttribute(plane.geometry.attributes.uv.array,2))

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 64, 128),
    material
)
torus.position.x=1.5
// torus.geometry.setAttribute('uv2', new THREE.BufferAttribute(torus.geometry.attributes.uv.array, 2))

scene.add(sphere, plane, torus);


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

//Controls
const controls = new OrbitControls(camera, canvas)
// controls.target.y=1
// controls.update()
controls.enableDamping=true

const clock = new THREE.Clock()

const tick=() =>{
    const elapsedTime=clock.getElapsedTime()
    //Update
    controls.update()

    sphere.rotation.y=0.1*elapsedTime
    torus.rotation.y=0.1*elapsedTime
    plane.rotation.y=0.1*elapsedTime

    sphere.rotation.x=0.15*elapsedTime
    torus.rotation.x=0.15*elapsedTime
    plane.rotation.x=0.15*elapsedTime

    //Render
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)

}
tick()
