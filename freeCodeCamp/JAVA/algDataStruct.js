// palindrome check
function palindrome(str) {
    var nonAlph = /[\W_]/g;
    var lowrcStr = str.toLowerCase().replace(nonAlph,'');
    var revStr = lowrcStr.split('').reverse().join('');
    return revStr === lowrcStr;
  }
  
  palindrome("eye");


  // convert Roman Numerals to Int
  function convertToRoman(num) {
    var romVal = {
      M: 1000,
      CM: 900,
      D: 500,
      CD: 400,
      C: 100,
      XC: 90,
      L: 50,
      XL: 40,
      X: 10,
      IX: 9,
      V: 5,
      IV: 4,
      I: 1
    };
    var roman = '';
    for (var i of Object.keys(romVal)) {
      var q = Math.floor(num / romVal[i]);
      num -= q * romVal[i];
      roman += i.repeat(q);
    }
    return roman;
  }
  
  convertToRoman(36);


// CAESARS CIPHER
function rot13(str) {
str = str.toUpperCase();
return str.replace(/[A-Z]/g, ciph);

function ciph(correspondance) {
    const charCode = correspondance.charCodeAt();
    //A = 65, Z = 90
    return String.fromCharCode(
            ((charCode + 13) <= 90) 
            ? charCode + 13                        
            : (charCode + 13) % 90 + 64
           );
    
  }
}


// VALID PHONE NUMBER CHECK
function telephoneCheck(str) {
    var validPhone = /^(1\s|1|)?((\(\d{3}\))|\d{3})(\-|\s)?(\d{3})(\-|\s)?(\d{4})$/.test(str);
    return validPhone;
}
  
telephoneCheck("666-867-5309");


// CASH REGISTER
// return an object with two properties: status and changeDue
function checkCashRegister(price, cash, cid) {
    // calculate difference between the cash given and the price to pay
    var diff = cash - price;
    const ogDiff = diff;
    var objReturn = {
        status: '',
        changeDue: []
        }

    let currArr = [
        ["ONE HUNDRED", 100], 
        ["TWENTY", 20], 
        ["TEN", 10], 
        ["FIVE", 5], 
        ["ONE", 1], 
        ["QUARTER", 0.25],
        ["DIME", 0.1],
        ["NICKEL", 0.05],
        ["PENNY", 0.01]
        ];

    cid.reverse();

    var totalCid = 0
    //  for loop to sum all the money in our drawer
    for (let i = 0; i < cid.length; i++) {
        totalCid += cid[i][1];
    }

    var changeDueRet = [...currArr];
    // for loop iterates through the different currencies of our array currArr
    for (let i = 0; i < currArr.length; i++) {
        // create a variable to store the value of each coin calculated for the changeDue
        let changeDueDue = 0;
        // create a variable to know if there's money available from each currArr
        let bill = cid[i][1] / currArr[i][1]
            bill.toFixed(2);
            while (diff.toFixed(2) >= currArr[i][1] && bill >= 1) {
                diff -= currArr;
                changeDueDue += currArr [i][1];
                bill--;
            }
            if (changeDueDue > 0) {
                if (changeDueDue - Math.floor(changeDueDue) !== 0) {
                    changeDueRet[i][1] = changeDueDue.toFixed(2)
                    changeDueRet[i][1] = parseFloat(changeDueRet[i][1])
                } else {
                    changeDueRet[i][1] = changeDueDue;
                }
            }
    }

    let changeDueRetSum = 0;

        for (let i = 0; i < cid.length; i++) {
            changeDueRetSum += changeDueRet[i][1];
        }
        changeDueRetSum = changeDueRetSum.toFixed(2);

    if (totalCid < ogDiff || changeDueRetSum < ogDiff) {
        objReturn.status = 'INSUFFICIENT_FUNDS';
    } else if (totalCid == ogDiff) {
        objReturn.status = 'CLOSED';
        objReturn.changeDue = cid;
    } else {
        let changeDueRetFilt = [];
        for (let a = 0; a < changeDueRet.length; a++) {
            if (changeDueRet[a][1] !== 0) {
                changeDueRetFilt.push(changeDueRet[a]);
            }
        }
        objReturn.status = 'OPEN';
        objReturn.changeDue = changeDueRetFilt;
    }
    return objReturn
}
  
checkCashRegister(19.5, 20, 
    [["PENNY", 1.01], 
    ["NICKEL", 2.05], 
    ["DIME", 3.1], 
    ["QUARTER", 4.25], 
    ["ONE", 90], 
    ["FIVE", 55], 
    ["TEN", 20], 
    ["TWENTY", 60], 
    ["ONE HUNDRED", 100]]);


// CASH REGISTER V2.0
const checkCashRegister = (price, cash, cid) => {
    const currencyVal = {
      "PENNY": .01,
      "NICKEL": .05,
      "DIME": .10,
      "QUARTER": .25,
      "ONE": 1.00,
      "FIVE": 5.00,
      "TEN": 10.00,
      "TWENTY": 20.00,
      "ONE HUNDRED": 100.00
    }
    let totalCid = 0;
    for (let element of cid) {
      totalCid += element[1];
    }
    totalCid = totalCid.toFixed(2);
    let changeDue = cash - price;
    const changeArr = [];
    if (changeDue > totalCid) {
      return {status: "INSUFFICIENT_FUNDS", change: changeArr};
    } else if (changeDue.toFixed(2) === totalCid) {
      return {status: "CLOSED", change: cid};
    } else {
      cid = cid.reverse();
      for (let elem of cid) {
        let temp = [elem[0], 0];
        while (changeDue >= currencyVal[elem[0]] && elem[1] > 0) {
          temp[1] += currencyVal[elem[0]];
          elem[1] -= currencyVal[elem[0]];
          changeDue -= currencyVal[elem[0]];
          changeDue = changeDue.toFixed(2);
        }
        if (temp[1] > 0) {
          changeArr.push(temp);
        }
      }
    }
    if (changeDue > 0) {
      return { status: "INSUFFICIENT_FUNDS", change: [] };
    }
    return { status: "OPEN", change: changeArr};
  }