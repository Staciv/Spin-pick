export const calculateTextSize = (maxLabelLength) => {
  let commonFontSize = "5rem";

  if (maxLabelLength > 40) commonFontSize = "0.6rem";
  else if (maxLabelLength > 35) commonFontSize = "0.7rem";
  else if (maxLabelLength > 30) commonFontSize = "0.9rem";
  else if (maxLabelLength > 25) commonFontSize = "1rem";
  else if (maxLabelLength > 20) commonFontSize = "1.2rem";
  else if (maxLabelLength > 15) commonFontSize = "1.6rem";
  else if (maxLabelLength > 10) commonFontSize = "2.1rem";
  else if (maxLabelLength > 5) commonFontSize = "3.2rem";

  return commonFontSize;
};
