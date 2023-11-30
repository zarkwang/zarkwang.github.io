const maxRowNumber = 100;
const amountBreak = 4;
const toggleRowNumber = 10;


// Function to generate the price list rows
function intertemporalOptionA(seqLength,condition){
    var optionAList = [];

    for (var x = 0; x <= maxRowNumber; x++) {
        if (condition === "front-align"){
            optionAList.push("£" + amountBreak*x + " today");
        } else if (condition === "back-align") {
            optionAList.push("£" + amountBreak*x + " in " + seqLength);
        }
    }
    return(optionAList);   
}

function riskyOptionA(){
    var optionAList = [];
    
    for (var x = 0; x <= maxRowNumber; x++) {
            optionAList.push("£" + amountBreak*x + " with certainty");
    }
    return(optionAList);   
}

function sequenceContent(frontAmount,backAmount,seqLength){
    const sequenceOption = `
                <div class='card' id='card1'> 
                    <div id='cardContent1'></br> £${frontAmount}</br> today</div>
                </div> 
                    and
                <div class='card' id='card2'> 
                    <div id='cardContent2'></br> £${backAmount}</br> in ${seqLength}</div>
                </div>
    `
    return(sequenceOption);
}

function generatePriceList(optionAContent,optionBContent) {

    var table = document.getElementById("priceListTable");
    for (var x = 0; x <= maxRowNumber; x++) {
        var row = document.createElement("tr");

        var optionACell = document.createElement("td");
        optionACell.textContent = optionAContent[x];

        row.appendChild(optionACell);

        var choiceCell = document.createElement("td");
        var radioContainer = document.createElement("div");
        radioContainer.className = "radio-container";

        var optionARadio = document.createElement("input");
        optionARadio.type = "radio";
        optionARadio.name = "choice_" + amountBreak*x;
        optionARadio.value = "Option A";
        optionARadio.id = "optionA_" + amountBreak*x;
        optionARadio.addEventListener("click", function () {

            // Automatically check "Option A" buttons below and "Option B" buttons above
            currentRow = parseInt(this.id.split("_")[1])/amountBreak;
            for (var i = 0; i < currentRow; i++) {
                var optionBBtn = document.getElementById("optionB_" + amountBreak*i);
                if (optionBBtn) {
                    optionBBtn.checked = true;
                }
            }
            for (var j = currentRow; j <= maxRowNumber; j++) {
                var optionABtn = document.getElementById("optionA_" + amountBreak*j);
                if (optionABtn) {
                    optionABtn.checked = true;
                }
            }
            // Automatically click the "Show/Hide Rows" button
            if (currentRow % toggleRowNumber == 0 && currentRow >= 0){
                toggleHiddenRows(currentRow-toggleRowNumber+1,currentRow-1)
            };

            updateSwtichRow(currentRow, 'A');
        });

        var optionBRadio = document.createElement("input");
        optionBRadio.type = "radio";
        optionBRadio.name = "choice_" + amountBreak*x;
        optionBRadio.value = "Option B";
        optionBRadio.id = "optionB_" + amountBreak*x;
        optionBRadio.style = "margin-left:20px"
        optionBRadio.addEventListener("click", function () {

            // Automatically check "Option A" buttons below and "Option B" buttons above
            currentRow = parseInt(this.id.split("_")[1])/amountBreak;
            for (var i = 0; i <= currentRow; i++) {
                var optionBBtn = document.getElementById("optionB_" + amountBreak*i);
                if (optionBBtn) {
                    optionBBtn.checked = true;
                }
            }
            for (var j = currentRow+1; j <= maxRowNumber; j++) {
                var optionABtn = document.getElementById("optionA_" + amountBreak*j);
                if (optionABtn) {
                    optionABtn.checked = true;
                }
            }
            // Automatically click the "Show/Hide Rows" button
            if (currentRow % toggleRowNumber == 0 && currentRow >= 0){
                toggleHiddenRows(currentRow+1,currentRow+toggleRowNumber-1)
            };

            updateSwtichRow(currentRow, 'B');
        });

        var optionAButton = document.createElement("label");
        optionAButton.textContent = "Option A";
        optionAButton.htmlFor = "optionAButton_" + amountBreak*x;

        var optionBButton = document.createElement("label");
        optionBButton.textContent = "Option B";
        optionBButton.htmlFor = "optionBButton_" + amountBreak*x;

        radioContainer.appendChild(optionARadio);
        radioContainer.appendChild(optionAButton);
        radioContainer.appendChild(optionBRadio);
        radioContainer.appendChild(optionBButton);
        choiceCell.appendChild(radioContainer);
        row.appendChild(choiceCell);


        if (x === 0) {
            var optionBCell = document.createElement("td");
            var optionBDiv = document.createElement("div");

            optionBDiv.id = "constantOption";
            optionBCell.rowSpan = maxRowNumber +1;

            if (optionBDiv) {
                optionBDiv.innerHTML = optionBContent; 
            }

            optionBCell.appendChild(optionBDiv);
            row.appendChild(optionBCell);
        }

        
        table.appendChild(row);
    }

    var rowWithoutBorder = 1;
    while(rowWithoutBorder < maxRowNumber){
        removeBorder(table,rowWithoutBorder,rowWithoutBorder+toggleRowNumber-2);
        rowWithoutBorder+=toggleRowNumber;
    }
};


