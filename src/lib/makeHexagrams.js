import {
  makeLineWithFourCoins,
  makeFutureHexagram,
  getChanges,
  sequenceToFuxi
} from "../lib/iching-helpers";

export const makeHexagrams = randomNumbers => {
  let nowSequence = [];

  // Create the first (now) hexagram
  for (var i = 0; i < 6; i++) {
    var arr = randomNumbers.slice(i * 4, i * 4 + 4); // pick next 4 numbers from our set of 24
    nowSequence[i] = makeLineWithFourCoins(arr);
  }  
  // create the second hexagram
  const futureSequence = makeFutureHexagram(nowSequence);

  return { 
    nowHexagram: sequenceToFuxi(nowSequence), 
    futureHexagram: sequenceToFuxi(futureSequence), 
    changes: getChanges(nowSequence, futureSequence) 
  };
};
