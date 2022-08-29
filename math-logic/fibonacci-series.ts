class FibonacciSeries {
	calculateFibonacciValue(number: number): number {
		let s = 0;
		if (number === 0) return s;
		if (number === 1) {
			s += 1;
			return s;
		}
		return this.calculateFibonacciValue(number - 1) + this.calculateFibonacciValue(number - 2);
	}
}

export = new FibonacciSeries();

// calculateFibonacciValueCache() {
// 	const cache: { [key: number]: number } = {};

// 	return function trueFib(number: number) {
// 		if (number < 2) return number;

// 		if (cache[number]) return cache[number];
// 		else {
// 			cache[number] = trueFib(number - 1) + trueFib(number - 2);
// 			return cache[number];
// 		}
// 	};
// }