// Function to show hidden rows within a range
function toggleHiddenRows(start, end) {
    hideRowsInitial();

    var table = document.getElementById("priceListTable");
    for (var x = start; x <= end; x++) {
        var row = table.getElementsByTagName('tr')[x];
        if (row) {
            var isHidden = row.style.display === "none";
            row.style.display = isHidden ? "table-row" : "none";
            
            // Un-check the radios
            var radios = row.querySelectorAll("input[type='radio']");
            radios.forEach(function (radio) {
                radio.checked = false;
            });
        }   
    }
}

// Function to initially hide the rows berween specific amount numbers
function hideRowsInitial() {
    for (var x = 1; x <= maxRowNumber; x++) {
        if ((x-1) % toggleRowNumber !== 0) {
            var rowToHide = document.getElementsByTagName("tr")[x];
            if (rowToHide) {
                rowToHide.style.display = "none";
            }
        }
    }
}


// Show the swtich point: indifference point of option B for option A
function updateSwtichRow(row, option) {
    var switchRow = document.getElementById("switchRow");    
    if (switchRow) {
        if(option == 'A'){
            switchRow.innerHTML = amountBreak*row;
        } else if(option == 'B'){
            switchRow.innerHTML = amountBreak*(row+1)
        }
    }
}

// Remove border
function removeBorder(table,startRow, endRow) {
    var rows = table.getElementsByTagName("tr"); 

    for (var i = startRow; i <= endRow; i++) {
        var cells = rows[i].getElementsByTagName("td"); 
        for (var j = 0; j < cells.length; j++) {
            cells[j].style.borderBottom = "none";
            cells[j].style.borderTop = "none"; 
        }
    }
}


function hideTip(tipNumber) {
    $('#step_' + tipNumber).hide();
    $('#triangle_' + tipNumber).hide();
    $('#popover_' +tipNumber).hide();
    $('#popContent_' +tipNumber).hide();
    $('#tipButton_' +tipNumber).hide();
}

function showTip(tipNumber) {
    $('#popContent_' +tipNumber).html(tipText[tipNumber-1])
    $('#step_' + tipNumber).show();
    $('#triangle_' + tipNumber).show();
    $('#popover_' +tipNumber).show();
    $('#popContent_' +tipNumber).show();
    $('#tipButton_' +tipNumber).show();
}

function nextTip() {
    let tipNumber = parseInt($(this).attr('id').replace(/\D/g, ''));
    
    hideTip(tipNumber);
    showTip(tipNumber+1);
}


function generateConfidenceQuestion(question){

    const questionContent = document.getElementById('confidenceQuestionContent');
    questionContent.innerHTML = question;

    var sliderContainer = document.querySelector('.slider-container');

    for (var i = 0; i <= 10; i++) {
    var tick = document.createElement('div');
    tick.className = 'tick';
    tick.style.left = (0.5 + i * 9.9) + '%';
    sliderContainer.appendChild(tick);

    var tickLabel = document.createElement('div');
    tickLabel.className = 'tick-label';
    tickLabel.innerText = (i * 10) + '%';
    tickLabel.style.left = (0.5 + i * 9.9) + '%';
    sliderContainer.appendChild(tickLabel);
    }

    $('#confidence-scale').on('input', function() {
        let sliderValue = $(this).val();
        $('#confidenceAnswer').text(sliderValue);
    });
}

//Function to update the list of clicked button IDs
// function updateClickedButtonsList() {
//     var clickedButtonsList = document.getElementById("clickedButtonsList");
//     clickedButtonsList.innerHTML = "";
//     clickedButtonIds.forEach(function (id) {
//         var listItem = document.createElement("li");
//         listItem.textContent = id;
//         clickedButtonsList.appendChild(listItem);
//     });
// }


// Dynamically create buttons for specific ranges
// var buttonContainer = document.getElementById("buttonContainer");
// for (var i = 1; i <= maxRowNumber; i += 10) {
//     let start = i;
//     let end = i + 8;
//     var button = document.createElement("button");
//     button.id = "showHideButton_" + start + "-" + end; // Unique ID for each button
//     button.textContent = "Show/Hide Rows " + start + "-" + end;
//     button.addEventListener("click", function () {
//         toggleHiddenRows(start, end);
//     });
//     buttonContainer.appendChild(button);
// };


// function generateConfidenceQuestion(question){

//     const questionContent = document.getElementById('confidenceQuestionContent');
//     const form = document.getElementById("confidenceForm");

//     questionContent.innerHTML = question;

//     confidenceLevels.forEach((level, index) => {
//         const listItem = document.createElement('ul');
//         const radioBtn = document.createElement('input');

//         radioBtn.type = 'radio';
//         radioBtn.id = 'level' + index;
//         radioBtn.name = 'confidenceLevel';
//         radioBtn.value = level;

//         const label = document.createElement('label');
//         label.htmlFor = 'level' + index;
//         label.appendChild(document.createTextNode(level));

//         listItem.appendChild(radioBtn); 
//         listItem.appendChild(label); 
//         form.appendChild(listItem); 
//     });
// }
