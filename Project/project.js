var object_list = [];
var trap_list = [];
var use_texture = 0; 
var use_dnd = 0;
var use_line = 0;
var image_num = 0;
var that_shape = [0];
var image_set = [0,1,2,3];
var ball_x = 0
var ball_y = 0.1
var ball_z = .2

var r_angle = 0;

max_objects = 1;



var sampleTexture0;
var sampleTexture1;
var sampleTexture2;
var sampleTexture3;
var sampleTexture4;
var sampleTexture15;

function initTextures() {
	sampleTexture0 = gl.createTexture();
	sampleTexture0.image = new Image();
	sampleTexture0.image.onload = function() {handleTextureLoaded(sampleTexture0);}
	sampleTexture0.image.src = './images/floor.jpg';

	sampleTexture1 = gl.createTexture();
	sampleTexture1.image = new Image();
	sampleTexture1.image.onload = function() {handleTextureLoaded(sampleTexture1);}
	sampleTexture1.image.src = './images/ob1.jpg';

	sampleTexture2 = gl.createTexture();
	sampleTexture2.image = new Image();
	sampleTexture2.image.onload = function() {handleTextureLoaded(sampleTexture2);}
	sampleTexture2.image.src = './images/3.jpg';

	sampleTexture3 = gl.createTexture();
	sampleTexture3.image = new Image();
	sampleTexture3.image.onload = function() {handleTextureLoaded(sampleTexture3);}
	sampleTexture3.image.src = './images/top.jpg';

	sampleTexture4 = gl.createTexture();
	sampleTexture4.image = new Image();
	sampleTexture4.image.onload = function() {handleTextureLoaded(sampleTexture4);}
	sampleTexture4.image.src = './images/danger.jpg';

	sampleTexture15 = gl.createTexture();
	sampleTexture15.image = new Image();
	sampleTexture15.image.onload = function() {handleTextureLoaded(sampleTexture15);}
	sampleTexture15.image.src = './images/ball.jpg';
}

function handleTextureLoaded(texture) {
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.image);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.bindTexture(gl.TEXTURE_2D, null);
}


function rand(min,max){
	return Math.random() * (max - min) + min;
	}


var line_switch = 1
var back_color = [1,1,1,1]

 var mMatrix = mat4.create();  // model matrix
 var vMatrix = mat4.create(); // view matrix
 var pMatrix = mat4.create();  //projection matrix
 var nMatrix = mat4.create();  // normal matrix
 var v2wMatrix = mat4.create();


var gl;
var shaderProgram;
var vertexPostionBuffer;
var vertexColorBuffer;
var vertexIndexBuffer;
var vertexNormalBuffer;
var vertexTextureCoordBuffer;
var eye = [-0.25,-1+.9,-0.2]
var point = [-0.25,0.6+.9,0]
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


//Global Translation Updates to control heirarchy
var cMatrixb = mat4.create();
mat4.identity(cMatrixb);
mat4.translate(cMatrixb,[ball_x,ball_y,0])

//Global Rotation Updates to control heirarchy
var rMatrixb = mat4.create();
mat4.identity(rMatrixb);


var angle = 50; //view angle

var pMatrix = mat4.create();
mat4.perspective(angle,1,.1,10,pMatrix); //Projection Matrix
mat4.multiply(pMatrix,World,vWorld); // Clip View Transformation


function check_ball(ball_x,ball_y){

	if (ball_x>2.38 || ball_x<-.6 || ball_y>0.5+1.5 || ball_y<0.01) return 0;
	else if((ball_x<1.88 && ball_x>-0.12) && (ball_y>0.48 && ball_y <1.52)) return 0;
	else return 1;

}

function forward(){
	if (check_ball(ball_x+0.5/rat,ball_y))
	ball_x+=0.5/rat
	mat4.identity(cMatrixb)
	mat4.translate(cMatrixb,[ball_x,ball_y,ball_z])
	mat4.rotate(rMatrixb,-3.14/5,[0,1,0])
}

function backward(){
	if (check_ball(ball_x-0.5/rat,ball_y))
	ball_x-=0.5/rat
	mat4.identity(cMatrixb)
	mat4.translate(cMatrixb,[ball_x,ball_y,ball_z])
	mat4.rotate(rMatrixb,3.14/5,[0,1,0])

}

