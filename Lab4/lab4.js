
/**Global Variables
**/


var use_texture = 0; 
var use_dnd = 0;
var use_line = 0;
var add_light = 0;
var add_ambient = 0;
var cubemapTexture;
var image_num = 0;
var pottex = 0;
var potdif = 0;
var potlit = 0;
var that_shape = [0];
var image_set = [0,1,2,3];


//Cube Map (loading images)

function initCubeMap() {
    cubemapTexture = gl.createTexture();
    cubemapTexture.i1 = new Image();
cubemapTexture.i2 = new Image();
cubemapTexture.i3 = new Image();
cubemapTexture.i4 = new Image();
cubemapTexture.i5 = new Image();
cubemapTexture.i6 = new Image();
    cubemapTexture.i1.onload = function() { handleCubemapTextureLoaded(cubemapTexture,1); }
cubemapTexture.i2.onload = function() { handleCubemapTextureLoaded(cubemapTexture,2); }
cubemapTexture.i3.onload = function() { handleCubemapTextureLoaded(cubemapTexture,3); }
cubemapTexture.i4.onload = function() { handleCubemapTextureLoaded(cubemapTexture,4); }
cubemapTexture.i5.onload = function() { handleCubemapTextureLoaded(cubemapTexture,5); }
cubemapTexture.i6.onload = function() { handleCubemapTextureLoaded(cubemapTexture,6); }
    cubemapTexture.i1.src = "./images/b3.jpg";
    cubemapTexture.i2.src = "./images/b4.jpg";
    cubemapTexture.i3.src = "./images/b5.jpg";
    cubemapTexture.i4.src = "./images/b2.jpg";
    cubemapTexture.i5.src = "./images/road.jpg";
    cubemapTexture.i6.src = "./images/sky.jpg";
}    
function handleCubemapTextureLoaded(texture, num) {
    gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, gl.REPEAT); 
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_R, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR); 

	switch(num){
	case 1:    gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE,
		  texture.i1);
	break
        case 2: gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_X, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE,
		  texture.i2);
	break
case 3:    gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_Y, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE,
		  texture.i3);
break
case 4:    gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE,
		  texture.i4);
break
case 5:    gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_Z, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE,
		  texture.i5);
break
case 6:    gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_Z, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE,
		  texture.i6);
break
}    
}



//Texture variables, each for 1 specific texture

var sampleTexture0;
var sampleTexture1;
var sampleTexture2;
var sampleTexture3;
var sampleTexture4;
var sampleTexture5;
var sampleTexture6;
var sampleTexture7;

function initTextures() {
	sampleTexture0 = gl.createTexture();
	sampleTexture0.image = new Image();
	sampleTexture0.image.onload = function() {handleTextureLoaded(sampleTexture0);}
	sampleTexture0.image.src = './images/b2.jpg';

	sampleTexture1 = gl.createTexture();
	sampleTexture1.image = new Image();
	sampleTexture1.image.onload = function() {handleTextureLoaded(sampleTexture1);}
	sampleTexture1.image.src = './images/b3.jpg';

	sampleTexture2 = gl.createTexture();
	sampleTexture2.image = new Image();
	sampleTexture2.image.onload = function() {handleTextureLoaded(sampleTexture2);}
	sampleTexture2.image.src = './images/b4.jpg';

	sampleTexture3 = gl.createTexture();
	sampleTexture3.image = new Image();
	sampleTexture3.image.onload = function() {handleTextureLoaded(sampleTexture3);}
	sampleTexture3.image.src = './images/b5.jpg';

	sampleTexture4 = gl.createTexture();
	sampleTexture4.image = new Image();
	sampleTexture4.image.onload = function() {handleTextureLoaded(sampleTexture4);}
	sampleTexture4.image.src = './images/road.jpg';

	sampleTexture5 = gl.createTexture();
	sampleTexture5.image = new Image();
	sampleTexture5.image.onload = function() {handleTextureLoaded(sampleTexture5);}
	sampleTexture5.image.src = './images/sky.jpg';

	sampleTexture6 = gl.createTexture();
	sampleTexture6.image = new Image();
	sampleTexture6.image.onload = function() {handleTextureLoaded(sampleTexture6);}
	sampleTexture6.image.src = './images/stem.jpg';

	sampleTexture7 = gl.createTexture();
	sampleTexture7.image = new Image();
	sampleTexture7.image.onload = function() {handleTextureLoaded(sampleTexture7);}
	sampleTexture7.image.src = './images/tree.jpg';
}

function handleTextureLoaded(texture) {
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.image);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.bindTexture(gl.TEXTURE_2D, null);
}






