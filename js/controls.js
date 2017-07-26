window.controls = {
	enabled: false,
	
	SPACE: 32,
	UP: 38,
	DOWN: 40,
	LEFT: 37,
	RIGHT: 39,
	W: 87,
	A: 65,
	S: 83,
	D: 68,
	
	handlers: {
		keydown: 'onKeyDown',
		keyup: 'onKeyUp',
		mousemove: 'onMouseMove',
		click: 'onClick',
	},
	
	Start: function(camera, renderer){
		for (let i in objects){
			let o = objects[i];
			
			for (let eventName in this.handlers){
				let handlerName = this.handlers[eventName];
				
				if (o[handlerName]){
					document.addEventListener(eventName, (e) => {
						if (!this.enabled) return;
						return this.eventHandler(e, o, handlerName);
					}, false);
				}
			}
		}
		
		window.addEventListener('resize', () => {
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
			renderer.setSize(window.innerWidth, window.innerHeight);
		}, false);
		
		// Hook pointer lock state change events
		document.addEventListener('pointerlockchange', (e) => this.lockPointerOnChange(e), false);
		document.addEventListener('mozpointerlockchange', (e) => this.lockPointerOnChange(e), false);
		document.addEventListener('webkitpointerlockchange', (e) => this.lockPointerOnChange(e), false);
		
		document.addEventListener('pointerlockerror', (e) => this.lockPointerOnError(e), false);
		document.addEventListener('mozpointerlockerror', (e) => this.lockPointerOnError(e), false);
		document.addEventListener('webkitpointerlockerror', (e) => this.lockPointerOnError(e), false);
	},
	
	eventHandler: function(e, obj, handlerName){
		switch (handlerName){
			case 'onKeyDown':
			case 'onKeyUp':
				return obj[handlerName](e.keyCode);
			
			case 'onMouseMove':
				return obj[handlerName](
					e.movementX || e.mozMovementX || e.webkitMovementX || 0,
					e.movementY || e.mozMovementY || e.webkitMovementY || 0
				);
		}
	},
	
	lockPointerOnError: function(){},
	lockPointerOnChange: function(){},
};