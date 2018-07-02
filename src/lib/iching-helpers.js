import globals from "../globals";

export const fuxiToBinary = fuxi => {
  // Number => Sequence<Array[Bool]>
  // eg. 3 -> [0,0,0,0,1,1]
  var bin = "",
    arr = [],
    length = 6;

  while (length--) {
    bin += (fuxi >> length) & 1;
  }

  arr = bin.split("");
  return arr;
};

export const binaryToKingWen = source => {
  // source: Array[<Bool>]
  let kingWenSequence = globals.kingWenSequence;
  if (source && source.length === 6) {
    return kingWenSequence[binaryToFuxi(source)];
  }
};

export const binaryToFuxi = source => {
  return parseInt(
    source
      .map(broken => {
        return broken ? 0 : 1;
      })
      .join(""),
    2
  );
};

export const makeLineWithFourCoins = numbersArray => {
  var normalized = [],
    decimal;

  // normalize values 0-255 to 0 (tails) or 1 (heads)
  for (var i = 0, l = numbersArray.length; i < l; i++) {
    normalized[i] = Math.round(numbersArray[i] / 255);
  }

  // convert our binary number to a decimal
  decimal = parseInt(normalized.join(""), 2);

  return decimal;
};

export const makeFutureHexagram = nowSequence => {
  const futureSequence = [];
  for (var i = nowSequence.length; i >= 0; i--) {
    switch (nowSequence[i]) {
      // --x--
      case 0:
        futureSequence[i] = 4; // becomes yang
        break;

      // --0--
      case 1:
      case 2:
      case 3:
        futureSequence[i] = 9; // becomes yin
        break;

      default:
        futureSequence[i] = nowSequence[i];
        break;

      /*
      case 4:	case 5: case 6:	case 7:	case 8: case 9:	case 10: case 11: case 12: case 13: case 14: case 15: 
      no changes
      */
    }
  }
  return futureSequence;
};

export const convertToBinarySequence = source => {
  let res = [];
  for (var i = 0, l = source.length; i < l; i++) {
    switch (source[i]) {
      // -- --
      case 0:
      case 9:
      case 10:
      case 11:
      case 12:
      case 13:
      case 14:
      case 15:
        res[i] = 0;
        break;

      // -----
      case 4:
      case 5:
      case 6:
      case 7:
      case 8:
      case 1:
      case 2:
      case 3:
        res[i] = 1;
        break;
      default:
        break;
    }
  }
  return res;
};

export const getChanges = (now, future) => {
  return now.map((now, i) => {
    if (now === future[i]) {
      return false;
    } else {
      return true;
    }
  });
};
