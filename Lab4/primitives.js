var vertices = []
var indices = []
var lindices = []
var colors = []
var normals = []
var textureCoords = []

/**draw3D function
can draw sphere, cone, cylinder, cube. Any fundamental 3D shape. Just plug-in the correct radius(height) in get_radius*/

function get_radius(shape,i,n,radius){
	switch( shape[0]){
	case 0: {if (i<n/2) y = radius - 2*radius*i/(n-1)
		else y = radius - 2*radius*i/(n-1)
		return Math.sqrt(radius*radius-y*y)}
		break
	case 1: return radius
		break
	case 2: return Math.pow(i/n,shape[1])
		break
	}
}


function draw_area(n,radius,z){
	
	rl = []
	for (var i=0;i<n;i++){
		rl.push([radius*Math.cos(2*3.14*i/n-3.14/4)/10,radius*Math.sin(2*3.14*i/n-3.14/4)/10,z/10-n/20])
	}
	return rl
}

function draw3D(shape,radius,n){
	vertices = []
	indices = []
	lindices = []
	normals = []
	textureCoords = []

	c = 0
	o = draw_area(n,get_radius(shape,0,n,radius),0)
	for (var i = 1;i<n;i++){
		t = draw_area(n,get_radius(shape,i,n,radius),i)
		for (var j = 0;j<n;j++){
			vertices = vertices.concat(o[j],o[(j+1)%n],t[j],t[(j+1)%n])
			jj = j
			ii = i
			textureCoords = textureCoords.concat([jj/(n),(ii-1)/(n),((jj+1))/(n),(ii-1)/(n),jj/(n),(ii)/(n),((jj+1))/(n),(ii)/(n)])
			indices = indices.concat([c,c+1,c+2,c+1,c+2,c+3])
			lindices = lindices.concat([c,c+1,c+1,c+3,c+3,c+2,c+2,c])
			c+=4
		}
		o = t
	}

	i=0;
	while(i<vertices.length){
		if(shape[0]==0){ 
			normals = vertices
				break
		}
		else if (shape[0]==1 || shape[0] ==2){
			//normals = normals.concat([vertices[i],vertices[i+1],0])
			//normals = normals.concat([vertices[i+3],vertices[i+4],0])
			normals = normals.concat([vertices[i]+vertices[i+3],vertices[i+1]+vertices[i+4],0])
			normals = normals.concat([vertices[i]+vertices[i+3],vertices[i+1]+vertices[i+4],0])
			i+=3
			//normals = get_normal(n,radius)
			//	break
		}
		i+=3
	}
}




function square(){  // genrates a square at origin (no z component (0)) with given color
			// Plus added lighting effect
col = [1 ,0,0]


vertices = [
   -5.0,  -5.0, 0,
   -5.0,  5.0,  0,
    5.0,  5.0,  0,
    5.0,  -5.0, 0,
  
];	

colors = []

if (0){
colors = colors.concat(col); colors = colors.concat(sqr[0]*0.7); //lighting effect using different transparency values
colors = colors.concat(col); colors = colors.concat(sqr[1]*.7);
colors = colors.concat(col); colors = colors.concat(sqr[2]*.7);
colors = colors.concat(col); colors = colors.concat(sqr[3]*.7);
}
else{
colors = colors.concat(col); colors = colors.concat(0.5+Math.random());
colors = colors.concat(col); colors = colors.concat(0.5+Math.random());
colors = colors.concat(col); colors = colors.concat(0.5+Math.random());
colors = colors.concat(col); colors = colors.concat(0.5+Math.random());
}
indices = [
    0,  1,  2, 0,  2,  3,
  ];

normals = [0,0,1,0,0,1,0,0,1,0,0,1]

textureCoords = [0.0,0.0,0.0,1.0,1.0,1.0,1.0,0.0]

 }
