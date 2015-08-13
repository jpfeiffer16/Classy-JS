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