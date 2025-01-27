import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { FontLoader, TextGeometry } from 'three/examples/jsm/Addons.js'


//Scene
const scene = new THREE.Scene();

// const axesHelper = new THREE.AxesHelper()
// scene.add(axesHelper)

const textureLoader = new THREE.TextureLoader()
const matcapTexture = textureLoader.load('/textures/matcaps/5.png');

const fontLoader = new FontLoader()
fontLoader.load(
    '/fonts/helvetiker_regular.typeface.json',
    (font) => {
        const textGeometry = new TextGeometry(
            'Three.js Text',
            {
                font: font,
                size: 0.5,
                height: 0.2,
                curveSegments: 12,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 5
            }
        )
        
        const material = new THREE.MeshMatcapMaterial({
            matcap: matcapTexture
        })
        // material.wireframe=true
        const text = new THREE.Mesh(textGeometry, material)
        textGeometry.center()
        scene.add(text)

        // textGeometry.computeBoundingBox()
        // console.log(textGeometry.boundingBox)
        // textGeometry.translate(
        //     -(textGeometry.boundingBox.max.x - 0.02) * 0.5,
        //     -(textGeometry.boundingBox.max.y - 0.02) * 0.5,
        //     -(textGeometry.boundingBox.max.y - 0.03) * 0.5
        // )

        console.time('donut')
        const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45)
        // const donutMaterial = new THREE.MeshMatcapMaterial({
        //     matcap:matcapTexture
        // })
        
        for(let i=0;i<100;i++){
            const donut = new THREE.Mesh(donutGeometry, material)
            donut.position.x = (Math.random() - 0.5) * 10
            donut.position.y = (Math.random() - 0.5) * 10
            donut.position.z = (Math.random() - 0.5) * 10

            donut.rotation.x = Math.random()* Math.PI 
            donut.rotation.y = Math.random()* Math.PI 

            const scale=Math.random()
            donut.scale.set(scale, scale, scale)

            scene.add(donut);

        }
        console.timeEnd('donut')

    }    
)





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



const tick=() =>{
    
    //Update
    controls.update()

    //Render
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)

}
tick()
