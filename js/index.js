let objects = {};
let updates = [];

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
		
		if (o.Update) updates.push(o.Update.bind(o));
	}
}

function Update(){
	for (var i = 0; i < updates.length; i++){
		updates[i]();
	}
}