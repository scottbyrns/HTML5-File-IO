com.scottbyrns.HTML5.IO.File.DragDrop({
	setup: function () {},
	constructor: function (targetDomElemen) {
		
		this.callbacks = [];
		
	    var dropZone = targetDomElemen;
	    dropZone.addEventListener('dragover', this.handleDragOver.bind(this), false);
	    dropZone.addEventListener('drop', this.handleFileSelect.bind(this), false);
		
	},
	prototype: {
		handleFileSelect: function (event) {
	        event.stopPropagation();
	        event.preventDefault();

	        var files = event.dataTransfer.files; // FileList object.

	        // files is a FileList of File objects. List some properties.
	        var output = [];
	        for (var i = 0, f; f = files[i]; i++) {
				
				var reader = new FileReader(files[i]);
				
				reader.onload = (function (index) {
					return function (progressEvent) {
						// console.log(arguments);
						// console.log(progressEvent.target.result);
						// this.sendMessage()
						for (var c = 0, len = this.callbacks.length; c < len; c += 1) {
							try {
								this.callbacks[c]({file:files[index], data:progressEvent.target.result});
							}
							catch (e) {
								console.error(e);
							}
						}
					}.bind(this)
				}.bind(this)(i));
				
				reader.readAsText(files[i]);
	            // output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
	            //     f.size, ' bytes, last modified: ',
	            //     f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a',
	            //     '</li>');
	        }
	        // document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';
		},
		
	    handleDragOver: function (evt) {
	        evt.stopPropagation();
	        evt.preventDefault();
	        evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
	    },
		
		fileLoadSuccess: function (progressEvent) {
			console.log(arguments);
			console.log(progressEvent.target.result);
		},
		
		registerCallback: function (callback) {
			this.callbacks.push(callback);
		}
	}
});
