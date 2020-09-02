// ================================================
// NO 1
function number1(text) {
  let result = "";

  for (i = 0; i < text.length; i++) {
    result += text[i];
  }

  for (i = text.length - 2; i >= 0; i--) {
    result += text[i];
  }

  return result;
}

console.log("[No.1]");
console.log(number1("phobia"));

console.log();
// ================================================
// NO 2

function number2(x) {
  for (i = x - 1; i >= 0; i--) {
    for (j = i; j >= 0; j--) {
      process.stdout.write("*");
    }
    console.log();
  }

  for (i = 2; i < x + 1; i++) {
    for (j = 0; j < i; j++) {
      process.stdout.write("*");
    }
    console.log();
  }
}

console.log("[No.2]");
number2(10);

console.log();
// ================================================
// NO 3

function number3(x) {
  // Atas
  for (i = 1; i < x; i++) {
    // Kiri Atas
    k = 1;
    for (j = 1; j < x + 1; j++) {
      if (k < i + 1) {
        process.stdout.write(j.toString());
        k++;
      } else {
        process.stdout.write("*");
      }
    }

    // Kanan Atas
    k = x;
    for (j = x; j > 0; j--) {
      if (k > i) {
        process.stdout.write("*");
        k--;
      } else {
        process.stdout.write(j.toString());
      }
    }

    console.log();
  }

  // Bawah
  for (i = 1; i < x + 1; i++) {
    // Kiri Bawah
    k = x;
    for (j = 1; j < x + 1; j++) {
      if (k > i - 1) {
        process.stdout.write(j.toString());
        k--;
      } else {
        process.stdout.write("*");
      }
    }

    // Kanan Bawah
    k = 1;
    for (j = x; j > 0; j--) {
      if (k < i) {
        process.stdout.write("*");
        k++;
      } else {
        process.stdout.write(j.toString());
      }
    }

    console.log();
  }
}

console.log("[No.3]");
number3(5);

// ================================================
