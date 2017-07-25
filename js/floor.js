objects.floor = {
	Start: function(){
		let geometry = new THREE.PlaneGeometry(2000, 2000, 100, 100);
		geometry.rotateX(-Math.PI/2);
		
		for (var i = 0; i < geometry.vertices.length; i ++) {
			let vertex = geometry.vertices[i];
			vertex.x += Math.random() * 20 - 10;
			vertex.y += Math.random() * 2;
			vertex.z += Math.random() * 20 - 10;
		}
		
		for (var i = 0; i < geometry.faces.length; i ++) {
			let face = geometry.faces[i];
			face.vertexColors[ 0 ] = new THREE.Color().setHSL( Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );
			face.vertexColors[ 1 ] = new THREE.Color().setHSL( Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );
			face.vertexColors[ 2 ] = new THREE.Color().setHSL( Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );
		}
		
		let material = new THREE.MeshBasicMaterial({vertexColors: THREE.VertexColors});
		this.mesh = new THREE.Mesh(geometry, material);
	}
};