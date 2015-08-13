Array.prototype.accessify = function() {
	return Classify(this);
};

var Classify = function(obj) {
	// if (typeof(obj) != 'array') {
	// 	throw 'Classify expects an array not a ' + typeof(obj);
	// };
	var methodGroups = [];
	for(var i = 0; i < obj.length / 2; i++) {
		var temp = [];
		temp.push(obj[i * 2]);
		temp.push(obj[i * 2 + 1]);
		methodGroups.push(temp);
	}
	
	var returnObject = {};
	return function returnFunction() {
		for (var i = 0; i < methodGroups.length; i++) {
			if (typeof(methodGroups[i][1]) == 'function') {
				returnFunction[methodGroups[i][1].name] = methodGroups[i][1];
			} else if (typeof(methodGroups[i][1]) == 'object') {
				for (var property in methodGroups[i][1]) {
					returnFunction[property] = methodGroups[i][1][property];
				};
			}
		}
		
		var toReturn = {};
		
		for (var i = 0; i < methodGroups.length; i++) {
			//TODO: Do checking for invalid accessor modifiers here
			if (methodGroups[i][0] == "public") {
				if (typeof(methodGroups[i][1]) == 'function') {
					toReturn[methodGroups[i][1].name] = returnFunction[methodGroups[i][1].name];
				} else if (typeof(methodGroups[i][1]) == 'object') {
					for (var property in methodGroups[i][1]) {
						toReturn[property] = methodGroups[i][1][property];
					};
				}
			}
		}
		that = returnFunction;
		return toReturn;
	}();
}