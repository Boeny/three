objects.cones = {
	mesh: [],
	
	Start: function(){
		var geometry = new THREE.CylinderGeometry(0, 10, 30, 4, 1);
		var material =  new THREE.MeshPhongMaterial({color:0xffffff, shading: THREE.FlatShading});
		
		for (var i = 0; i < 500; i ++) {
			let mesh = new THREE.Mesh( geometry, material );
			mesh.position.x = ( Math.random() - 0.5 ) * 1000;
			mesh.position.y = ( Math.random() - 0.5 ) * 1000;
			mesh.position.z = ( Math.random() - 0.5 ) * 1000;
			mesh.updateMatrix();
			mesh.matrixAutoUpdate = false;
			
			this.mesh.push(mesh);
		}
	},
};