import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import './style.css'

//Textures
const textureLoader = new THREE.TextureLoader();
const bakedShadow = textureLoader.load('/textures/bakedShadow.jpg');
const simpleShadow = textureLoader.load('/textures/simpleShadow.jpg');


//Scene
const scene = new THREE.Scene();

const material = new THREE.MeshStandardMaterial()

// const plane = new THREE.Mesh(
//     new THREE.PlaneGeometry(1, 1, 100, 100),
//     new THREE.MeshBasicMaterial({ map: bakedShadow })
// )

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1, 100, 100),
    material
)
plane.position.y=-0.4
plane.rotation.x=-Math.PI * 0.5
plane.scale.set(5, 5, 5)

const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 64, 64),
    material
)


const sphereShadow = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1, 100, 100),
    new THREE.MeshBasicMaterial({
        color: 0x000000,
        transparent: true,
        alphaMap: simpleShadow
    })
)
sphereShadow.rotation.x = -Math.PI * 0.5
sphereShadow.position.y = plane.position.y + 0.01





scene.add(sphere,plane,sphereShadow);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xfffffc, 0.3);
directionalLight.position.set(2, 2, 2);
scene.add(directionalLight);

const spotLight = new THREE.SpotLight(0xffffff, 0.3, 10, Math.PI * 0.3);
spotLight.position.set(0, 2, 2);
scene.add(spotLight);
scene.add(spotLight.target);



const pointLight = new THREE.PointLight(0xffffff, 0.3)
pointLight.position.set(-1, 1, 0)
scene.add(pointLight)







//Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
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
renderer.shadowMap.enabled = false

//Shadow Map Algorithm
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
directionalLight.castShadow = true
sphere.castShadow = true
plane.receiveShadow = true

//Render Size
directionalLight.shadow.mapSize.set(1024, 1024)
const directionalLightCameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera)
scene.add(directionalLightCameraHelper)

//Near and Far
directionalLight.shadow.camera.near = 1
directionalLight.shadow.camera.far = 6


//Amplitude
directionalLight.shadow.camera.left = -2
directionalLight.shadow.camera.top = 2
directionalLight.shadow.camera.right = 2
directionalLight.shadow.camera.bottom = -2

directionalLightCameraHelper.visible = false


//Blur
directionalLight.shadow.radius = 10

//Spot Light
spotLight.shadow.mapSize.set(1024, 1024)
const spotLightCameraHelper = new THREE.CameraHelper(spotLight.shadow.camera)
scene.add(spotLightCameraHelper)
spotLight.castShadow = true
spotLight.shadow.camera.fov = 30
spotLight.shadow.camera.near = 1
spotLight.shadow.camera.far = 6
spotLightCameraHelper.visible = false


//Point Light
pointLight.castShadow = true
const pointLightCameraHelper = new THREE.CameraHelper(pointLight.shadow.camera)
scene.add(pointLightCameraHelper)
pointLight.shadow.mapSize.set(1024, 1024)
pointLight.shadow.camera.near = 0.1
pointLight.shadow.camera.far = 5
pointLightCameraHelper.visible = false

//Controls
const controls = new OrbitControls(camera, canvas)
// controls.target.y=1
// controls.update()
controls.enableDamping=true

const clock = new THREE.Clock()

const tick=() =>{
    const elapsedTime = clock.getElapsedTime()

    //Update sphere
    sphere.position.x = Math.cos(elapsedTime) * 1.5
    sphere.position.z = Math.sin(elapsedTime) * 1.5
    sphere.position.y = Math.abs( Math.sin(elapsedTime * 3));

    // Update simple shadow
    sphereShadow.position.x = sphere.position.x;
    sphereShadow.position.z = sphere.position.z;
    sphereShadow.material.opacity = (1 - sphere.position.y) * 0.5


    //Update
    controls.update()

    //Render
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)

}
tick()
