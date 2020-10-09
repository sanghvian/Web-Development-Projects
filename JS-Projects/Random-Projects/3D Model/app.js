let container;
let renderer;
let scene;
let camera;
let object;
const mainCont = document.querySelector('.container');

window.addEventListener('resize',onWindowResize);
function onWindowResize() {
  camera.aspect = mainCont.clientWidth/mainCont.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(mainCont.clientWidth,mainCont.clientHeight);}

container = document.querySelector('.scene');
(function init(){
  scene = new THREE.Scene();
  const fov =  35;
  const aspect = container.clientWidth/container.clientHeight;
  const near = 0.1;
  const far = 1500;
  camera = new THREE.PerspectiveCamera(fov,aspect,near,far)
  camera.position.set(-0.05,0.25,6);
  
  let loader = new THREE.GLTFLoader();
  loader.load(`./datsun/scene.gltf`, function(gltf){
    scene.add(gltf.scene);
    console.log(gltf);
    renderer.render(scene,camera);
    object = gltf.scene.children[0];
    object.rotation.y =-0.05;
    object.rotation.z =-0.65;
    animate();
  });
  
  renderer = new THREE.WebGLRenderer({antialias:true, alpha:true});
  renderer.setSize(container.clientWidth,container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  container.appendChild(renderer.domElement);
  
  const ambient = new THREE.AmbientLight(0x404040,5)
  scene.add(ambient);
  
  const light1 = new THREE.DirectionalLight(0xffffff,50);
  light1.position.set(-1,3,1);
  scene.add(light1);
  
  const light2 = new THREE.DirectionalLight(0xffffff,50);
  light2.position.set(1,4,3);
  scene.add(light2);
  
  //     var spotLight = new THREE.SpotLight( 0xffffff );
  //     spotLight.position.set( 1, 1, 1 );
  
  //     spotLight.castShadow = true;
  
  //     spotLight.shadow.mapSize.width = 1024;
  //     spotLight.shadow.mapSize.height = 1024;
  
  //     spotLight.shadow.camera.near = 500;
  //     spotLight.shadow.camera.far = 4000;
  //     spotLight.shadow.camera.fov = 30;
  
  //     scene.add( spotLight );
})();
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene,camera);
  object.rotation.z += 0.007;
}

////// THE AMAZING OOP APPROACH ///////

// const containers = document.querySelectorAll('.scene');
// const sources = [
  //   './datsun/scene.gltf',
  //   './army/scene.gltf',
  //   './ship/scene.gltf',
  //   './bot/model.gltf'
  // ];
  // class threeDims{
    //   constructor(index,yDist,zDist){
      //     this.index = index;
      //     this.source = sources[this.index];
      //     this.zDist = zDist;
      //     this.yDist = yDist;
      //   }
      //   init(){
        //       console.log(this.index,this.source);
        //       container = containers[this.index];
        //       scene = new THREE.Scene();
        //       const fov =  35;
        //       const aspect = container.clientWidth/container.clientHeight;
        //       const near = 0.1;
        //       const far = 1500;
        //       camera = new THREE.PerspectiveCamera(fov,aspect,near,far)
        //       camera.position.set(-0.05,this.yDist,this.zDist);
        
        //       let loader = new THREE.GLTFLoader();
        //       loader.load(`${this.source}`, function(gltf){
        //           scene.add(gltf.scene);
        //           console.log(gltf);
        //           renderer.render(scene,camera);
        //           object = gltf.scene.children[0];
        //           object.rotation.y =-0.05;
        //           object.rotation.z =-0.65;
        //           animate();
        //       });
        
        //       renderer = new THREE.WebGLRenderer({antialias:true, alpha:true});
        //       renderer.setSize(container.clientWidth,container.clientHeight);
        //       renderer.setPixelRatio(window.devicePixelRatio);
        //       container.appendChild(renderer.domElement);
        
        //       const ambient = new THREE.AmbientLight(0x404040,5)
        //       scene.add(ambient);
        
        //       const light1 = new THREE.DirectionalLight(0xffffff,50);
        //       light1.position.set(-1,3,1);
        //       scene.add(light1);
        
        //       const light2 = new THREE.DirectionalLight(0xffffff,50);
        //       light2.position.set(1,4,3);
        //       scene.add(light2);
        
        //   //     var spotLight = new THREE.SpotLight( 0xffffff );
        //   //     spotLight.position.set( 1, 1, 1 );
        
        //   //     spotLight.castShadow = true;
        
        //   //     spotLight.shadow.mapSize.width = 1024;
        //   //     spotLight.shadow.mapSize.height = 1024;
        
        //   //     spotLight.shadow.camera.near = 500;
        //   //     spotLight.shadow.camera.far = 4000;
        //   //     spotLight.shadow.camera.fov = 30;
        
        //   //     scene.add( spotLight );
        //   };        
// }
          
// function animate() {
  //   requestAnimationFrame(animate);
  //   renderer.render(scene,camera);
  //   object.rotation.z += 0.007;
  // }
  // const datsun = new threeDims(0,0.25,6);
  // datsun.init();
window.addEventListener('scroll',()=>{
let value = window.scrollY;
let calci = value*1.3 -800;
console.log(calci);
  document.querySelector('.left').style.left =`${calci}px`;
  document.querySelector('.right').style.right =`${calci-400}px`;
});