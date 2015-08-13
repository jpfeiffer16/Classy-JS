var moduleTest = function() {
	var moduleNum = 1;
	function moduleTest() {
		console.log('moduleTest begin called');
	};
	function ModuleTest() {
		console.log('ModuleTest begin called');
	};
	function ModuleGetNum() {
		return moduleNum;
	};
	function ModuleSetNum(numberToSet) {
		moduleNum = numberToSet;
	};
	return {
		Test: ModuleTest, GetNum: ModuleGetNum, SetNum: ModuleSetNum
	}
}();



Array.prototype.accessify = function() {
	var methodGroups = [];
	for(var i = 0; i < this.length / 2; i++) {
		var temp = [];
		temp.push(this[i * 2]);
		temp.push(this[i * 2 + 1]);
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
};

var acTest = [
	"private", { num: 2, hi: 'Test' },
	"private", function test() {
		console.log('test begin called');
	},
	"public", function Test() {
		console.log('Test begin called');
		that.test();
	},
	"public", function GetNum() {
		return that.num;
	},
	"public", function SetNum(numToSet) {
		that.num = numToSet;
	},
	"public", function GetTest() {
		return that.hi;
	}
].accessify();

// var thisModuleTest = function() {
// 	var that = this;
// 	this.test = function() {
// 		console.log('test being called');
// 	};
// 	this.Test = function() {
// 		console.log('Test being called');
// 		that.test();
// 	};
// 	return {
// 		Test: this.Test
// 	}
// }();
