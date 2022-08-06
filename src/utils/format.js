//字符串dom化
export function parseDom(arg) {
	let objELe = document.createElement("div");
	objELe.innerHTML = arg;
	return [...objELe.children];
}