//Loading polygon model (teapot)

var teapotDataStore;


function initJSON()
{
    var request = new  XMLHttpRequest();
    request.open("GET", "teapot.json");
    request.onreadystatechange =
      function () {
          if (request.readyState == 4) {
	      console.log("state ="+request.readyState); 
              handleLoadedTeapot(JSON.parse(request.responseText));
        }
      }
    request.send();
}


function handleLoadedTeapot(teapotData)
{
	teapotDataStore = teapotData;

}

function loadpot(){

    normals = teapotDataStore.vertexNormals;
    vertices = teapotDataStore.vertexPositions; 
    indices =  teapotDataStore.indices;
    textureCoords = teapotDataStore.vertexTextureCoords;
}






var line_switch = 0
var back_color = [1,1,1,1]

 var mMatrix = mat4.create();  // model matrix
 var vMatrix = mat4.create(); // view matrix
 var pMatrix = mat4.create();  //projection matrix
 var nMatrix = mat4.create();  // normal matrix
 var v2wMatrix = mat4.create();

// set up the parameters for lighting 
  var light_ambient = [0,1,0,1]; 
  var light_diffuse = [.8,.8,.8,1];
  var light_specular = [1,1,1,1]; 
  var light_pos = [0,0,0,1];   // eye space position 

  var mat_ambient = [0, 0, 0, 1]; 
  var mat_diffuse= [1, 0, 0, .1]; 
  var mat_specular = [.9, .9, .9,1]; 
  var mat_shine = [50]; 


var gl;
var shaderProgram;
var vertexPostionBuffer;
var vertexColorBuffer;
var vertexIndexBuffer;
var vertexNormalBuffer;
var vertexTextureCoordBuffer;
var eye = [0,-1,-0.2]
var point = [0,0.6,0]
var up = [0,1,0]




var World = mat4.lookAt(eye,point,up);
vMatrix = World
var vWorld = mat4.create();



//Global Translation Updates to control heirarchy
var cMatrix1 = mat4.create();
mat4.identity(cMatrix1);

//Global Rotation Updates to control heirarchy
var rMatrix1 = mat4.create();
mat4.identity(rMatrix1);

var smRotate = mat4.create();
mat4.identity(smRotate);

var angle = 50; //view angle

var pMatrix = mat4.create();
mat4.perspective(angle,1,.1,10,pMatrix); //Projection Matrix
mat4.multiply(pMatrix,World,vWorld); // Clip View Transformation


function keyboardEvent(event){
	rat = 10
  if (event.keyCode == 87){	//Move Forward
	eye[1]+=.1;
	point[1]+=.1;
	//mat4.translate(cMatrix1,[0,-0.5/rat,0])

  }
  else if (event.keyCode == 83){ //Move Backward
	eye[1]-=.1;
	point[1]-=.1;
	//mat4.translate(cMatrix1,[0,0.5/rat,0])
  }
  else if( event.keyCode == 53||event.keyCode == 54){ //Zoom in and out
	if(event.keyCode == 53) angle+=5;
	else angle-=5;
	mat4.perspective(angle,1,.1,10,pMatrix);
	mat4.multiply(pMatrix,World,vWorld);
  }
  else if (event.keyCode == 68){ //Move Right
		eye[0]-=.1;
	point[0]-=.1;
  }
  else if (event.keyCode == 65){	//Move left
	eye[0]+=.1;
	point[0]+=.1;

  }
  else if (event.keyCode == 55){  // Rotate
		mat4.rotate(rMatrix1,3.14/10,[0,0,1])
  }
else if (event.keyCode == 56){    // Rotate Opposite
	mat4.rotate(rMatrix1,-3.14/10,[0,0,1])
  }
  else if (event.keyCode == 57){  // Rotate
		mat4.rotate(rMatrix1,3.14/10,[0,1,0])
  }
else if (event.keyCode == 48){    // Rotate Opposite
	mat4.rotate(rMatrix1,-3.14/10,[1,0,0])
  }
else if (event.keyCode == 50){  // Camera Down
	eye[2]-=.1;
	point[2]-=.1;
  }
else if (event.keyCode ==49){   // Camera Up
	eye[2]+=.1;
	point[2]+=.1;
  }
else if (event.keyCode ==51){   // Sphere Back
	
  }
else if (event.keyCode ==52){   // Sphere Back
	
  }

  vMatrix = mat4.lookAt(eye,point,up);
  drawScene();
 }

 function initGL(canvas) { /** Gets Canvas **/
        try {
            gl = canvas.getContext("experimental-webgl");
            gl.viewportWidth = canvas.width;
            gl.viewportHeight = canvas.height;
        } catch (e) {
        }
        if (!gl) {
            alert("Could not initialise WebGL, sorry :-(");
        }
    }