function right(){
if(check_ball(ball_x,ball_y+0.5/rat))
	ball_y+=0.5/rat
		mat4.identity(cMatrixb)
	mat4.translate(cMatrixb,[ball_x,ball_y,ball_z])
	mat4.rotate(rMatrixb,-3.14/5,[1,0,0])
}

function left(){
	if(check_ball(ball_x,ball_y-0.5/rat))
	ball_y-=0.5/rat
	mat4.identity(cMatrixb)
	mat4.translate(cMatrixb,[ball_x,ball_y,ball_z])
	mat4.rotate(rMatrixb,3.14/5,[1,0,0])
}

function keyboardEvent(event){
	rat = 10
  if (event.keyCode == 87){	//Move Forward
	switch(r_angle%4){
		case 0:	forward()
		break;
		case 1: right()
		break;
		case 2:  backward()
		break;
		case 3: left()
	}

  }
  else if (event.keyCode == 83){ //Move Backward
	switch(r_angle%4){
		case 0:	backward()
		break;
		case 1: left()
		break;
		case 2:  forward()
		break;
		case 3: right()
	}
  }
  else if (event.keyCode == 68){ //Move Right
	switch(r_angle%4){
		case 3:	forward()
		break;
		case 0: right()
		break;
		case 1:  backward()
		break;
		case 2: left()
	}
  }
  else if (event.keyCode == 65){	//Move left
	switch(r_angle%4){
		case 1:	forward()
		break;
		case 2: right()
		break;
		case 3:  backward()
		break;
		case 0: left()
	}
  }
  else if (event.keyCode == 55){  // Rotate]

  }
else if (event.keyCode == 56){    // Rotate Opposite

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
else if(event.keyCode ==32){
	ball_z = -.1
}
else if (event.keyCode ==49){   // Camera Up
	mat4.identity(cMatrixb)
	mat4.translate(cMatrixb,[ball_x,ball_y,ball_z])
	eye[2]+=.1;
	point[2]+=.1;
  }
else if (event.keyCode ==74){   // Sphere Back
	if (r_angle%4==0)
	mat4.translate(cMatrix1,[0,.1,0])
	else if (r_angle%4==1)
	mat4.translate(cMatrix1,[-.1,0,0])
	else if (r_angle%4==2)
	mat4.translate(cMatrix1,[0,-.1,0])
	else
	mat4.translate(cMatrix1,[.1,0,0])
  }
else if (event.keyCode ==76){   // Sphere Back
	if(r_angle%4==0)
	mat4.translate(cMatrix1,[0,-.1,0])
	else if (r_angle%4==1)
	mat4.translate(cMatrix1,[.1,0,0])
	else if(r_angle%4==2)
	mat4.translate(cMatrix1,[0,.1,0])
	else
	mat4.translate(cMatrix1,[-.1,0,0])
  }
else if (event.keyCode ==73){   // Sphere Back
	if(r_angle%4==0)
	mat4.translate(cMatrix1,[-.1,0,0])
	else if(r_angle%4==1)
	mat4.translate(cMatrix1,[0,-.1,0])
	else if(r_angle%4==2)
	mat4.translate(cMatrix1,[.1,0,0])
	else
	mat4.translate(cMatrix1,[0,.1,0])

  }
else if (event.keyCode ==75){   // Sphere Back
	if(r_angle%4==0)
	mat4.translate(cMatrix1,[.1,0,0])
	else if(r_angle%4==1)
	mat4.translate(cMatrix1,[0,.1,0])
	else if(r_angle%4==2)
	mat4.translate(cMatrix1,[-.1,0,0])
	else
	mat4.translate(cMatrix1,[0,-.1,0])
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
   if( arg==1)	//
	{
				r_angle+=1;
		mat4.rotate(rMatrix1,-3.14/2,[0,0,1])	
	}
   else if(arg==0){
				r_angle-=1;
		mat4.rotate(rMatrix1,3.14/2,[0,0,1])
	}
    else if (arg==2){
		max_objects+=1;
	}
    else if(arg == 3){
		use_line = !use_line
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



function drawfloor(scal,trans,img){
	c = square()
	mat4.identity(mMatrix);
	mat4.multiply(mMatrix,rMatrix1,mMatrix)
	mat4.multiply(mMatrix,cMatrix1,mMatrix)
	mat4.translate(mMatrix,trans)
	mat4.translate(mMatrix,[.87,1,.15])
	mat4.scale(mMatrix,[.2*1.5,.05*4,.1])
	mat4.scale(mMatrix,scal)
	use_texture = 1
	image_num = img
	redraw()
}

function drawWorld(){

for (var i=0;i<object_list.length;i++){
	drawobject(object_list[i][0],object_list[i][1],0,object_list[i][2])
}

drawfloor([1,1,1],[0,0,.1],0)
drawfloor([10,10,1],[0,0,-.6],3)
drawball([.3,.3,.3],[0,0,0],0,15);
drawTrap(trap_list[0][0],trap_list[0][1],0,trap_list[0][2])
drawTrap(trap_list[1][0],trap_list[1][1],0,trap_list[1][2])
drawbuildings()

}


function drawTrap(scal,trans,rotat,img){
c = square([1,0,0,1])
mat4.identity(mMatrix);
mat4.multiply(mMatrix,rMatrix1,mMatrix)
mat4.multiply(mMatrix,cMatrix1,mMatrix)
mat4.translate(mMatrix,[trans[0],trans[1],.24])
mat4.scale(mMatrix,scal)
mat4.scale(mMatrix,[.008,.008,.008])
image_num = 4
use_texture = 1
line_switch  = 0
redraw()
line_switch = 0
}

function drawobject(scal,trans,rotat,img){
c = draw3D([1],2,4)
mat4.identity(mMatrix);
mat4.multiply(mMatrix,rMatrix1,mMatrix)
mat4.multiply(mMatrix,cMatrix1,mMatrix)
mat4.translate(mMatrix,trans)
mat4.rotate(mMatrix,rotat,[0,0,1])
mat4.scale(mMatrix,scal)
mat4.scale(mMatrix,[.3,.3,.3])
use_texture = 1;
image_num = img;
redraw()

c = square([1,1,1,0.5-trans[2]])
mat4.identity(mMatrix);
mat4.multiply(mMatrix,rMatrix1,mMatrix)
mat4.multiply(mMatrix,cMatrix1,mMatrix)
mat4.translate(mMatrix,[trans[0],trans[1],.24])
mat4.scale(mMatrix,scal)
mat4.scale(mMatrix,[.008,.008,.008])
use_texture = 0
line_switch  = 1
redraw()
line_switch = 0
}

function drawbuildings(){


drawbuilding([12,1,1],[.875,0,0],0,2);

drawbuilding([8,1,1],[.89,0.5,0],0,2);

drawbuilding([8,1,1],[2.36,1,0],3.14/2,2);

drawbuilding([4,1,1],[1.88,1,0],3.14/2,2);

drawbuilding([8,1,1],[.875,1.498,0],0,2);

drawbuilding([12,1,1],[0.875,2,0],0,2);

drawbuilding([8,1,1],[2.39-3,1,0],3.14/2,2);

drawbuilding([4,1,1],[1.89-2,1,0],3.14/2,2);

}


function drawbuilding(scal,trans,rotat,img){
c = square()
mat4.identity(mMatrix);
mat4.multiply(mMatrix,rMatrix1,mMatrix)
mat4.multiply(mMatrix,cMatrix1,mMatrix)
mat4.translate(mMatrix,trans)
mat4.rotate(mMatrix,3.14/2,[1,0,0])
mat4.rotate(mMatrix,rotat,[0,1,0])
mat4.scale(mMatrix,scal)
mat4.scale(mMatrix,[.025,.05,.05])
use_texture = 1;
add_ambient = 0;
mat_diffuse = [1,1,0,1]
image_num = img;
add_light = 0;
redraw()
add_ambient = 0;
mat_diffuse= [1,0,0,.1]
}


function drawball(scal,trans,rotat,img){
c = draw3D([0],4,8)
mat4.identity(mMatrix);
mat4.multiply(mMatrix,rMatrix1,mMatrix)
mat4.multiply(mMatrix,cMatrix1,mMatrix)
mat4.multiply(mMatrix,cMatrixb,mMatrix)
mat4.translate(mMatrix,trans)
mat4.multiply(mMatrix,rMatrixb,mMatrix)
mat4.scale(mMatrix,scal)
mat4.scale(mMatrix,[.3,.3,.3])
use_texture = 1;
add_ambient = 0;
mat_diffuse = [1,1,0,1]
image_num = img;
add_light = 0;
redraw()
add_ambient = 0;
mat_diffuse= [1,0,0,.1]
}



function redraw(){ //Buffer initiallization when objects are drawn
gl.uniform1i(shaderProgram.use_textureUniform, use_texture);
gl.uniform1i(shaderProgram.use_dndUniform, use_dnd);

mat4.identity(nMatrix); 
nMatrix = mat4.multiply(nMatrix, vMatrix);
nMatrix = mat4.multiply(nMatrix, mMatrix); 	
nMatrix = mat4.inverse(nMatrix);
nMatrix = mat4.transpose(nMatrix); 

setMatrixUniforms();

if (line_switch||use_line)
	indices = lindices

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
	case 15:texture2use = sampleTexture15;
	break
}
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, vertexIndexBuffer);
gl.activeTexture(gl.TEXTURE0);   // set texture unit 0 to use 
gl.bindTexture(gl.TEXTURE_2D, texture2use);    // bind the texture object to the texture unit 
gl.uniform1i(shaderProgram.textureUniform, 0);

gl.activeTexture(gl.TEXTURE1);   // set texture unit 1 to use 
gl.uniform1i(shaderProgram.cube_map_textureUniform, 1);   // pass the texture unit to the shader


if (line_switch||use_line)
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


function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}


    function webGLStart() {  // First Call
        var canvas = document.getElementById("project-canvas");
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

	shaderProgram.textureUniform = gl.getUniformLocation(shaderProgram, "myTexture");
	shaderProgram.use_textureUniform = gl.getUniformLocation(shaderProgram, "use_texture");
	initTextures();
	alert('loaded the images');

	mat4.translate(cMatrix1,[0,0,-.1])
	mat4.rotate(rMatrix1,3.14/1.8,[0,0,1])
	c = 0
	while(1){
	c+=1
	sleep(1).then(() => {
	continous()
	drawScene()
	})
		if(c==10000)
		break
	}
    }

var check_flag = 0

function check_rise(){
	  if (intersection(ball_x,ball_y,trap_list[0][1][0],trap_list[0][1][1],trap_list[0][0]) || intersection(ball_x,ball_y,trap_list[1][1][0],trap_list[1][1][1],trap_list[1][0]))
		check_flag =1
	}


    function continous(){
	if(check_flag){
		ball_z-=0.005
		if (ball_z<-.4)
		alert('game over')
		mat4.identity(cMatrixb)
	  mat4.translate(cMatrixb,[ball_x,ball_y,ball_z])
	}
	else if (ball_z < .2){ ball_z+=0.005;
	  mat4.identity(cMatrixb)
	  mat4.translate(cMatrixb,[ball_x,ball_y,ball_z])
	}
for(var i=0;i<object_list.length;i++){
		object_list[i][1][2]+=.001
	}

check();
add();
remove();
check_rise();
 }


function check(){
	for (var i=0;i<object_list.length;i++){
		if(object_list[i][1][2] >= 0.15){
			if (intersection(ball_x,ball_y,object_list[i][1][0],object_list[i][1][1],object_list[i][0]))
				alert('game over')
		}
	}
}

function intersection(bx,by,ox,oy,size){
return !( (bx+0.03 < ox-0.035*size[0]) || (bx-0.03 > ox+0.035*size[0]) ||  (by+0.03 < oy-0.035*size[1]) || (by-0.03 > oy+0.035*size[1]))


}

function add(){
	while(object_list.length < max_objects){		
		object_list.push([[Math.random()+1,Math.random()+1,1],[rand(-.5,1.5),rand(.05,.4),rand(-.4,-.2)],1])
		object_list.push([[Math.random()+1,Math.random()+1,1],[rand(0,1.2),rand(.05,.4)+1.55,rand(-.4,-.2)],1])
	}
	while(trap_list.length < 1){
		trap_list.push([[3,8,1],[rand(2,2.25),rand(0,2),rand(-.4,-.2)],1])
		trap_list.push([[3,8,1],[rand(-.6,-.1),rand(0,2),rand(-.4,-.2)],1])
	}
}

function remove(){
	for (var i=0;i<object_list.length;i++){
		if (object_list[i][1][2] > 0.2){
			object_list = object_list.splice(0,i).concat(object_list.splice(i+1,object_list.length))
			remove()
		}
	}	
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
