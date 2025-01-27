import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import './style.css'
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js';

//Scene
const scene = new THREE.Scene();

const material = new THREE.MeshStandardMaterial()

const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 64, 64),
    material
)
sphere.position.x=-1.5


const cube= new THREE.Mesh(
    new THREE.BoxGeometry(0.75, 0.75, 0.75),
    material
)

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 64, 128),
    material
)
torus.position.x=1.5

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1, 100, 100),
    material
)
plane.position.y=-0.5
plane.rotation.x=-Math.PI * 0.5
plane.scale.set(5, 5, 5)


scene.add(sphere, cube, torus, plane);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xfffffc, 0.5);
directionalLight.position.set(1, 0.25, 0);
scene.add(directionalLight);

const hemisphereLight = new THREE.HemisphereLight(0xff0000, 0x0000ff, 0.3);
scene.add(hemisphereLight);


const pointLight = new THREE.PointLight(0xff9000, 0.5,10,2);
pointLight.position.set(1, -0.5, 1);
scene.add(pointLight);

const rectAreaLight = new THREE.RectAreaLight(0x4e00ff, 2, 1, 1);
rectAreaLight.position.set(-1.5, 0, 1.5);   
rectAreaLight.lookAt(new THREE.Vector3());
scene.add(rectAreaLight);

const spotLight = new THREE.SpotLight(0x78ff00,0.5,10, Math.PI * 0.1,0.25,1);
spotLight.position.set(0, 2, 3);
scene.add(spotLight);

scene.add(spotLight.target)
spotLight.target.position.x=-0.75


//Helpers
const hemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphereLight,0.2)
scene.add(hemisphereLightHelper)

const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight,0.2)
scene.add(directionalLightHelper)

const pointLightHelper = new THREE.PointLightHelper(pointLight,0.2)
scene.add(pointLightHelper)

const spotLightHelper = new THREE.SpotLightHelper(spotLight)    
scene.add(spotLightHelper)
window.requestAnimationFrame(()=>{
    spotLightHelper.update()
})

const rectAreaLightHelper = new RectAreaLightHelper(rectAreaLight)
scene.add(rectAreaLightHelper)

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

//Controls
const controls = new OrbitControls(camera, canvas)
// controls.target.y=1
// controls.update()
controls.enableDamping=true



const tick=() =>{

    sphere.rotation.x += 0.01;
    sphere.rotation.y += 0.01;
    sphere.rotation.z += 0.01;

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    cube.rotation.z += 0.01;

    torus.rotation.x += 0.01;
    torus.rotation.y += 0.01;
    torus.rotation.z += 0.01;
    
    //Update
    controls.update()

    //Render
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)

}
tick()