//HTML buttons

function buttonEvent(arg){ /** Handles Button Events **/
   button = arg;
   if( arg==0)	//
	{	if (pottex !=1)
		pottex = 1
		else
		pottex = 0
		image_set = [Math.ceil(Math.random()*10)%7,Math.ceil(Math.random()*10)%7,Math.ceil(Math.random()*10)%7,Math.ceil(Math.random()*10)%7]
	}
   else if(arg==1){
		if(pottex !=2)
	 	pottex = 2
		else pottex =0
	}
    else if (arg==2){
		potdif = !potdif
	}
    else if (arg == 3){
		potlit = !potlit
	}
    else if(arg == 4){
		use_dnd = !use_dnd
		use_line = !use_line
	}
    else if(arg == 5){
		that_shape = [Math.ceil(Math.random()*100)%3, Math.ceil(Math.random()*100)%10+1];
	}
   drawScene();
}


function setMatrixUniforms() {
        gl.uniformMatrix4fv(shaderProgram.mMatrixUniform, false, mMatrix);
        gl.uniformMatrix4fv(shaderProgram.vMatrixUniform, false, vMatrix);
        gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, pMatrix);
        gl.uniformMatrix4fv(shaderProgram.nMatrixUniform, false, nMatrix);
	gl.uniformMatrix4fv(shaderProgram.v2wMatrixUniform, false, v2wMatrix);
	
    }



//6 sides of the room cube

function drawwalls(){
scaling = [.1,.1,.1];
scaling_2 = 1

mat4.identity(mMatrix);
mat4.multiply(mMatrix,cMatrix1,mMatrix)
mat4.translate(mMatrix,[0,0,0.5*scaling_2])
mat4.scale(mMatrix,scaling)
mat4.scale(mMatrix,[1,2,1])
use_texture = 1;
image_num = 4;
square()
redraw()

mat4.identity(mMatrix);
mat4.multiply(mMatrix,cMatrix1,mMatrix)
mat4.translate(mMatrix,[0,0,-0.5*scaling_2])
mat4.scale(mMatrix,scaling)
mat4.scale(mMatrix,[1,2,1])
use_texture = 1;
image_num = 5;
square()
redraw()

mat4.identity(mMatrix);
mat4.multiply(mMatrix,cMatrix1,mMatrix)
mat4.translate(mMatrix,[0,.5*scaling_2*2,0])
mat4.rotate(mMatrix,3.14/2,[1,0,0])
mat4.scale(mMatrix,scaling)
use_texture = 1;
image_num = 3;
square()
redraw()

mat4.identity(mMatrix);
mat4.multiply(mMatrix,cMatrix1,mMatrix)
mat4.translate(mMatrix,[0,-.5*scaling_2*2,0])
mat4.rotate(mMatrix,3.14/2,[1,0,0])
mat4.scale(mMatrix,scaling)
use_texture = 1;
image_num = 0;
square()
redraw()

mat4.identity(mMatrix);
mat4.multiply(mMatrix,cMatrix1,mMatrix)
mat4.translate(mMatrix,[0.5*scaling_2,0,0])
mat4.rotate(mMatrix,3.14/2,[0,1,0])
mat4.scale(mMatrix,scaling)
mat4.scale(mMatrix,[1,2,1])
use_texture = 1;
image_num = 1;
square()
redraw()

mat4.identity(mMatrix);
mat4.multiply(mMatrix,cMatrix1,mMatrix)
mat4.translate(mMatrix,[-.5*scaling_2,0,0])
mat4.rotate(mMatrix,3.14/2,[0,1,0])
mat4.scale(mMatrix,scaling)
mat4.scale(mMatrix,[1,2,1])
use_texture = 1;
image_num = 2;
square()
redraw()


}


//Calls all the drawing function with arguments

function drawWorld(){
line_switch  =  0

drawpot(.01,0,[.3,-0.1,-.1],[1,0,0,1],0,0,image_set[0])
drawpot(.006,0,[-.2,-0.1,.2],[1,1,1,1],0,0,image_set[1])
drawpot(.006,0,[0,-0.1,.1],[0,0,1,1],0,0,image_set[2])
drawshape(that_shape,4,8,0,6,[.3,.1,.4],.4,1,image_set[3]);


line_switch = use_line

drawwalls()

drawshape([2,2],3,6,1,6,[-.21,.6,0.30],1,0);
drawshape([0],3,6,1,7,[-.21,.6,-.3+.30],1,0);

drawshape([2,2],3,6,1,6,[.21,.6,0.30],1,0);
drawshape([0],3,6,1,7,[.21,.6,-.3+.30],1,0);


}

