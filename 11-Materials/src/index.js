import './style/main.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
//Scene
const scene = new THREE.Scene();

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

//1.Mesh Basic Material
/* const material = new THREE.MeshBasicMaterial();
material.map = doorColorTexture
material.color=new THREE.Color('#ff0000')
// material.color=new THREE.Color(0xff0000)
// material.color=new THREE.Color('#f00')
// material.color=new THREE.Color('red')
// material.color=new THREE.Color('rgb(255,0,0)')

// material.wireframe=true
material.transparent=true
material.opacity=0.5
material.alphaMap=doorAlphaTexture
material.side=THREE.DoubleSide */


//2.Mesh Normal Material
/* const material = new THREE.MeshNormalMaterial();
material.flatShading=true */

//3.Mesh Matcap Material
/* const material = new THREE.MeshMatcapMaterial();
material.matcap=matcapTexture */

//4.Mesh Depth Material
const material = new THREE.MeshDepthMaterial();
/* material.depthPacking=THREE.RGBADepthPacking
material.displacementScale=0.05
material.alphaMap=doorAlphaTexture
material.alphaTest=0.5 */



const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 32),
    material
)
sphere.position.x=-1.5

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1, 32, 32),
    material
)

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 32, 64),
    material
)
torus.position.x=1.5
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
