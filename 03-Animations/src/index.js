import './style/main.css'
import * as THREE from 'three'
import gsap from 'gsap'

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


//Animations


//Method 1
// let time = Date.now()
// const tick=() =>{
//     console.log('tick')
//     //Time
//     const currentTime = Date.now()
//     const deltaTime = currentTime - time
//     time = currentTime
//     console.log(deltaTime)
//     //Update
//     mesh.rotation.y += 0.001*deltaTime
//     //Render
//     renderer.render(scene, camera)
//     window.requestAnimationFrame(tick)
// }
// tick()



//Method 2(Clock)
// const clock = new THREE.Clock()

 

// const tick=() =>{
//     const elapsedTime = clock.getElapsedTime()
    //Update
    // mesh.rotation.y = elapsedTime*Math.PI*2 //1 revolution per second
    // mesh.position.x = Math.cos(elapsedTime)
    // mesh.position.y = Math.sin(elapsedTime)

    // camera.position.x = Math.cos(elapsedTime)
    // camera.position.y = Math.sin(elapsedTime)
    // camera.lookAt(mesh.position)

    //Render
//     renderer.render(scene, camera)
//     window.requestAnimationFrame(tick)
// }
// tick()

//Method 3(GSAP)
gsap.to(mesh.position, {duration: 1, delay: 1, x: 2})

const tick=() =>{
    

    //Render
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}
tick()


