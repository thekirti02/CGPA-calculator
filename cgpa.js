var nrows = 0;

document.getElementById("gpa_cal").onclick = function() {
    setupForm("SGPA");
};

document.getElementById("cgpa_cal").onclick = function() {
    setupForm("CGPA");
};

function setupForm(type) {
    document.getElementById("mini-container").style.display = "block";
    document.getElementById("main-table").style.display = "none";
    document.getElementById("result-show-div").style.display = "none";
    document.getElementById("submit_button").style.display = "none";

    var tableElement = document.getElementById("use_js");
    tableElement.innerHTML = "";
    document.getElementById("show_result").innerHTML = "";
    document.getElementById("table_heading").innerHTML = "";

    var entity = type === "SGPA" ? "subjects" : "semesters";
    document.getElementById("choose_dropdown").innerHTML = `<p>Enter number of ${entity}: <select id='courses_drop_down'> ${generateOptions(2, 9)} </select> <input id='submit' class='buttons dropdown-submit-btn' type='submit'> </p>`;

    document.getElementById("submit").onclick = function() {
        generateTable(type);
    };
}

function generateOptions(min, max) {
    var options = "";
    for (var i = min; i <= max; i++) {
        options += `<option value='${i}'>${i}</option>`;
    }
    return options;
}

function generateTable(type) {
    document.getElementById("main-table").style.display = "block";
    document.getElementById("submit_button").style.display = "inline";
    document.getElementById("result-show-div").style.display = "none";

    var tableElement = document.getElementById("use_js");
    tableElement.innerHTML = "";
    document.getElementById("show_result").innerHTML = "";

    var heading = type === "SGPA" ? "<th>Subject name</th> <th>Credits</th> <th>Grade</th>" : "<th>Semester</th> <th>Credits</th> <th>GPA</th>";
    document.getElementById("table_heading").innerHTML = heading;

    var selectField = document.getElementById("courses_drop_down");
    var selectedValue = parseInt(selectField.value);
    nrows = selectedValue;

    for (var i = 0; i < selectedValue; i++) {
        var row = type === "SGPA" ? generateSubjectRow(i) : generateSemesterRow(i);
        tableElement.innerHTML += row;
    }

    document.getElementById("submit_button").innerHTML = "<input type='submit' class='buttons calc-btn' value='Calculate'>";
    document.getElementById("submit_button").onclick = function() {
        calculateResult(type);
    };
}

function generateSubjectRow(index) {
    return `<tr>
                <td><input type='text' placeholder='subject ${index + 1}'></td>
                <td><input class='cred' onKeyDown='if(this.value.length==1 && event.keyCode!=8) return false;' required type='number'></td>
                <td><select class='grad'><option value=''>---Select Grade---</option><option value='10'>A+</option><option value='9'>A</option><option value='8'>B+</option><option value='7'>B</option><option value='6'>B+</option><option value='5'>C</option><option value='4'>N/F</option></select></td>
            </tr>`;
}

function generateSemesterRow(index) {
    return `<tr>
                <td><input type='text' placeholder='Semester ${index + 1}'></td>
                <td><input class='cred' required type='number' onKeyDown='if(this.value.length==2 && event.keyCode!=8) return false;'></td>
                <td><input type='number' max='10' required class='grad'></td>
            </tr>`;
}

function calculateResult(type) {
    var gradePoints = 0;
    var creditsTotal = 0;

    var creditArray = document.getElementsByClassName("cred");
    var gradeArray = document.getElementsByClassName("grad");

    for (var i = 0; i < nrows; i++) {
        creditsTotal += parseInt(creditArray[i].value);
        gradePoints += parseFloat(gradeArray[i].value) * parseInt(creditArray[i].value);
    }

    var res = gradePoints / creditsTotal;
    var resultText = type === "SGPA" ? "Your GPA comes out to be: " : "Your CGPA comes out to be: ";
    var percentage = res *9.5;
    document.getElementById("result-show-div").style.display = "block";
    document.getElementById("show_result").innerHTML = resultText + "<span id='final-val'>" + res.toFixed(2) + "</span>";
    document.getElementById("show_result").innerHTML += `<br>Your percentage is: <span id='final-val'>${percentage.toFixed(2)}% </span>`;

}

