// Simple Test Framework
const tests = [];
let testsPassed = 0;
let testsFailed = 0;

function test(name, fn) {
    tests.push({ name, fn });
}

function assertEquals(actual, expected, message) {
    if (actual !== expected) {
        throw new Error(`ASSERTION FAILED: ${message}. Expected "${expected}" but got "${actual}".`);
    }
}

function runTests() {
    console.log('Starting tests...');
    tests.forEach(t => {
        try {
            // Mock app.elements for each test run if needed by the function being tested
            const mockAppElements = {
                uviConcernLevel: { textContent: '', style: { backgroundColor: '' } },
                uviConcernLevel2: { textContent: '' }
            };

            // Pass the mock elements to the function if it expects them,
            // or make the function use a globally available mock.
            // For this example, the function logic will be copied and adapted.
            t.fn(mockAppElements);
            console.log(`%cPASS: ${t.name}`, 'color: green;');
            testsPassed++;
        } catch (e) {
            console.error(`%cFAIL: ${t.name}`, 'color: red;');
            console.error(e.message);
            testsFailed++;
        }
    });
    console.log('--------------------');
    console.log(`Tests finished: ${testsPassed} passed, ${testsFailed} failed.`);
}

// --- Logic for updateUVIndex (copied from main.js for isolated testing) ---
// In a real scenario with modules, we would import this.
// Here, we redefine it or adapt it for the test environment.
function updateUVIndexForTest(uvIndex, elements) {
    const uvLevels = [
        { max: 2, level: 'Good', color: '#6ae17c' },
        { max: 5, level: 'Moderate', color: '#CCE16A' },
        { max: 7, level: 'High', color: '#d4b814' },
        { max: 10, level: 'Very high', color: '#d43114' },
        { max: Infinity, level: 'Extreme high', color: '#dc15cf' }
    ];

    const foundLevel = uvLevels.find(item => uvIndex <= item.max);
    const level = foundLevel ? foundLevel.level : 'Unknown'; // Handle case where uvIndex might be > all max values if not Infinity
    const color = foundLevel ? foundLevel.color : '#000000';


    elements.uviConcernLevel.textContent = level;
    elements.uviConcernLevel.style.backgroundColor = color;
    elements.uviConcernLevel2.textContent = level;
}

// --- Tests for updateUVIndex ---

test('UV Index: Good (UV = 1)', (mockElements) => {
    updateUVIndexForTest(1, mockElements);
    assertEquals(mockElements.uviConcernLevel.textContent, 'Good', 'UVI Level Text');
    assertEquals(mockElements.uviConcernLevel.style.backgroundColor, '#6ae17c', 'UVI Level Color');
    assertEquals(mockElements.uviConcernLevel2.textContent, 'Good', 'UVI Level 2 Text');
});

test('UV Index: Moderate (UV = 4)', (mockElements) => {
    updateUVIndexForTest(4, mockElements);
    assertEquals(mockElements.uviConcernLevel.textContent, 'Moderate', 'UVI Level Text');
    assertEquals(mockElements.uviConcernLevel.style.backgroundColor, '#CCE16A', 'UVI Level Color');
});

test('UV Index: High (UV = 7)', (mockElements) => {
    updateUVIndexForTest(7, mockElements);
    assertEquals(mockElements.uviConcernLevel.textContent, 'High', 'UVI Level Text');
    assertEquals(mockElements.uviConcernLevel.style.backgroundColor, '#d4b814', 'UVI Level Color');
});

test('UV Index: Very high (UV = 9)', (mockElements) => {
    updateUVIndexForTest(9, mockElements);
    assertEquals(mockElements.uviConcernLevel.textContent, 'Very high', 'UVI Level Text');
    assertEquals(mockElements.uviConcernLevel.style.backgroundColor, '#d43114', 'UVI Level Color');
});

test('UV Index: Extreme high (UV = 11)', (mockElements) => {
    updateUVIndexForTest(11, mockElements);
    assertEquals(mockElements.uviConcernLevel.textContent, 'Extreme high', 'UVI Level Text');
    assertEquals(mockElements.uviConcernLevel.style.backgroundColor, '#dc15cf', 'UVI Level Color');
});

test('UV Index: Edge case (UV = 0)', (mockElements) => {
    updateUVIndexForTest(0, mockElements);
    assertEquals(mockElements.uviConcernLevel.textContent, 'Good', 'UVI Level Text for UV 0');
});

test('UV Index: Edge case (UV = 2)', (mockElements) => {
    updateUVIndexForTest(2, mockElements);
    assertEquals(mockElements.uviConcernLevel.textContent, 'Good', 'UVI Level Text for UV 2');
});

test('UV Index: Edge case (UV = 5.5) between Moderate and High', (mockElements) => {
    updateUVIndexForTest(5.5, mockElements);
    assertEquals(mockElements.uviConcernLevel.textContent, 'High', 'UVI Level Text for UV 5.5');
});


// --- Run all tests ---
// To run these tests, include this file in a script tag in index.html (or a dedicated test HTML)
// and call runTests() in the browser console, or add:
// document.addEventListener('DOMContentLoaded', runTests);
// For automated testing, this would be run by a test runner.
// For now, we just define them. To actually run, you'd need to call runTests().
// Let's add an immediate call for demonstration when the script loads.
runTests();
