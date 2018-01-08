module.exports = function keepDoing(fn, ...args) {
	return new Promise(function (outerResolve, outerReject) {
		(
			new Promise(function (innerResolve, innerReject) {
				fn(...args, innerResolve, innerReject);
			})
		).
			then(
				function (...updatedArgs) {
					keepDoing(fn, updatedArgs);
				},
				// an inner rejection means we're done looping, so resolve the outer promise
				// with whatever the output is
				function (...output) {
					outerResolve(...output);
				}
			);
			// exceptions from fn will bubble up, and should be caught by whatever called keepDoing
	});
};