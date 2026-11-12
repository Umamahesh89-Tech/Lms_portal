"use strict";

// ==========================================
// PART 1: Types & Coercion
// ==========================================

// Validates the user input and returns a valid positive number.
function parseAmount(input) {

    // Check whether the input is missing.
    if (input === null || input === undefined) {
        throw new Error("Amount is required.");
    }

    // Only string and number types are accepted.
    if (typeof input !== "string" && typeof input !== "number") {
        throw new Error("Invalid input type. Enter a string or number.");
    }

    // Remove unnecessary spaces from string input.
    if (typeof input === "string") {
        input = input.trim();
    }

    // Empty strings must be rejected because Number("") returns 0.
    if (input === "") {
        throw new Error("Amount cannot be empty.");
    }

    // Convert the input into a number.
    const amount = Number(input);

    // Check whether the converted value is NaN.
    if (Number.isNaN(amount)) {
        throw new Error("Invalid amount. Enter a valid number.");
    }

    // Amount must be greater than zero.
    if (amount <= 0) {
        throw new Error("Amount must be greater than zero.");
    }

    return amount;
}


// Testing parseAmount with different inputs.

const testInputs = [
    "500",
    " 250 ",
    "",
    "abc",
    null,
    undefined,
    "12.5.3"
];

testInputs.forEach((input) => {
    try {
        const result = parseAmount(input);
        console.log("Valid amount:", result);
    } catch (error) {
        console.log("Error:", error.message);
    }
});


// Type Coercion Demonstration

// The + operator performs string concatenation when one operand is a string.
// Therefore, "5" + 2 produces "52", while "5" - 2 performs numeric subtraction and produces 3.

console.log('"5" + 2 =', "5" + 2);
console.log('"5" - 2 =', "5" - 2);

// typeof null returns "object" because of a historical JavaScript behavior.
console.log("typeof null =", typeof null);


// ==========================================
// PART 2: Scoping & Hoisting
// ==========================================

// STEP 1: Main Declarations

// const is used because the bank name should never change.
// let is used because the transaction counter needs to be updated.

const BANK_NAME = "JS National Bank";
let transactionCounter = 0;

console.log("\nBank Name:", BANK_NAME);

transactionCounter++;
console.log("Transaction Counter:", transactionCounter);


// ==========================================
// HOISTING DEMO
// ==========================================

// JavaScript creates the execution context before executing code.
// During creation, declarations are registered; during execution, assignments happen.

// 1. VAR HOISTING

console.log("Var before declaration:", hoistedVar);

var hoistedVar = "Bank Account";

console.log("Var after declaration:", hoistedVar);


// 2. LET HOISTING / TEMPORAL DEAD ZONE

try {
    console.log(hoistedLet);
} catch (error) {
    console.log("Let Error:", error.message);
}

let hoistedLet = "Customer Account";

console.log("Let after declaration:", hoistedLet);


// 3. FUNCTION DECLARATION HOISTING

announce();

function announce() {
    console.log("Welcome to JS National Bank!");
}


// 4. FUNCTION EXPRESSION HOISTING

try {
    notify();
} catch (error) {
    console.log("Function Expression Error:", error.message);
}

var notify = function () {
    console.log("Transaction notification sent!");
};

notify();


// ==========================================
// STEP 3: ASYNCHRONOUS LOOP BUG
// ==========================================

// VAR LOOP

for (var i = 0; i < 3; i++) {
    setTimeout(function () {
        console.log("var loop:", i);
    }, 1000);
}

// LET LOOP

for (let i = 0; i < 3; i++) {
    setTimeout(function () {
        console.log("let loop:", i);
    }, 1000);
}

// var shares one function/global-scoped variable across all iterations.
// let creates a fresh lexical binding for each iteration.
// Therefore, var prints 3, 3, 3 while let prints 0, 1, 2.