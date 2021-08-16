export const _VS = `
vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
vec3 fade(vec3 t) {return t*t*t*(t*(t*6.0-15.0)+10.0);}

float cnoise(vec3 P){
  vec3 Pi0 = floor(P); // Integer part for indexing
  vec3 Pi1 = Pi0 + vec3(1.0); // Integer part + 1
  Pi0 = mod(Pi0, 289.0);
  Pi1 = mod(Pi1, 289.0);
  vec3 Pf0 = fract(P); // Fractional part for interpolation
  vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0
  vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
  vec4 iy = vec4(Pi0.yy, Pi1.yy);
  vec4 iz0 = Pi0.zzzz;
  vec4 iz1 = Pi1.zzzz;

  vec4 ixy = permute(permute(ix) + iy);
  vec4 ixy0 = permute(ixy + iz0);
  vec4 ixy1 = permute(ixy + iz1);

  vec4 gx0 = ixy0 / 7.0;
  vec4 gy0 = fract(floor(gx0) / 7.0) - 0.5;
  gx0 = fract(gx0);
  vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
  vec4 sz0 = step(gz0, vec4(0.0));
  gx0 -= sz0 * (step(0.0, gx0) - 0.5);
  gy0 -= sz0 * (step(0.0, gy0) - 0.5);

  vec4 gx1 = ixy1 / 7.0;
  vec4 gy1 = fract(floor(gx1) / 7.0) - 0.5;
  gx1 = fract(gx1);
  vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
  vec4 sz1 = step(gz1, vec4(0.0));
  gx1 -= sz1 * (step(0.0, gx1) - 0.5);
  gy1 -= sz1 * (step(0.0, gy1) - 0.5);

  vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
  vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
  vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
  vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
  vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
  vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
  vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
  vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

  vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
  g000 *= norm0.x;
  g010 *= norm0.y;
  g100 *= norm0.z;
  g110 *= norm0.w;
  vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
  g001 *= norm1.x;
  g011 *= norm1.y;
  g101 *= norm1.z;
  g111 *= norm1.w;

  float n000 = dot(g000, Pf0);
  float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
  float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
  float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
  float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
  float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
  float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
  float n111 = dot(g111, Pf1);

  vec3 fade_xyz = fade(Pf0);
  vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
  vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
  float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);
  return 2.2 * n_xyz;
}

uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;
uniform mat4 modelMatrix;
uniform float time;
uniform vec2 h_pos;
uniform float h_state;


attribute vec3 position;
attribute vec2 uv;

varying vec2 vUv;
varying float vtime;
varying float vNoise;
varying float vh_state;

void main(){
    vh_state = h_state;
    vtime = time;
    vUv = uv;
    vec3 mod_pos = position;
    float dist = distance(uv, h_pos);
    mod_pos.z += (20. * sin(dist*10.)) * h_state;
    vNoise = dist * 10.;
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(mod_pos, 1.0);
}
`;
    
    

