import { _VS as ascii_VS, _FS as ascii_FS } from "./shaders/ascii.shader";
import { _VS as glitch_VS, _FS as glitch_FS } from "./shaders/glitch.shader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as THREE from "three";
import imagesloaded from "imagesloaded";
import noise_texture from "./shaders/noise.png";
import { _VS as postfx_VS , _FS as postfx_FS } from './shaders/postprocessing.shader';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { SMAAPass } from 'three/examples/jsm/postprocessing/SMAAPass.js';


export default class gfx{

    device_accelro = {
        x: 1,
        y: 1,
        z: 1,
    };

    deviceMotions;
    canvas; //target element webgl will draw things to
    scene;  // this is the primary scene 
    camera; // this is a primary perspective camera
    clock; // THREEjs clock obj
    renderer;
    width; // width of the render dom
    height; // height of the rener dom
    composer;
    renderPass;
    customPass;
    images; // this is the lists of images will apply fx to
    img_data; // this store the dimensions of the images , actual 3d obj mesh, and a img itself
    tLoader; // this is our universal texture loader
    scrollY; // this store current vertical scroll position 

    mouse; // this store normalized coordinate xy of our cursor 
    raycaster; // this is the primary raycast that would use to detect intersection of 3d objects 
    edgeMesh;
    eventHandlerBinds;

    constructor(configs){
        this.scrollY = 0;
        this.images = configs.img; // this is the list of images that my gfx will apply to
        this.canvas = configs.dom; // this is the dom element that webgl will render things to
        
        imagesloaded(this.images , ()=>{
            scrollTo(0, ()=>{
                this.init();
                this.constructEnv();
                this.construct3DImages();
                this.addEventListeners();    
                this.addControls();  
                this.postprocessing();
                this.tick();
            })
        });
        
        
    }
    
    
    // this function load shader dynamically of two choice (ascii and glitch)
    getShader(name,type){
        if( name === "ascii" ){
            if (type === "VS"){
                return ascii_VS;
            }
            if(type === "FS"){
                return ascii_FS;
            }
        }
        
        if( name === "glitch" ){
            if (type === "VS"){
                return glitch_VS;
            }
            if(type === "FS"){
                return glitch_FS;
            }
        }
    }
    
    //this initialize our class's variables
    init(){
        
        this.mouse = { x: 0, y: 0}
        this.width =  this.canvas.offsetWidth;
        this.height = this.canvas.offsetHeight;
        this.scene = new THREE.Scene();

        const far = 2000;
        const dist = 500; // this is the distance between camera and vector3(0,0,0);
        const fov = 2 * Math.atan((this.height/2)/dist) * (180/Math.PI);
        this.camera = new THREE.PerspectiveCamera(fov, this.width/this.height, 0.1, far);
        this.camera.position.z = dist;
        this.renderer = new THREE.WebGLRenderer(
            { antialias:true }
        );
        this.renderer.setSize(this.width, this.height);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
        // this.renderer.shadowMap.enabled = true;
        // this.renderer.shadowMap.type = THREE.PCFSoftShadowMap; 

        this.canvas.appendChild(this.renderer.domElement);

        this.tLoader = new THREE.TextureLoader();
        this.clock = new THREE.Clock();
        this.raycaster = new THREE.Raycaster();
    }
    //this construct 3D plane that would act as our interactive images
    construct3DImages(){
        
        // for every image this'll create a 3D mesh replica of every images in the list
        // and save the all the data 
        this.img_data = this.images.map(img => {
            const bounds = img.getBoundingClientRect();


            const mesh = new THREE.Mesh(
                new THREE.PlaneBufferGeometry(bounds.width, bounds.height, 25, 25),
                new THREE.RawShaderMaterial(
                    {   
                        side: THREE.FrontSide,
                        transparent:true,
                        vertexShader : this.getShader(img.dataset.shader , "VS"),
                        fragmentShader: this.getShader(img.dataset.shader , "FS"),
                        // wireframe: true,
                        uniforms: {
                            baseColor : {value : this.tLoader.load(img.src)},
                            noiseMap : { value : this.tLoader.load(noise_texture)},
                            time : {value: 0.0},
                            h_pos : {value: new THREE.Vector2(0.5,0.5)},
                            h_state : { value : 0.0 },
                            scroll_state : { value : 0.0},
                            glitch_state : { value :0.0}
                        }
                    }
                )
            )
            // mesh.castShadow = true;
            this.scene.add(mesh);



            img.addEventListener('mouseenter', (e)=>{
                mesh.material.uniforms.h_state.value = true;
            })
            img.addEventListener('mouseout', (e)=>{
                mesh.material.uniforms.h_state.value = false;
            })

            return {
                img: img,
                mesh: mesh,
                top: bounds.top,
                left: bounds.left,
                width: bounds.width,
                height: bounds.height,
            }
        })

    }
    
