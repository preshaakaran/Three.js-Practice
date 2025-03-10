import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import './style.css'

//Textures
const textureLoader = new THREE.TextureLoader();
const doorColorTexture = textureLoader.load('/textures/door/color.jpg');
const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg');
const doorAmbientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg');
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg');
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg');
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg');
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg');

const bricksColorTexture = textureLoader.load('/textures/bricks/color.jpg');
const bricksAmbientOcclusionTexture = textureLoader.load('/textures/bricks/ambientOcclusion.jpg');
const bricksNormalTexture = textureLoader.load('/textures/bricks/normal.jpg');
const bricksRoughnessTexture = textureLoader.load('/textures/bricks/roughness.jpg');

const grassColorTexture = textureLoader.load('/textures/grass/color.jpg');
const grassAmbientOcclusionTexture = textureLoader.load('/textures/grass/ambientOcclusion.jpg');
const grassNormalTexture = textureLoader.load('/textures/grass/normal.jpg');
const grassRoughnessTexture = textureLoader.load('/textures/grass/roughness.jpg');
grassColorTexture.repeat.set(8,8)
grassAmbientOcclusionTexture.repeat.set(8,8)
grassNormalTexture.repeat.set(8,8)
grassRoughnessTexture.repeat.set(8,8)

grassColorTexture.wrapS = THREE.RepeatWrapping
grassAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping
grassNormalTexture.wrapS = THREE.RepeatWrapping
grassRoughnessTexture.wrapS = THREE.RepeatWrapping

grassColorTexture.wrapT = THREE.RepeatWrapping
grassAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping
grassNormalTexture.wrapT = THREE.RepeatWrapping
grassRoughnessTexture.wrapT = THREE.RepeatWrapping

const windowColorTexture = textureLoader.load('/textures/window/window.jpg');
const particlesTexture = textureLoader.load('/textures/particles/4.png');





//Scene
const scene = new THREE.Scene();

const fog = new THREE.Fog('#262837', 1, 15)
scene.fog = fog

//House
const house = new THREE.Group()
scene.add(house)

const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20,20),
    new THREE.MeshStandardMaterial({
        map: grassColorTexture,
        aoMap: grassAmbientOcclusionTexture,
        normalMap: grassNormalTexture,
        roughnessMap: grassRoughnessTexture
    })
)
floor.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(floor.geometry.attributes.uv.array,2))
floor.rotation.x = -Math.PI * 0.5
floor.position.y = 0
scene.add(floor)

const walls = new THREE.Mesh(
    new THREE.BoxGeometry(4,2.5,4),
    new THREE.MeshStandardMaterial({ 
        map:bricksColorTexture,
        aoMap:bricksAmbientOcclusionTexture,
        normalMap:bricksNormalTexture,
        roughnessMap:bricksRoughnessTexture
    })
)
walls.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(walls.geometry.attributes.uv.array, 2))
walls.position.y = 1.25
house.add(walls)

const roof = new THREE.Mesh(
    new THREE.ConeGeometry(3.5,1,4),
    new THREE.MeshStandardMaterial({ color:'#b35f45' })
)
roof.position.y = 2.5 + 0.5
roof.rotation.y = Math.PI * 0.25
house.add(roof)

const door = new THREE.Mesh(
    new THREE.PlaneGeometry(2.2, 2.2, 100, 100),
    new THREE.MeshStandardMaterial({ 
        map: doorColorTexture,
        transparent: true,
        alphaMap: doorAlphaTexture,
        aoMap: doorAmbientOcclusionTexture,
        displacementMap: doorHeightTexture,
        displacementScale: 0.1,
        normalMap: doorNormalTexture,
        metalnessMap: doorMetalnessTexture,
        roughnessMap: doorRoughnessTexture
    })
)
door.geometry.setAttribute('uv2',new THREE.Float32BufferAttribute(door.geometry.attributes.uv.array,2))
door.position.y = 1
door.position.z = 2 + 0.01
house.add(door)

const windows1 = new THREE.Mesh(
    new THREE.PlaneGeometry(0.8, 0.8, 100, 100),
    new THREE.MeshStandardMaterial({ map: windowColorTexture })
)
windows1.geometry.setAttribute('uv2',new THREE.Float32BufferAttribute(windows1.geometry.attributes.uv.array,2))
windows1.position.y = 1.6
windows1.position.z = 2 + 0.01
windows1.position.x = -1.3
house.add(windows1)
const windows2 = new THREE.Mesh(
    new THREE.PlaneGeometry(0.8, 0.8, 100, 100),
    new THREE.MeshStandardMaterial({ map: windowColorTexture })
)
windows2.geometry.setAttribute('uv2',new THREE.Float32BufferAttribute(windows2.geometry.attributes.uv.array,2))
windows2.position.y = 1.6
windows2.position.z = 2 + 0.01
windows2.position.x = 1.3
house.add(windows2)

