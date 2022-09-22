// true： 移动端
// false： pc端

export function isMobile() {
	let userAgentInfo = navigator.userAgent;
	let Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod'];
	let getArr = Agents.filter(i => userAgentInfo.includes(i));
	return getArr.length ? true : false;
}
