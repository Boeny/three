objects.player = {
	mesh: new THREE.Object3D(),
	direction: new THREE.Vector3( 0, 0, - 1 ),
	rotation: new THREE.Euler( 0, 0, 0, "YXZ" ),
	
	PI_2: Math.PI / 2,
	moveForward: false,
	moveBackward: false,
	moveLeft: false,
	moveRight: false,
	canJump: false,
	prevTime: performance.now(),
	velocity: new THREE.Vector3(),
	
	Start: function(){
		//var pitchObject = Physijs.BoxMesh( new THREE.CubeGeometry( 5, 5, 5 ), new THREE.MeshBasicMaterial({ color: 0x888888 }) );
		var pitchObject = new THREE.Object3D();
		
		pitchObject.add(this.camera);
		this.pitchRot = pitchObject.rotation;
		
		this.mesh.position.y = 10;
		this.mesh.add(pitchObject);
		
		// assumes the camera itself is not rotated
		//this.raycaster = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3( 0, - 1, 0 ), 0, 10 );
	},
	
	Update: function(){
		if (!window.controls || !controls.enabled) return;
		
		//this.raycaster.ray.origin.copy(this.mesh.position);
		//this.raycaster.ray.origin.y -= 10;
		
		var time = performance.now();
		var delta = ( time - this.prevTime ) / 1000;
		
		this.velocity.x -= this.velocity.x * 10.0 * delta;
		this.velocity.z -= this.velocity.z * 10.0 * delta;
		//this.velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass
		
		if (this.moveForward)	this.velocity.z -= 400.0 * delta;
		if (this.moveBackward)	this.velocity.z += 400.0 * delta;
		if (this.moveLeft)		this.velocity.x -= 400.0 * delta;
		if (this.moveRight)		this.velocity.x += 400.0 * delta;
		
		//if (this.intersectsWith && this.raycaster.intersectObjects(this.intersectsWith).length > 0){
		//	this.velocity.y = Math.max(0, this.velocity.y);
		//	this.canJump = true;
		//}
		
		this.mesh.translateX( this.velocity.x * delta );
		//this.mesh.translateY( this.velocity.y * delta );
		this.mesh.translateZ( this.velocity.z * delta );
		
		this.prevTime = time;
	},
	
	onMouseMove: function(p, dx, dy){
		this.mesh.rotation.y -= dx * 0.002;
		this.pitchRot.x = Math.max( -this.PI_2, Math.min(this.PI_2, this.pitchRot.x - dy * 0.002) );
	},
	
	onKeyDown: function (key) {
		switch (key) {
			case controls.keys.UP:
			case controls.keys.W:
				this.moveForward = true;
				break;
			
			case controls.keys.LEFT:
			case controls.keys.A:
				this.moveLeft = true;
				break;
			
			case controls.keys.DOWN:
			case controls.keys.S:
				this.moveBackward = true;
				break;
			
			case controls.keys.RIGHT:
			case controls.keys.D:
				this.moveRight = true;
				break;
			
			case controls.keys.SPACE:
				if (this.canJump) this.velocity.y += 300;
				this.canJump = false;
				break;
		}
	},
	
	onKeyUp: function (key) {
		switch(key) {
			case controls.keys.UP:
			case controls.keys.W:
				this.moveForward = false;
				break;
			
			case controls.keys.LEFT:
			case controls.keys.A:
				this.moveLeft = false;
				break;
			
			case controls.keys.DOWN:
			case controls.keys.S:
				this.moveBackward = false;
				break;
			
			case controls.keys.RIGHT:
			case controls.keys.D:
				this.moveRight = false;
				break;
		}
	},
};