const bushGeometry = new THREE.SphereGeometry(1, 16, 16)
const bushMaterial = new THREE.MeshStandardMaterial({ color: '#89c854' })

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial)
bush1.scale.set(0.5,0.5,0.5)
bush1.position.set(0.8, 0.2, 2.2)

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial)
bush2.scale.set(0.25,0.25,0.25)
bush2.position.set(1.4, 0.1, 2.1)

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial)
bush3.scale.set(0.4,0.4,0.4)    
bush3.position.set(-0.8, 0.1, 2.2)

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial)
bush4.scale.set(0.15,0.15,0.15)
bush4.position.set(-1, 0.05, 2.6)

scene.add(bush1, bush2, bush3, bush4)

const graves = new THREE.Group()
scene.add(graves)

const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2);
const graveMaterial = new THREE.MeshStandardMaterial({ color: '#b2b6b1' });

walls.castShadow = true
bush1.castShadow = true
bush2.castShadow = true
bush3.castShadow = true
bush4.castShadow = true

for (let i = 0; i < 30; i++) {
    const angle = Math.random() * Math.PI * 2;
    const radius = 3 + Math.random() * 6;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    const grave = new THREE.Mesh(graveGeometry, graveMaterial);
    grave.position.set(x,0.3,z)
    grave.rotation.y = (Math.random() - 0.5) * 0.4
    grave.rotation.z = (Math.random() - 0.5) * 0.4
    grave.castShadow = true
    graves.add(grave);
}

floor.receiveShadow = true
const ghost1 = new THREE.PointLight('#ff00ff', 2, 3)
scene.add(ghost1)

const ghost2 = new THREE.PointLight('#00ffff', 2, 3)
scene.add(ghost2)

const ghost3 = new THREE.PointLight('ffff00', 2, 3)
scene.add(ghost3)


const ambientLight = new THREE.AmbientLight('#b9d5ff', 0.12);
scene.add(ambientLight);

const moonLight = new THREE.DirectionalLight('#b9d5ff', 0.3);
moonLight.position.set(4, 5, -2);
scene.add(moonLight);

const doorLight = new THREE.PointLight('#ff7d46', 2, 10)
doorLight.position.set(0, 2.2, 2.7)
scene.add(doorLight)

doorLight.castShadow = true
moonLight.castShadow = true
ghost1.castShadow = true
ghost2.castShadow = true
ghost3.castShadow = true


moonLight.shadow.mapSize.set(256, 256)
moonLight.shadow.camera.far = 15
doorLight.shadow.mapSize.set(256, 256)
doorLight.shadow.camera.far = 7
ghost1.shadow.mapSize.set(256, 256)
ghost1.shadow.camera.far = 7
ghost2.shadow.mapSize.set(256, 256)
ghost2.shadow.camera.far = 7
ghost3.shadow.mapSize.set(256, 256)
ghost3.shadow.camera.far = 7

const particlesMaterial = new THREE.PointsMaterial({
    size: 0.09,
    sizeAttenuation: true,
})
const particlesGeometry = new THREE.BufferGeometry()
const count = 500
const positions = new Float32Array(count * 3)
const colors = new Float32Array(count * 3)
for (let i = 0; i < count * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 20
    colors[i] = Math.random()
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
particlesGeometry.setAttribute('color',new THREE.BufferAttribute(colors, 3))
particlesMaterial.vertexColors = true
particlesMaterial.transparent = true
particlesMaterial.alphaMap = particlesTexture
particlesMaterial.depthWrite=true
particlesMaterial.blending = THREE.AdditiveBlending

const particles = new THREE.Points(particlesGeometry, particlesMaterial)
scene.add(particles)


//Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

//Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.x = 4
camera.position.y = 2
camera.position.z = 5
scene.add(camera);


//Renderer
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor('#262837')
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

//Controls
const controls = new OrbitControls(camera, canvas)
// controls.target.y=1
// controls.update()
controls.enableDamping=true

const clock = new THREE.Clock()

const tick=() =>{
    const elapsedTime = clock.getElapsedTime()

    //Update Ghosts
    const ghost1Angle = elapsedTime * 0.5
    ghost1.position.set(Math.cos(ghost1Angle) * 4, Math.sin(elapsedTime*3), Math.sin(ghost1Angle) * 4)

    const ghost2Angle = - elapsedTime * 0.32
    ghost2.position.set(Math.cos(ghost2Angle) * 5, Math.sin(elapsedTime*4) + Math.sin(elapsedTime*2.5), Math.sin(ghost2Angle) * 5)

    const ghost3Angle = - elapsedTime * 0.18
    ghost3.position.set(Math.cos(ghost3Angle) * (7 + Math.sin(elapsedTime*0.32)), Math.sin(elapsedTime*5) + Math.sin(elapsedTime*2), Math.sin(ghost3Angle) * (7 + Math.sin(elapsedTime*0.5)))
    


    //Update
    controls.update()

    //Render
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)

}
tick()
