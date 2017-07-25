let objects = {};

function Start(s, c, r){
	for (var i in objects){
		let o = objects[i];
		o.scene = s;
		o.camera = c;
		o.renderer = r;
		
		o.Start();
		
		if (o.mesh instanceof Array){
			for (var j = 0; j < o.mesh.length; j++){
				s.add(o.mesh[j]);
			}
		}
		else{
			s.add(o.mesh);
		}
	}
}

function Update(){
	for (var i in objects){
		objects[i].Update && objects[i].Update();
	}
}