import { generateMap } from './src/diamond_square.js';

const SIZE = 1024;
const canvas = document.getElementById('canvas');
canvas.width = canvas.height = SIZE;

const diamondSquare = () => {
	const roughness = 8;
	const gamma = 500;
	const context = canvas.getContext('2d');
	const imageData = context.getImageData(0, 0, SIZE, SIZE);

	const map = generateMap(SIZE, roughness);

	for (let x = 0; x <= SIZE; x++) {
		for (let y = 0; y <= SIZE; y++) {
			const nr = map[x][y] < 0.5 ? map[x][y] : 1 - map[x][y];
			let ng = map[x][y] - 0.3;
			if (map[x][y] < 0.3 || map[x][y] >= 0.8) {
				ng = map[x][y] < 0.3 ? 0.3 - map[x][y] : 1.3 - map[x][y];
			}
			const nb = map[x][y] >= 0.5 ? map[x][y] - 0.5 : 0.5 - map[x][y];
			const index = (y * SIZE + x) * 4;
			imageData.data[index + 0] = nr * gamma;
			imageData.data[index + 1] = ng * gamma;
			imageData.data[index + 2] = nb * gamma;
			imageData.data[index + 3] = 255;
		}
	}

	context.putImageData(imageData, 0, 0);
};

diamondSquare();

window.onclick = () => {
	diamondSquare();
};
