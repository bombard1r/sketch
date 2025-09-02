uniform sampler2D frontTexture;
uniform sampler2D backTexture;
uniform sampler2D normalMap;
uniform sampler2D roughnessMap;
precision mediump float; 

varying vec2 vUv;

void main() 
{
    vec3 normal = texture2D(normalMap, vUv).xyz;
    float roughness = texture2D(roughnessMap, vUv).r;
    if (gl_FrontFacing) {
        gl_FragColor = texture2D(frontTexture, vUv);
    } else {
        gl_FragColor = texture2D(backTexture, vUv);
    }

// #include <colorspace_fragment>
}
