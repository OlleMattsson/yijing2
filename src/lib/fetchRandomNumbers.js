import mockedResponse from "../static/mockedQRNGResponse"

export const fetchRandomNumbers = async (mocked = false) => {
    const howMany = 24
  
    if (mocked) {
      return mockedResponse;
    } 
  
    return await (await fetch(
      "https://qrng.anu.edu.au/API/jsonI.php?length=" + howMany + "&type=uint8"
    )).json();
  };