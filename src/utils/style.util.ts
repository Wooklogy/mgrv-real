//** 사이즈 단위로 변경*/
export const translatePxValue = (val: string | number | undefined) => {
  if (val === undefined || val === null) return;
  const result = typeof val === "number" ? `${val}px` : val;
  return result;
};
//** 사이즈 weight로 변경*/
export const translateWeightValue = (val: string | number | undefined) => {
  if (val === undefined || val === null) return;
  if (typeof val === "number") {
    return val;
  } else {
    switch (String(val).toLowerCase()) {
      case "thin":
        return 100;
      case "light":
        return 300;
      case "regular":
        return 400;
      case "medium":
        return 500;
      case "bold":
        return 700;
      case "black":
        return 900;
    }
  }
  const result = typeof val === "number" ? `${val}px` : val;
  return result;
};
