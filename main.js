const WIDTH = 800, HEIGHT = 600;
const gameCanvas = document.createElement('canvas');
gameCanvas.width = 800;
gameCanvas.height = 600;
const ctx = gameCanvas.getContext('2d');

/** 
 * @namespace
 * @property {GameScene} currentScene
 */
const Scenes = {
	currentScene : null,
	getCurrentScene() {
		return this.currentScene;
	},
	setCurrentScene(newScene) {
		this.currentScene = newScene;
		this.currentScene.init();
	}
}

function start() {
	if (Scenes.currentScene === null) return;
	Scenes.currentScene.update();
	Scenes.currentScene.draw(ctx);
	window.requestAnimationFrame(start);
}

Scenes.setCurrentScene(new GameScene());
start();

document.body.appendChild(gameCanvas);
