function isPrime(num) {
    if (num <= 1) return false;
    if (num <= 3) return true;
    if (num % 2 === 0 || num % 3 === 0) return false;

    for (let i = 5; i * i <= num; i += 6) {
        if (num % i === 0 || num % (i + 2) === 0) return false;
    }

    return true;
}

function getPrimesinRange(start, end) {
    if (start > end) return { primes: [], timeTaken: 0 };

    const primes = [];
    let timeToCheckPrime = 0;
    let timeToCheckPrimeForPrimes = 0;

    for (let i = start; i <= end; i++) {
        const startTime = performance.now();
        const isPrimeResult = isPrime(i);
        const endTime = performance.now();
        timeToCheckPrime += endTime - startTime;

        if (isPrimeResult) {
            const primeStartTime = performance.now();
            primes.push(i);
            const primeEndTime = performance.now();
            timeToCheckPrimeForPrimes += primeEndTime - primeStartTime;
        }
    }

    return { primes, timeTaken: timeToCheckPrime, timeTakenForPrimes: timeToCheckPrimeForPrimes };
}

document.addEventListener("DOMContentLoaded", function() {
    const primeNumbersDisplay = document.getElementById("primeNumbers");
    const detailsBtn = document.getElementById("detailsBtn");

    detailsBtn.addEventListener("click", function() {
        const start = parseInt(document.getElementById("start").value);
        const end = parseInt(document.getElementById("end").value);
        const { primes, timeTaken, timeTakenForPrimes } = getPrimesinRange(start, end);

        const popupWindow = window.open("", "Performance Details", "width=600,height=400");
        popupWindow.document.write(`<html><head><title>Performance Details</title></head><body>`);
        popupWindow.document.write(`<style>`);
        popupWindow.document.write(`table { border-collapse: collapse; width: 100%; }`);
        popupWindow.document.write(`th, td { border: 1px solid #000; padding: 8px; text-align: center; }`);
        popupWindow.document.write(`</style>`);
        popupWindow.document.write(`<h2>Prime Number Finder Performance Details</h2>`);

        // First Table: Time taken to check if a single number is prime
        popupWindow.document.write(`<h3>Time Taken to Check Prime for Each Number</h3>`);
        popupWindow.document.write(`<table>`);
        popupWindow.document.write(`<tr><th>Number</th><th>Is Prime?</th><th>Time Taken (ms)</th></tr>`);
        for (let i = start; i <= end; i++) {
            const startTime = performance.now();
            const isPrimeResult = isPrime(i);
            const endTime = performance.now();
            const time = (endTime - startTime).toFixed(2);
            popupWindow.document.write(`<tr><td>${i}</td><td>${isPrimeResult ? 'Yes' : 'No'}</td><td>${time}</td></tr>`);
        }
        popupWindow.document.write(`</table>`);

        // Second Table: Time taken to check if a number is prime for primes
        popupWindow.document.write(`<h3>Time Taken to Check Prime for Primes</h3>`);
        popupWindow.document.write(`<table>`);
        popupWindow.document.write(`<tr><th>Prime Number</th><th>Time Taken (ms)</th></tr>`);
        for (const prime of primes) {
            popupWindow.document.write(`<tr><td>${prime}</td><td>${timeTakenForPrimes.toFixed(2)}</td></tr>`);
        }
        popupWindow.document.write(`</table>`);

        popupWindow.document.write(`</body></html>`);
        popupWindow.document.close();
    });

    function calculateTimeTaken(start, end) {
        const startTime = performance.now();
        getPrimesinRange(start, end);
        const endTime = performance.now();
        return endTime - startTime;
    }
});





