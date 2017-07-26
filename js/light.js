objects.light = {
	mesh: [],
	
	Start: function(){
		//this.mesh = new THREE.HemisphereLight( 0xeeeeff, 0x777788, 0.75 );
		//this.mesh.position.set( 0.5, 1, 0.75 );
		
		let light = new THREE.DirectionalLight( 0xffffff );
		light.position.set( 1, 1, 1 );
		this.mesh.push(light);
		
		light = new THREE.DirectionalLight( 0x002288 );
		light.position.set( -1, -1, -1 );
		this.mesh.push(light);
		
		this.mesh.push( new THREE.AmbientLight( 0x222222 ) );
	}
};