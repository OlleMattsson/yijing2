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