function drawshape(shape,radius,n,tex,num,translate,scale,on,image){
c = draw3D(shape,radius,n)
mat4.identity(mMatrix);
mat4.translate(mMatrix,translate)
if (on){
mat4.multiply(mMatrix,cMatrix1,mMatrix)
mat4.multiply(mMatrix,rMatrix1,mMatrix)
}
mat4.scale(mMatrix,[scale,scale,scale])
use_texture = tex;
add_ambient = 0;
mat_diffuse = [1,1,0,1]
image_num = num;
if(on){
image_num = image;
use_texture = pottex;
add_ambient = potdif;
add_light = potlit;
}
add_light = 0;
redraw()
add_ambient = 0;
mat_diffuse= [1,0,0,.1]
}

function drawpot(scale,tex,translate,diffuse,a,b,image){
loadpot();
mat4.identity(mMatrix);
mat4.translate(mMatrix,translate)
mat4.rotate(mMatrix,-3.14/2,[1,0,0])
mat4.multiply(mMatrix,cMatrix1,mMatrix)
mat4.multiply(mMatrix,rMatrix1,mMatrix)
mat4.scale(mMatrix,[scale,scale,scale])
image_num = image;
use_texture = pottex;
add_ambient = potdif;
add_light = potlit;
mat_diffuse = diffuse
redraw();

add_ambient = 0;
add_light = 0;

}



function redraw(){ //Buffer initiallization when objects are drawn
gl.uniform1i(shaderProgram.use_textureUniform, use_texture);
gl.uniform1i(shaderProgram.use_dndUniform, use_dnd);
gl.uniform1i(shaderProgram.add_ambientUniform, add_ambient);
gl.uniform1i(shaderProgram.add_lightUniform, add_light);

mat4.identity(nMatrix); 
nMatrix = mat4.multiply(nMatrix, vMatrix);
nMatrix = mat4.multiply(nMatrix, mMatrix); 	
nMatrix = mat4.inverse(nMatrix);
nMatrix = mat4.transpose(nMatrix);


mat4.identity(v2wMatrix);
v2wMatrix = mat4.multiply(v2wMatrix, vMatrix);     
v2wMatrix = mat4.transpose(v2wMatrix)

shaderProgram.light_posUniform = gl.getUniformLocation(shaderProgram, "light_pos");
gl.uniform4f(shaderProgram.light_posUniform,light_pos[0], light_pos[1], light_pos[2], light_pos[3]); 	
gl.uniform4f(shaderProgram.ambient_coefUniform, mat_ambient[0], mat_ambient[1], mat_ambient[2], 1.0); 
gl.uniform4f(shaderProgram.diffuse_coefUniform, mat_diffuse[0], mat_diffuse[1], mat_diffuse[2], 1.0); 
gl.uniform4f(shaderProgram.specular_coefUniform, mat_specular[0], mat_specular[1], mat_specular[2],1.0); 
gl.uniform1f(shaderProgram.shininess_coefUniform, mat_shine[0]); 

gl.uniform4f(shaderProgram.light_ambientUniform, light_ambient[0], light_ambient[1], light_ambient[2], 1.0); 
gl.uniform4f(shaderProgram.light_diffuseUniform, light_diffuse[0], light_diffuse[1], light_diffuse[2], 1.0); 
gl.uniform4f(shaderProgram.light_specularUniform, light_specular[0], light_specular[1], light_specular[2],1.0); 

setMatrixUniforms();


initBuffers()
gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBuffer);
gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, vertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

gl.bindBuffer(gl.ARRAY_BUFFER, vertexNormalBuffer);
gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, vertexNormalBuffer.itemSize, gl.FLOAT, false, 0, 0);

gl.bindBuffer(gl.ARRAY_BUFFER, vertexTextureCoordBuffer);
gl.vertexAttribPointer(shaderProgram.vertexTexCoordsAttribute, vertexTextureCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);

	switch(image_num){
	case 0: texture2use = sampleTexture0;
	break
	case 1:texture2use = sampleTexture1;
	break
	case 2:texture2use = sampleTexture2;
	break
	case 3:texture2use = sampleTexture3;
	break
	case 4:texture2use = sampleTexture4;
	break
	case 5:texture2use = sampleTexture5;
	break
	case 6:texture2use = sampleTexture6;
	break
	case 7:texture2use = sampleTexture7;
	break
	}
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, vertexIndexBuffer);
gl.activeTexture(gl.TEXTURE0);   // set texture unit 0 to use 
gl.bindTexture(gl.TEXTURE_2D, texture2use);    // bind the texture object to the texture unit 
gl.uniform1i(shaderProgram.textureUniform, 0);

