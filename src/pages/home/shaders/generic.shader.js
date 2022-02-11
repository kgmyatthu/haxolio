
export const _FS = `
    precision mediump float;
    uniform sampler2D baseColor;
    varying vec2 vUv;
    void main(){	
        
        gl_FragColor = texture2D(baseColor,vUv);
    }
`;
    
    

export const _VS = `
    attribute vec3 position; 
    attribute vec2 uv;
    varying vec2 vUv;
    uniform mat4 modelMatrix;
    uniform mat4 viewMatrix;
    uniform mat4 projectionMatrix;

    void main(){
        vUv = uv;
        gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
    }
`;
