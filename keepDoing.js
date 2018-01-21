const $q = require('kchoo-q');

module.exports = function keepDoing(fn, ...initialArgs) {
	const outerDeferred = $q.defer();
	let innerDeferred = $q.defer();

	function next(...val) {
		innerDeferred.promise.
			then(function () {
				fn(...val, next, stop);
			}).
			catch(outerDeferred.reject.bind(outerDeferred));

		innerDeferred.resolve();

		innerDeferred = $q.defer();
	}

	function stop(val) {
		outerDeferred.resolve(val);
	}

	try {
		fn(
			...initialArgs,
			next,
			stop
		);
	} catch (e) {
		outerDeferred.reject(e);
	}

	return outerDeferred.promise;
};