gl.activeTexture(gl.TEXTURE1);   // set texture unit 1 to use 
gl.bindTexture(gl.TEXTURE_CUBE_MAP, cubemapTexture);    // bind the texture object to the texture unit 
gl.uniform1i(shaderProgram.cube_map_textureUniform, 1);   // pass the texture unit to the shader


if (line_switch)
 gl.drawElements(gl.LINES, vertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0); 					
else
gl.drawElements(gl.TRIANGLES, vertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0); 					

}





    function drawScene() { /** Draws Scene **/
	gl.enable(gl.DEPTH_TEST);
	gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
	gl.clearColor(back_color[0],back_color[1],back_color[2],back_color[3])  //SKY
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	drawWorld();
    }


    function webGLStart() {  // First Call
        var canvas = document.getElementById("lab4-canvas");
        initGL(canvas);
        initShaders();
        
	shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
        gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);

	shaderProgram.vertexNormalAttribute = gl.getAttribLocation(shaderProgram, "aVertexNormal");
        gl.enableVertexAttribArray(shaderProgram.vertexNormalAttribute);

	shaderProgram.vertexTexCoordsAttribute = gl.getAttribLocation(shaderProgram, "aVertexTexCoords");
        gl.enableVertexAttribArray(shaderProgram.vertexTexCoordsAttribute);
	
	document.addEventListener('keydown', keyboardEvent, false);
	shaderProgram.mvMatrixUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
	shaderProgram.mMatrixUniform = gl.getUniformLocation(shaderProgram, "uMMatrix");
        shaderProgram.vMatrixUniform = gl.getUniformLocation(shaderProgram, "uVMatrix");
	shaderProgram.pMatrixUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
	shaderProgram.nMatrixUniform = gl.getUniformLocation(shaderProgram, "uNMatrix");
	shaderProgram.v2wMatrixUniform = gl.getUniformLocation(shaderProgram, "uV2WMatrix");	

        shaderProgram.light_posUniform = gl.getUniformLocation(shaderProgram, "light_pos");
        shaderProgram.ambient_coefUniform = gl.getUniformLocation(shaderProgram, "ambient_coef");	
        shaderProgram.diffuse_coefUniform = gl.getUniformLocation(shaderProgram, "diffuse_coef");
        shaderProgram.specular_coefUniform = gl.getUniformLocation(shaderProgram, "specular_coef");
        shaderProgram.shininess_coefUniform = gl.getUniformLocation(shaderProgram, "mat_shininess");

        shaderProgram.light_ambientUniform = gl.getUniformLocation(shaderProgram, "light_ambient");	
        shaderProgram.light_diffuseUniform = gl.getUniformLocation(shaderProgram, "light_diffuse");
        shaderProgram.light_specularUniform = gl.getUniformLocation(shaderProgram, "light_specular");

	shaderProgram.textureUniform = gl.getUniformLocation(shaderProgram, "myTexture");
	shaderProgram.cube_map_textureUniform = gl.getUniformLocation(shaderProgram, "cubeMap");
	shaderProgram.use_textureUniform = gl.getUniformLocation(shaderProgram, "use_texture");
	shaderProgram.use_dndUniform = gl.getUniformLocation(shaderProgram, "use_dnd");
	shaderProgram.add_lightUniform = gl.getUniformLocation(shaderProgram, "add_light");
	shaderProgram.add_ambientUniform = gl.getUniformLocation(shaderProgram, "add_ambient");
	initTextures();
	initCubeMap();
	initJSON();
	alert('loaded the images');
        drawScene();
    }

   function initBuffers(){
    vertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    vertexPositionBuffer.itemSize = 3;
    vertexPositionBuffer.numItems = vertices.length/3;
    

   vertexIndexBuffer = gl.createBuffer();
   gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, vertexIndexBuffer);
   gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
   vertexIndexBuffer.itemsize = 1;
   vertexIndexBuffer.numItems = indices.length;

   vertexNormalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexNormalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);
    vertexNormalBuffer.itemSize = 3;
    vertexNormalBuffer.numItems = normals.length/3;

    vertexTextureCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexTextureCoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoords), gl.STATIC_DRAW);
    vertexTextureCoordBuffer.itemSize = 2;
    vertexTextureCoordBuffer.numItems = textureCoords.length/2;
   }
