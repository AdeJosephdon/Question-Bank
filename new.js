// Read the file into memory (Assuming the file input has the id 'fileInput')
let questionNumber = 0;
let arrayOfObjects;

function handleFileInput(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });

        // convert excel file to JSON
        let worksheets = {};

        for (const sheetName of workbook.SheetNames) {
            worksheets[sheetName] = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
            // console.log(worksheets[sheetName]);
        }

        console.log(worksheets)

        let worksheetsNames = [];

        for (const key in worksheets) {
            if (worksheets.hasOwnProperty(key)) {
                worksheetsNames.push(key)
            }
        }

        // console.log(worksheetsNames);

        // Populate the drop-down list with sheet names
        const sheetSelector = document.getElementById('sheetSelector');

        worksheetsNames.forEach((item, index) => {
        sheetSelector.innerHTML += `<option value="${item}">${item}</option>`
        });

        // Add an event listener for the 'change' event
        sheetSelector.addEventListener('change', handleSheetChange);

        function handleSheetChange(event) {
        const selectedSheet = event.target.value;

        console.log(selectedSheet);

        let arrayOfStrings = JSON.stringify(worksheets[selectedSheet]); //note: this is not an array, I wrote worksheets[selectedSheet] instead of worksheets.selectedSheet because that is the way to make javascript read the value of selectedSheet and not selectedSheet itself.
        // console.log(arrayOfStrings);
        let arrayOfObjects = JSON.parse(arrayOfStrings);

        // console.log(arrayOfObjects);
        // console.log(arrayOfObjects.length);


        // Making the question show on the webpage after excel file upload

        const question = document.getElementById("question");
        // console.log(arrayOfObjects)
        question.innerText = `Question  ${questionNumber +1}: ${arrayOfObjects[questionNumber].Question}`;
    
        // Making the answer show on the webpage after excel file upload
        const answer = document.getElementById("answer");
        answer.innerText = arrayOfObjects[questionNumber].Answer;

        // console.log(arrayOfObjects[1])


        // Reference to the container where buttons will be added
        const buttonContainer = document.getElementById("questionlist");

        // Loop through the array and create buttons
        arrayOfObjects.forEach(function(item, index) {
        // Create a button element
        var button = document.createElement("button");

        // Set button text
        button.textContent = index + 1;

        // Set button id, class, or any other attributes as needed
        button.id = "button" + index;
        button.className = "myButton";

        // Add click event listener if needed
        // button.addEventListener("click", function() {
        //     console.log("Button " + index + " clicked!");
        // });

        button.addEventListener("click", function() {
        questionNumber = index
        question.innerText = "Question "+ button.textContent+ ": " + arrayOfObjects[questionNumber].Question;
        answer.innerText = arrayOfObjects[questionNumber].Answer;
        // result.classList.toggle('hidden');

                if (result.classList.value = "hidden"){
            
        }else {
            result.classList.toggle("hidden")
        }
  });

        // Append the button to the container
        buttonContainer.appendChild(button);
        });


        // Making the next and previous buttons work

        const next = document.getElementById("change next")

        // Add click event listener to the button
        next.addEventListener("click", function() {
        questionNumber++
        question.innerText = `Question  ${questionNumber +1}: ${arrayOfObjects[questionNumber].Question}`;
        answer.innerText = arrayOfObjects[questionNumber].Answer;

        if (result.classList.value = "hidden"){
            
        }else {
            result.classList.toggle("hidden")
        }
        // result.classList.toggle('hidden');
        console.log(result.classList);
  });
        const Previous = document.getElementById("Previous")

        Previous.addEventListener("click", function() {
        questionNumber - 1
        console.log(questionNumber)
        question.innerText = `Question  ${questionNumber +1}: ${arrayOfObjects[questionNumber].Question}`;
        answer.innerText = arrayOfObjects[questionNumber].Answer;

                if (result.classList.value = "hidden"){
            
        }else {
            result.classList.toggle("hidden")
        }
  });

};
        }



    reader.readAsArrayBuffer(file);
};

document.getElementById('fileInput').addEventListener('change', handleFileInput);




// Show the answers
const result = document.getElementById("answer")

document.getElementById("showanswers").addEventListener("click", function() {
    result.classList.toggle('hidden');
    });

