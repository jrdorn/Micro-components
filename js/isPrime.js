/** Determine if value is prime */

let Prime = (function hideCache() {
  let cache = {};

  function isPrime(num) {
    //return boolean value if primality has already been computed
    if (num in cache) {
      return cache[num];
    } else {
      if (num <= 3) {
        cache[num] = num > 1;
        return num > 1;
      }
      if (num % 2 === 0 || num % 3 === 0) {
        cache[num] = false;
        return false;
      }
      let Sqrt = Math.sqrt(num);
      for (let i = 5; i <= Sqrt; i += 6) {
        if (num % i === 0 || num % (i + 2) == 0) {
          cache[num] = false;
          return false;
        }
      }
      cache[num] = true;
      return true;
    }
  }
  return isPrime;
})();

/** Generate a list of prime factors for a number */

let Factor = (function hideCache() {
  let factors = {};

  return function factorize(num) {
    if (num in factors) {
      return factors[num];
    }
    if (!Prime(num)) {
      let i = Math.floor(Math.sqrt(num));
      while (num % i !== 0) {
        i--;
      }
      return (factors[num] = [...factorize(i), ...factorize(num / i)]);
    }
    return (factors[num] = [num]);
  };
})();

/**
 If you look at factorize(..), it's implemented with recursion, 
 meaning it calls itself repeatedly. 
 
 That again means we may likely see a lot of wasted calls to compute 
 prime factors for the same number. 
 
 So the second part of the exercise is to use the same 
 closure cache technique for factorize(..).
 */
