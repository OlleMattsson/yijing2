import {
    makeLineWithFourCoins,
    makeFutureHexagram,
    convertToBinarySequence,
    getChanges,
    binaryToFuxi
  } from "../lib/iching-helpers";
  
export const makeHexagrams = (randomNumbers) => {
    let nowSequence = [];
  
    // Create the first (current) hexagram
    for (var i = 0; i < 6; i++) {
      var arr = randomNumbers.slice(i * 4, i * 4 + 4); // pick next 4 numbers from our set of 24
      nowSequence[i] = makeLineWithFourCoins(arr);
    }
  
    // create the second hexagram
    const futureSequence = makeFutureHexagram(nowSequence);
  
    // convert the lines to a binary sequence of broken and unbroken lines
    const nowSequenceBinary = convertToBinarySequence(nowSequence);
    const futureSequenceBinary = convertToBinarySequence(futureSequence);
  
    // get fuxi from intermediary "binary" sequence
    const nowSequenceFuxi = binaryToFuxi(nowSequenceBinary) // parseInt(nowSequenceBinary.join(""), 2)
    const futureSequenceFuxi = binaryToFuxi(futureSequenceBinary) //parseInt(futureSequenceBinary.join(""), 2);
  
    // create a representation of the changes
    const changes = getChanges(nowSequenceBinary, futureSequenceBinary);
  
    return {nowSequenceFuxi, futureSequenceFuxi, changes}
  }