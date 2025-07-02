#define PI 3.1415926535897932384626433832795
precision mediump float;
uniform mat4 projectionMatrix; 
uniform mat4 viewMatrix; 
uniform mat4 modelMatrix; 
uniform float uAngle;

attribute vec3 position;
attribute vec2 uv;
varying vec2 vUv;

void main() 
{ 
	vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  float angle = PI * uAngle;
  float c = cos(angle);
  float s = sin(angle);
  modelPosition.xz = mat2(c,s,-s,c) * modelPosition.xz;
	vec4 viewPosition = viewMatrix * modelPosition; 
	vec4 projectedPosition = projectionMatrix * viewPosition; 
	
	gl_Position = projectedPosition;
  
  vUv = uv;
}
