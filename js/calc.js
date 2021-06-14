function calculator() {
  let currentTotal = 0;
  let currentVal = "";
  let currentOper = "=";

  return pressKey;

  /******************/

  function pressKey(key) {
    //number key?
    if (/\d/.test(key)) {
      currentVal += key;
      return key;
    }
    //operator key?
    else if (/[+*/-]/.test(key)) {
      //multiple operations in a series?
      if (currentOper !== "=" && currentVal !== "") {
        //implied '=' keypress
        pressKey("=");
      } else if (currentVal !== "") {
        currentTotal = Number(currentVal);
      }
      currentOper = key;
      currentVal = "";
      return key;
    }
    // = key?
    else if (key === "=" && currentOper !== "=") {
      currentTotal = op(currentTotal, currentOper, Number(currentVal));
      currentOper = "=";
      currentVal = "";
      return formatTotal(currentTotal);
    }
    return "";
  }

  function op(val1, oper, val2) {
    let ops = {
      "+": (v1, v2) => v1 + v2,
      "-": (v1, v2) => v1 - v2,
      "*": (v1, v2) => v1 * v2,
      "/": (v1, v2) => v1 / v2,
    };
    return ops[oper](val1, val2);
  }
}

var calc = calculator();
