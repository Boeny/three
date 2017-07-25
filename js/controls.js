var blocker = document.getElementById( 'blocker' );
var instructions = document.getElementById( 'instructions' );
var havePointerLock = 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document;

if ( havePointerLock ) {
	var element = document.body;
	
	var pointerlockchange = function ( event ) {
		if ( document.pointerLockElement === element || document.mozPointerLockElement === element || document.webkitPointerLockElement === element ) {
			controlsEnabled = true;
			controls.enabled = true;
			
			blocker.style.display = 'none';
		} else {
			controls.enabled = false;
			
			blocker.style.display = '-webkit-box';
			blocker.style.display = '-moz-box';
			blocker.style.display = 'box';
			
			instructions.style.display = '';
		}
	};
	
	var pointerlockerror = function ( event ) {
		instructions.style.display = '';
	};
	
	// Hook pointer lock state change events
	document.addEventListener( 'pointerlockchange', pointerlockchange, false );
	document.addEventListener( 'mozpointerlockchange', pointerlockchange, false );
	document.addEventListener( 'webkitpointerlockchange', pointerlockchange, false );
	
	document.addEventListener( 'pointerlockerror', pointerlockerror, false );
	document.addEventListener( 'mozpointerlockerror', pointerlockerror, false );
	document.addEventListener( 'webkitpointerlockerror', pointerlockerror, false );
	
	instructions.addEventListener( 'click', function ( event ) {
		instructions.style.display = 'none';
		
		// Ask the browser to lock the pointer
		element.requestPointerLock = element.requestPointerLock || element.mozRequestPointerLock || element.webkitRequestPointerLock;
		element.requestPointerLock();
	}, false );
} else {
	instructions.innerHTML = 'Your browser doesn\'t seem to support Pointer Lock API';
}

objects.controls = {
	enabled: false,
	PI_2: Math.PI / 2,
	moveForward: false,
	moveBackward: false,
	moveLeft: false,
	moveRight: false,
	canJump: false,
	prevTime: performance.now(),
	velocity: new THREE.Vector3(),
	
	Start: function(){
		
		
		document.addEventListener( 'mousemove', this.onMouseMove.bind(this), false );
		document.addEventListener( 'keydown', this.onKeyDown.bind(this), false );
		document.addEventListener( 'keyup', this.onKeyUp.bind(this), false );
		
		// assumes the camera itself is not rotated
		this.direction = new THREE.Vector3( 0, 0, - 1 );
		this.rotation = new THREE.Euler( 0, 0, 0, "YXZ" );
		this.raycaster = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3( 0, - 1, 0 ), 0, 10 );
		
		window.addEventListener('resize', () => {
			this.camera.aspect = window.innerWidth / window.innerHeight;
			this.camera.updateProjectionMatrix();
			renderer.setSize( window.innerWidth, window.innerHeight );
		}, false);
	},
	
	Update: function() {
		if (!this.enabled) return;
		
		this.raycaster.ray.origin.copy(this.mesh.position);
		this.raycaster.ray.origin.y -= 10;
		
		var time = performance.now();
		var delta = ( time - prevTime ) / 1000;
		
		this.velocity.x -= this.velocity.x * 10.0 * delta;
		this.velocity.z -= this.velocity.z * 10.0 * delta;
		this.velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass
		
		if ( this.moveForward ) this.velocity.z -= 400.0 * delta;
		if ( this.moveBackward ) this.velocity.z += 400.0 * delta;
		if ( this.moveLeft ) this.velocity.x -= 400.0 * delta;
		if ( this.moveRight ) this.velocity.x += 400.0 * delta;
		
		if (this.raycaster.intersectObjects(objects.cubes.mesh).length > 0)
		{
			this.velocity.y = Math.max(0, this.velocity.y);
			this.canJump = true;
		}
		
		this.mesh.translateX( this.velocity.x * delta );
		this.mesh.translateY( this.velocity.y * delta );
		this.mesh.translateZ( this.velocity.z * delta );
		
		if (this.mesh.position.y < 10) {
			this.velocity.y = 0;
			this.mesh.position.y = 10;
			this.canJump = true;
		}
		
		this.prevTime = time;
	},
	
	getDirection: function(v){
		this.rotation.set( pitchObject.rotation.x, this.mesh.rotation.y, 0 );
		v.copy(this.direction).applyEuler(this.rotation);
		return v;
	},
	
	dispose: function(){
		document.removeEventListener('mousemove', this.onMouseMove.bind(this), false);
	},
	
	onMouseMove: function(e){
		if (this.enabled === false) return;
		
		this.movementX = e.movementX || e.mozMovementX || e.webkitMovementX || 0;
		this.movementY = e.movementY || e.mozMovementY || e.webkitMovementY || 0;
		
		this.mesh.rotation.y -= this.movementX * 0.002;
		this.pitchRot.x -= this.movementY * 0.002;
		
		this.pitchRot.x = Math.max( - this.PI_2, Math.min( this.PI_2, pitchRot.x ) );
	},
	
	onKeyDown: function (e) {
		switch (e.keyCode) {
			case 38: // up
			case 87: // w
				this.moveForward = true;
				break;
			
			case 37: // left
			case 65: // a
				this.moveLeft = true; break;
			
			case 40: // down
			case 83: // s
				this.moveBackward = true;
				break;
			
			case 39: // right
			case 68: // d
				this.moveRight = true;
				break;
			
			case 32: // space
				if (this.canJump === true ) this.velocity.y += 350;
				this.canJump = false;
				break;
		}
	},
	
	onKeyUp: function (e) {
		switch(e.keyCode) {
			case 38: // up
			case 87: // w
				this.moveForward = false;
				break;
			
			case 37: // left
			case 65: // a
				this.moveLeft = false;
				break;
			
			case 40: // down
			case 83: // s
				this.moveBackward = false;
				break;
			
			case 39: // right
			case 68: // d
				this.moveRight = false;
				break;
		}
	},
}