    //this deconstruct 3D images
    deconstruct3DImages(){
        this.img_data.map(img => {
            img.mesh.geometry.dispose();
            img.mesh.material.dispose();
            this.scene.remove(img.mesh);
        })
    }
    
    //this update the position of 3D images 
    updateImgPos(){
        this.updateDimensions();
        this.img_data.map(img => {
            img.mesh.position.x = img.left - this.width/2 + img.width/2;
            img.mesh.position.y = this.scrollY - (img.top - this.height/2 + img.height/2);
            img.mesh.material.uniforms.time.value = this.clock.getElapsedTime();
        })
        
    }
    
    constructEnv(){
        this.wall = new THREE.Mesh(
            new THREE.PlaneBufferGeometry(this.width*1.2, this.height*1.2, 10,10),
            new THREE.MeshStandardMaterial({
                color:0xffffff,
            }),
        )
        this.wall.position.z = - 300;
        this.wall.receiveShadow = true;
        this.scene.add(this.wall);
    }
    deconstructEnv(){
        this.wall.geometry.dispose();
        this.wall.material.dispose();
        this.scene.remove(this.wall);
    }

    // this add necessary event listeners
    addEventListeners(){
        this.eventHandlerBinds = {
            scroller : this.scrollHandler.bind(this),
            resizer : this.resizeHandler.bind(this),
            mouseMover : this.mouseMoveHandler.bind(this)
        }
        window.addEventListener('scroll', this.eventHandlerBinds.scroller);
        window.addEventListener("resize", this.eventHandlerBinds.resizer);
        window.addEventListener("mousemove", this.eventHandlerBinds.mouseMover);
    }
    removeEventListener(){
        window.removeEventListener('scroll', this.eventHandlerBinds.scroller);
        window.removeEventListener("resize", this.eventHandlerBinds.resizer);
        window.removeEventListener("mousemove", this.eventHandlerBinds.mouseMover);
    }
    // this function recalculate the projection matrix of camera and recale 3D world after resize
    resizeHandler(e){
        
        const resize_factor = this.width/this.height - this.canvas.offsetWidth/this.canvas.offsetHeight;


        if(resize_factor !== 0){
            scrollTo(0, ()=>{
                this.updateDimensions();
                this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
                this.renderer.setSize(this.width, this.height);
                this.composer.setPixelRatio(Math.min(window.devicePixelRatio,2));
                this.composer.setSize(this.width, this.height);
                this.camera.aspect = this.width/this.height;
                const fov = 2 * Math.atan((this.height/2)/this.camera.position.distanceTo(new THREE.Vector3(0,0,0))) * (180/Math.PI);
                this.camera.fov = fov;
                this.camera.updateProjectionMatrix();
                this.deconstruct3DImages();
                this.construct3DImages();
                this.render();
            });
        }
    }


    // this update the current position of the vertical scroll 
    // and also detect scrolling or not to activate glitch shader effect
    scrollHandler(e){
        this.scrollY = window.scrollY;
        this.img_data.map(img =>{
            
            img.mesh.material.uniforms.scroll_state.value = true;
        })
       


        // Set a timeout to run after scrolling ends
        setTimeout(()=>{        
            this.img_data.map(img =>{
                img.mesh.material.uniforms.scroll_state.value = false;
            })
        }, 30);
    }

