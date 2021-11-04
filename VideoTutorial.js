module.exports = class VideoTutorial {
	constructor(title, imageURL, videoURL, description) {
		this.id = randomNumber(title);
		this.title = title;
		this.imageURL = imageURL;
		this.videoURL = videoURL;
		this.description = description;
	}
};
function randomNumber(string) {
	let sum = 0;
	for (let char of string) {
		sum += char.charCodeAt();
	}
	sum += parseInt(Math.random() * string.length * 521200000);
	return sum;
}
