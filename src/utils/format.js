//字符串dom化
export function parseDom(arg) {
	let objELe = document.createElement("div");
	objELe.innerHTML = arg;
	return [...objELe.children];
}

//获取当前的时间

export function addDay(dayNumber, day) {
	day = day ? day : new Date();
	var ms = dayNumber * (1000 * 60 * 60 * 24);
	var currentTime = new Date(day.getTime() - ms);
	return currentTime;
}
//moment
export const moment = {
	gettime(time) {
		let date = new Date(time);
		let yyyy = date.getFullYear();
		let mm = this.twofix(date.getMonth() + 1);//js的月份是从0开始计算的，要加1
		let dd = this.twofix(date.getDate());
		let h = this.twofix(date.getHours());
		let m = this.twofix(date.getMinutes());
		let s = this.twofix(date.getSeconds());
		console.log(date, yyyy, 'uilbjnk m')
		return `${yyyy}-${mm}-${dd} ${h}:${m}:${s}`;
	},
	//在1位数的前面补上0
	twofix(s) {
		let d = null;
		if (s < 10) {
			d = `0${s}`;
		} else {
			d = s;
		}
		return d;
	}
}

// 随机数函数
function getRandomNum(min, max) {
	// 返回[min, max]之间的随机数
	return Math.floor(Math.random() * (max - min + 1) + min)
}
// 洗牌函数
export function shuffle(array) {
	let newArr = array.slice()  // 不改变原数组，将数组剪切一份给newArr
	for (let i = 0; i < newArr.length; i++) {
		const j = getRandomNum(0, i)
		const temp = newArr[i]
		newArr[i] = newArr[j]
		newArr[j] = temp
	}
	return newArr
}