    //this function update normalize mouse xy coordinates
    // and also used to detect intersection of mouse to certain 3D objects
    mouseMoveHandler(e){
        this.mouse.x = (e.clientX / this.width) * 2 - 1;
        this.mouse.y = - (e.clientY / this.height) * 2 + 1;

        this.raycaster.setFromCamera(this.mouse, this.camera);


        
        const intersects = this.raycaster.intersectObjects([...this.img_data.map(o=>{return o.mesh})]);

        if (intersects.length > 0){
            let obj = intersects[0].object;
            obj.material.uniforms.h_pos.value = intersects[0].uv;
       }
    }

    postprocessing(){
        this.composer = new EffectComposer(this.renderer);
        this.composer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderPass = new RenderPass(this.scene, this.camera);
        this.composer.addPass(this.renderPass);


        this.myEffect = {
            uniforms: {
                "tDiffuse": { value: null },
                "scrollSpeed": { value: 1.0 },
                "time": { value: null },
            },
            vertexShader: postfx_VS,
            fragmentShader: postfx_FS
        }

        this.customPass = new ShaderPass(this.myEffect);
        this.customPass.renderToScreen = true;
        this.composer.addPass(this.customPass);


        this.smaapass = new SMAAPass( this.width * this.renderer.getPixelRatio(), this.height * this.renderer.getPixelRatio() );
        this.composer.addPass( this.smaapass );
    }
    
    // this is the render function for each frame
    render(){
        this.img_data.forEach((img, i) =>{


            img.mesh.rotation.y = this.mouse.x * 0.15 * (this.device_accelro.y );
            img.mesh.rotation.x = - this.mouse.y * 0.15 * (this.device_accelro.x );


            if(i === 0){
                img.mesh.rotation.z = - this.scrollY * 0.001;
                img.mesh.position.z = this.scrollY * 0.5;
            }

            if(img.mesh.material.uniforms.scroll_state.value || img.mesh.material.uniforms.h_state.value){
                img.mesh.material.uniforms.glitch_state.value = true;
            }
            if(!img.mesh.material.uniforms.scroll_state.value && !img.mesh.material.uniforms.h_state.value){
                img.mesh.material.uniforms.glitch_state.value = false;
            }
        })

        this.updateImgPos();
        this.customPass.uniforms.time.value = this.clock.getElapsedTime();
        this.composer.render();
        // this.renderer.render(this.scene, this.camera);
    }
    
    //this update dimension of rendering dom
    updateDimensions(){
        this.width =  this.canvas.offsetWidth;
        this.height = this.canvas.offsetHeight;
    }
    
    addControls(){
        this.controls = new OrbitControls( this.camera, this.renderer.domElement );
        this.controls.update();
    }
    experimental(){
        
        
        const geometry = new THREE.SphereBufferGeometry( 300 );
        const edges = new THREE.EdgesGeometry( geometry );
        this.edgeMesh = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0xffffff } ) );
        this.scene.add( this.edgeMesh );
    }
    
    // this is the animation frame function 
    tick(){
        window.requestAnimationFrame(this.tick.bind(this));
        
        if(this.controls){
            this.controls.update();
        }

        this.render();
    }
    
    destroy(){
        document.body.style.cursor = "auto";
        this.removeEventListener();
        
        for(let child in this.scene.children){
            this.scene.remove(child);
        }
        
        window.cancelAnimationFrame(this.tick.bind(this));
        
    }
}





// this is function act the same way as window.scrollTo() but with callback
// I mostly need this to rescale the 3D world when screen is resized
// this function help me build responsive 3D design
// basically saved my ass
export function scrollTo(offset, callback) {
    let fixedOffset = offset.toFixed();
    const onScroll = function () {
            if (window.pageYOffset.toFixed() > fixedOffset - 10 && window.pageYOffset.toFixed() < fixedOffset + 10 ) {
                // alert("fire");
                window.removeEventListener('scroll', onScroll)
                callback()
            }
        }

    window.addEventListener('scroll', onScroll)
    onScroll()
    window.scrollTo({
        top: offset,
        behavior: 'smooth'
    })
}