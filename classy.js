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
			returnFunction[methodGroups[i][1].name] = methodGroups[i][1];
		}
		
		var toReturn = {};
		
		for (var i = 0; i < methodGroups.length; i++) {
			//TODO: Do checking for invalid accessor modifiers here
			if (methodGroups[i][0] == "public") {
				toReturn[methodGroups[i][1].name] = returnFunction[methodGroups[i][1].name];
			}
		}
		toReturn.that = returnFunction;
		return toReturn;
	}();
};

var acTest = [
	// "private", num,
	"private", function test() {
		console.log('test begin called');
	},
	"public", function Test() {
		console.log('Test begin called');
		console.log(this.that);
		this.that.test();
	},
	"public", function GetNum() {
		return num;
	},
	"public", function SetNum(numToSet) {
		num = numToSet;
	}
].accessify();
