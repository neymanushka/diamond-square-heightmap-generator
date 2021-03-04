const norm = (value) => Math.min(1, Math.max(0, value));

export function generateMap(size, roughness) {
	const map = Array.from(Array(size + 1), () => Array(size + 1).fill(0));
	const tl = (map[0][0] = Math.random());
	const bl = (map[0][size] = Math.random());
	const tr = (map[size][0] = Math.random());
	const br = (map[size][size] = Math.random());
	const center = (map[size / 2][size / 2] = norm(tl + bl + tr + br / 4));

	map[size / 2][size] = bl + br + center + center / 4;
	map[size / 2][0] = tl + tr + center + center / 4;
	map[size][size / 2] = tr + br + center + center / 4;
	map[0][size / 2] = tl + bl + center + center / 4;

	const displace = (num) => {
		const max = (num / (size + size)) * roughness;
		return (Math.random(1.0) - 0.5) * max;
	};

	let dimension = size;
	while (dimension > 2) {
		const newDimension = dimension / 2;

		for (let i = newDimension; i <= size; i += newDimension) {
			for (let j = newDimension; j <= size; j += newDimension) {
				const x = i - newDimension / 2;
				const y = j - newDimension / 2;

				const topLeft = map[i - newDimension][j - newDimension];
				const topRight = map[i][j - newDimension];
				const bottomLeft = map[i - newDimension][j];
				const bottomRight = map[i][j];

				const center = (map[x][y] = norm(
					(topLeft + topRight + bottomLeft + bottomRight) / 4 + displace(dimension)
				));

				let top = (topLeft + topRight + center) / 3;
				if (j - newDimension * 2 + newDimension / 2 > 0) {
					top = (topLeft + topRight + center + map[x][j - dimension + newDimension / 2]) / 4;
				}
				map[x][j - newDimension] = norm(top + displace(dimension));

				let bottom = (bottomLeft + bottomRight + center) / 3;
				if (j + newDimension / 2 < size) {
					bottom = (bottomLeft + bottomRight + center + map[x][j + newDimension / 2]) / 4;
				}
				map[x][j] = norm(bottom + displace(dimension));

				let right = (topRight + bottomRight + center) / 3;
				if (i + newDimension / 2 < size) {
					right = (topRight + bottomRight + center + map[i + newDimension / 2][y]) / 4;
				}

				map[i][y] = norm(right + displace(dimension));

				let left = (topLeft + bottomLeft + center) / 3;
				if (i - newDimension * 2 + newDimension / 2 > 0) {
					left = (topLeft + bottomLeft + center + map[i - dimension + newDimension / 2][y]) / 4;
				}
				map[i - newDimension][y] = norm(left + displace(dimension));
			}
		}
		dimension = newDimension;
	}

	return map;
}
