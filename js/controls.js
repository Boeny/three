window.controls = {
	enabled: false,
	enableKeys: true,
	
	keys: {
		SPACE: 32,
		UP: 38,
		DOWN: 40,
		LEFT: 37,
		RIGHT: 39,
		W: 87,
		A: 65,
		S: 83,
		D: 68,
	},
	mouse: {
		LEFT: 0,
		WHEEL: 1,
		RIGHT: 2
	},
	
	handlers: {
		keydown: 'onKeyDown',
		keyup: 'onKeyUp',
		mousemove: 'onMouseMove',
		click: 'onClick',
		mousedown: 'onMouseDown',
		mouseup: 'onMouseUp',
		contextmenu: 'onContextMenu',
		wheel: 'onMouseWheel',
		touchstart: 'onTouchStart',
		touchend: 'onTouchEnd',
		touchmove: 'onTouchMove',
		
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
				if (!this.enableKeys) return;
				return obj[handlerName](e.keyCode);
			
			case 'onMouseMove':
				return obj[handlerName](
					new THREE.Vector2(e.clientX, e.clientY),
					e.movementX || e.mozMovementX || e.webkitMovementX || 0,
					e.movementY || e.mozMovementY || e.webkitMovementY || 0
				);
			
			case 'onMouseWheel':
				obj[handlerName](e.deltaY);
				return false;
			
			case 'onMouseDown':
				obj[handlerName](e.button, e.clientX, e.clientY);
				return false;
			
			case 'onContextMenu':
				e.preventDefault();
				return obj[handlerName]();
			
			case 'onTouchStart':
			case 'onTouchMove':
			case 'onTouchEnd':
				let points = new Array(e.touches.length);
				
				for (var i = 0; i < points.length; i++){
					points[i] = new THREE.Vector2(e.touches[i].pageX, e.touches[i].pageY);
				}
				
				obj[handlerName](points);
				return false;
			
			default:
				return obj[handlerName]();
		}
	},
	
	lockPointerOnError: function(){},
	lockPointerOnChange: function(){},
};