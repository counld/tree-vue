//处理播放事件
export function playTopic(msg) {
		let speakMsg = new SpeechSynthesisUtterance(msg);
		speakMsg.rate = 1; // 语速
		speakMsg.pitch = 1.5; // 音量
		window.speechSynthesis.speak(speakMsg);
		return speakMsg;
}