export const _FS = `
precision mediump float;

uniform sampler2D baseColor;

varying float vh_state;
varying vec2 vUv;
varying float vtime;
varying float vNoise;

#define r vUv.xy
#define t iTime

#define zoom 1.

#define P(id,a,b,c,d,e,f,g,h) if( id == int(pos.y) ){ int pa = a+2*(b+2*(c+2*(d+2*(e+2*(f+2*(g+2*(h))))))); cha = floor(mod(float(pa)/pow(2.,float(pos.x)-1.),2.)); }

float gray(vec3 _i)
{
    return _i.x*0.299+_i.y*0.587+_i.z*0.114;
}

void main()
{
    vec2 uv = vec2(floor(gl_FragCoord.x/8./zoom)*8.*zoom,floor(gl_FragCoord.y/12./zoom)*12.*zoom)/r;
    ivec2 pos = ivec2(mod(gl_FragCoord.x/zoom,8.),mod(gl_FragCoord.y/zoom,12.));
    vec4 tex = texture2D(baseColor,vUv);
    float cha = 0.;
    
    float g = gray(tex.xyz);
    if( g < .125 )
    {
        P(11,0,0,0,0,0,0,0,0);
        P(10,0,0,0,0,0,0,0,0);
        P(9,0,0,0,0,0,0,0,0);
        P(8,0,0,0,0,0,0,0,0);
        P(7,0,0,0,0,0,0,0,0);
        P(6,0,0,0,0,0,0,0,0);
        P(5,0,0,0,0,0,0,0,0);
        P(4,0,0,0,0,0,0,0,0);
        P(3,0,0,0,0,0,0,0,0);
        P(2,0,0,0,0,0,0,0,0);
        P(1,0,0,0,0,0,0,0,0);
        P(0,0,0,0,0,0,0,0,0);
    }
    else if( g < .25 ) // .
    {
        P(11,0,0,0,0,0,0,0,0);
        P(10,0,0,0,0,0,0,0,0);
        P(9,0,0,0,0,0,0,0,0);
        P(8,0,0,0,0,0,0,0,0);
        P(7,0,0,0,0,0,0,0,0);
        P(6,0,0,0,0,0,0,0,0);
        P(5,0,0,0,0,0,0,0,0);
        P(4,0,0,0,1,1,0,0,0);
        P(3,0,0,0,1,1,0,0,0);
        P(2,0,0,0,0,0,0,0,0);
        P(1,0,0,0,0,0,0,0,0);
        P(0,0,0,0,0,0,0,0,0);
    }
    else if( g < .375 ) // ,
    {
        P(11,0,0,0,0,0,0,0,0);
        P(10,0,0,0,0,0,0,0,0);
        P(9,0,0,0,0,0,0,0,0);
        P(8,0,0,0,0,0,0,0,0);
        P(7,0,0,0,0,0,0,0,0);
        P(6,0,0,0,0,0,0,0,0);
        P(5,0,0,0,0,0,0,0,0);
        P(4,0,0,0,1,1,0,0,0);
        P(3,0,0,0,1,1,0,0,0);
        P(2,0,0,0,0,1,0,0,0);
        P(1,0,0,0,1,0,0,0,0);
        P(0,0,0,0,0,0,0,0,0);
    }
    else if( g < .5 ) // -
    {
        P(11,0,0,0,0,0,0,0,0);
        P(10,0,0,0,0,0,0,0,0);
        P(9,0,0,0,0,0,0,0,0);
        P(8,0,0,0,0,0,0,0,0);
        P(7,0,0,0,0,0,0,0,0);
        P(6,1,1,1,1,1,1,1,0);
        P(5,0,0,0,0,0,0,0,0);
        P(4,0,0,0,0,0,0,0,0);
        P(3,0,0,0,0,0,0,0,0);
        P(2,0,0,0,0,0,0,0,0);
        P(1,0,0,0,0,0,0,0,0);
        P(0,0,0,0,0,0,0,0,0);
    }
    else if(g < .625 ) // +
    {
        P(11,0,0,0,0,0,0,0,0);
        P(10,0,0,0,0,0,0,0,0);
        P(9,0,0,0,1,0,0,0,0);
        P(8,0,0,0,1,0,0,0,0);
        P(7,0,0,0,1,0,0,0,0);
        P(6,1,1,1,1,1,1,1,0);
        P(5,0,0,0,1,0,0,0,0);
        P(4,0,0,0,1,0,0,0,0);
        P(3,0,0,0,1,0,0,0,0);
        P(2,0,0,0,0,0,0,0,0);
        P(1,0,0,0,0,0,0,0,0);
        P(0,0,0,0,0,0,0,0,0);
    }
    else if(g < .75 ) // *
    {
        P(11,0,0,0,0,0,0,0,0);
        P(10,0,0,0,1,0,0,0,0);
        P(9,1,0,0,1,0,0,1,0);
        P(8,0,1,0,1,0,1,0,0);
        P(7,0,0,1,1,1,0,0,0);
        P(6,0,0,0,1,0,0,0,0);
        P(5,0,0,1,1,1,0,0,0);
        P(4,0,1,0,1,0,1,0,0);
        P(3,1,0,0,1,0,0,1,0);
        P(2,0,0,0,1,0,0,0,0);
        P(1,0,0,0,0,0,0,0,0);
        P(0,0,0,0,0,0,0,0,0);
    }
    else if(g < .875 ) // #
    {
        P(11,0,0,0,0,0,0,0,0);
        P(10,0,0,1,0,0,1,0,0);
        P(9,0,0,1,0,0,1,0,0);
        P(8,1,1,1,1,1,1,1,0);
        P(7,0,0,1,0,0,1,0,0);
        P(6,0,0,1,0,0,1,0,0);
        P(5,0,1,0,0,1,0,0,0);
        P(4,0,1,0,0,1,0,0,0);
        P(3,1,1,1,1,1,1,1,0);
        P(2,0,1,0,0,1,0,0,0);
        P(1,0,1,0,0,1,0,0,0);
        P(0,0,0,0,0,0,0,0,0);
    }
    else // @
    {
        P(11,0,0,0,0,0,0,0,0);
        P(10,0,0,1,1,1,1,0,0);
        P(9,0,1,0,0,0,0,1,0);
        P(8,1,0,0,0,1,1,1,0);
        P(7,1,0,0,1,0,0,1,0);
        P(6,1,0,0,1,0,0,1,0);
        P(5,1,0,0,1,0,0,1,0);
        P(4,1,0,0,1,0,0,1,0);
        P(3,1,0,0,1,1,1,1,0);
        P(2,0,1,0,0,0,0,0,0);
        P(1,0,0,1,1,1,1,1,0);
        P(0,0,0,0,0,0,0,0,0);
    }
    
    
    vec3 col = tex.xyz/max(tex.x,max(tex.y,tex.z));
    vec4 ascii_t = vec4(cha*col,1.);
    gl_FragColor = mix(tex, ascii_t, 0.8);
    
    
}
`;