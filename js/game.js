(function(){
	var instructions = document.getElementById('instructions');
	
	if ('pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document) {
		let blocker = document.getElementById('blocker');
		let body = document.body;
		
		instructions.addEventListener('click', function(){
			instructions.style.display = 'none';
			
			// Ask the browser to lock the pointer
			body.requestPointerLock = body.requestPointerLock || body.mozRequestPointerLock || body.webkitRequestPointerLock;
			body.requestPointerLock();
		}, false);
		
		controls.lockPointerOnError = function(){
			instructions.style.display = '';
		};
		
		controls.lockPointerOnChange = function(){
			this.enabled = document.pointerLockElement === body ||
				document.mozPointerLockElement === body ||
				document.webkitPointerLockElement === body;
			
			if (this.enabled) {
				blocker.style.display = 'none';
			}
			else {
				blocker.style.display = '-webkit-box';
				blocker.style.display = '-moz-box';
				blocker.style.display = 'box';
				
				instructions.style.display = '';
			}
		};
	} else {
		instructions.innerHTML = 'Your browser doesn\'t seem to support Pointer Lock API';
	}
})();

controls.Start(camera, renderer);