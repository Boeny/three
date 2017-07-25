objects.light = {
	Start: function(){
		this.mesh = new THREE.HemisphereLight( 0xeeeeff, 0x777788, 0.75 );
		this.mesh.position.set( 0.5, 1, 0.75 );
	}
};