/**
 * Created by christophereaton on 2/19/16.
 */
/**
 * add update button
 * html to reflect update button
 * read up on ajax/firebase
 *

 * make it look good (bootstrap)
 * stats (mean, median, mode, range) reference mo-math
 * @type {Array}
 *try to implement ajax (reference old code) need button load to database
 **/


var studentArray = [];
var avg = 0;
var acc = 0;
var fireRef = new Firebase('https://sgt-1-public.firebaseio.com/') //Firebase reference


$(document).ready(function () { // uses jquery to find document, and when the document is ready/loaded will run the function
    calculateAverage(); // calculates average grade of all students combined
    console.log('doc loaded');
});


function clearForm() { // when cancel button is clicked, clears name,course and grade fields
    $('.clear').val('');
    console.log('form reset');
}

function addStudent() {

    var student = {};
    student['name'] = $('#studentName').val(); // selects value of input from id studentName and assigns it to student.name
    student['grade'] = $('#studentGrade').val(); // selects value of input from id studentGrade and assigns it to student.grade
    student['course'] = $('#courseName').val();  // selects value of input from id courseName and assigns it to student.course
    student['id'] = acc;  // this accumulator variable assigns a number to student.id
    acc++;  // increases with every student
    if (validateFormInputs(student)) { // checks to see if validateFormInputs with parameter of student is true or false
    } else {
        studentArray.push(student);  // if false then push new student to the student array
        console.log('studentArray is ', studentArray);
        addStudentToDOM(student);  // add student to the DOM
        fireRef.push({name: name, grade: grade, course: course}); // pushes new student information to database
        calculateAverage();  // run calculate average function
    }
}


//checks sub functions
function validateFormInputs(student) {
    if (validateName(student) || validateCourse(student) || validateGrade(student)) {
        //runs modal if true
        $('#validateModal').modal('show');
        return true
    } else {
        return false
    }
}


//checks for blank student name input
function validateName(student) {
    if (student.name === '') {
        return true;
    } else {
        return false;
    }
}


//checks for blank student course input
function validateCourse(student) {
    if (student.course === '') {
        return student.course;
    } else {
        return false;
    }
}


// checks for blank student grade input
function validateGrade(student) {
    var grade = parseFloat(student.grade);
    if (grade >= 0 && grade <= 100) {
        return false;
    } else {
        return true;
    }
}


function addStudentToDOM(student) {  // dynamically creates table data, w jquery, for student name, grade, course
    var name = $('<td>').html(student.name);
    var grade = $('<td>').html(student.grade);
    var course = $('<td>').html(student.course);
    var mButton = $('<button>').html('modify').addClass('modifyStudent'); // dynamically creates modify button
    var modifyStudent = $('<td>').append(mButton);  //appends button to the table
    var dButton = $('<button>').html('delete').addClass('deleteStudent');  //dynamically creates delete student button
    var deleteButton = $('<td>').append(dButton);  // appends button to table
    var studentRow = $('<tr>').append(name).append(course).append(grade).append(modifyStudent).append(deleteButton);  // appends name, course, grade, modify student and delete button to student row
    $('tbody').append(studentRow); // appends studentRow to the table body
    

    $('.deleteStudent').click(function (student) { //using jquery, selects class deleteStudent after the delete button is clicked, then runs a function with parameter of student
        console.log('deleted');
        $(this).parent().remove();  // using jquery, selects id deleteStudent, selects the parent of id student and removes the parent
        deleteStudent(student); // runs deleteStudent function, taking in the parameter of student
    });
}


function deleteStudent(student) {
    for (var i = 0; i < studentArray.length; i++) {  //runs through student array
        if (student.id === studentArray[i].id) {  // checks if student.id is of equal value and equal type to the id of studentArray at index i
            studentArray.splice(i, 1);  // splices (removes) one item at index i
        }
    }
    console.log('student deleted');
    console.log('student arr is now: ', studentArray);
}


function calculateAverage() { // calculateAverage function
    var total = 0;  // creates local variable total and set it equal to 0
    for (var i = 0; i < studentArray.length; i++) { // loops through length the studentArray, going to the next student up each loop
        total += parseInt(studentArray[i].grade);  // takes the string at index studentArray[i].grade and returns a number with parseInt and assigns it to total
    }
    avg = total / studentArray.length; // takes value of total and divides by the number of students in the student array, then assigns them to global variable avg
    console.log(avg);
    displayAvg(); // runs displayAvg function
}


function displayAvg() {
    $('.avgGrade').html(avg); // selects id avgGrade using jquery and takes the value of global variable avg and displays it as html
}


function updateData() {
    for (var i = 0; i < studentArray.length; i++) { //
        calculateAverage();
        console.log('updated');
    }
    displayAvg();
}




function editStudent(student) {

}



/**
 * updateStudentList - loops through global student array and appends each objects data into the student-list-container > list-body
 */

/**
 * Listen for the document to load and reset the data to the initial state
 */

