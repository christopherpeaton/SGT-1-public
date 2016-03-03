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
 *try to impliment ajax (reference old code) need button load to database
 **/


var studentArray = [];
var avg = 0;
var acc = 0;


/**
 * The DOM cannot be manipulated safely until the document is ready.  Code inside this ready function will only run once the
 * document is ready.
 */
$(document).ready(function () {
    calculateAverage(); // calculates average grade of all students combined
    console.log('doc loaded');
});


function clearForm() { // when cancel button is clicked, clears name,course and grade fields
    $('.clear').val('');
    console.log('form reset');
}

/**
 * the addStudent function does many things:
 * using jquery, locates input info by class
 * creates unique id per student
 * takes name, grade, course, and id and creates a student object
 * pushes student object to studentArray
 * runs addStudentToDOM function, taking in student as a parameter
 * runs calculateAverage function
 */
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


/**
* addStudentToDom - take in a student object, create html elements from the values and then append the elements
* into the .student_list tbody
* @param student
 *
 * the addStudentToDOM function takes in the parameter of student
 * dynamically creates the grade table, delete button
 * adds class of deleteStudent to button
 * appends the button to the student row
 * appends the student row to the table body
 *
 * selects class deleteStudent, adds click function that takes in parameter student
 * console.logs here
 * selects this, which is the click, selects the parent (table row for that student)
 * removes that table row
 * runs deleteStudent function
 */
function addStudentToDOM(student) {  // dynamically creates table data, w jquery, for student name, grade, course
    var name = $('<td>').html(student.name);
    var grade = $('<td>').html(student.grade);
    var course = $('<td>').html(student.course);
    var uButton = $('<button>').html('update').addClass('updateStudent'); // dynamically creates update button
    var updateStudent = $('<td>').append(uButton);  //appends button to the table
    var dButton = $('<button>').html('delete').addClass('deleteStudent');  //dynamically creates delete student button
    var deleteButton = $('<td>').append(dButton);  // appends button to table
    var studentRow = $('<tr>').append(name).append(course).append(grade).append(updateStudent).append(deleteButton);  // appends name, course, grade, update student and delete button to student row
    $('tbody').append(studentRow); // appends studentRow to the table body

    $('.deleteStudent').click(function (student) { //using jquery, selects class deleteStudent after the delete button is clicked, then runs a function with parameter of student
        console.log('here');
        $(this).parent().remove();  // using jquery, selects id deleteStudent, selects the parent of id student and removes the parent
        deleteStudent(student); // runs deleteStudent function, taking in the parameter of student
    });
}


/**
* deleteStudent function takes in student as a parameter
* runs for loop through studentArray
* then runs conditional statement which checks to see if student.id is equal value and equal type to the id of studentArray at index i
* splices item at index i and removes it from array
* console.logs 'student deleted'
* console.logs 'student arr is now: ', and the remaining studentArray
*/


function deleteStudent(student) {
    for (var i = 0; i < studentArray.length; i++) {  //runs through student array
        if (student.id === studentArray[i].id) {  // checks if student.id is of equal value and equal type to the id of studentArray at index i
            studentArray.splice(1, i);  // splices (removes) one item at index i
        }
    }
    console.log('student deleted');
    console.log('student arr is now: ', studentArray);
}


/**
 * within the calculateAverage function we:
 * create local variable total, set it to 0
 * run for loop through studentArray
 * select grade of student using studentArray[i].grade which is a string, turn it into an integer w parseInt and assign it to total
 * divide total by number of students in array and assign it to global var avg
 * console.log the avg
 * run displayAvg function
 *
 */
function calculateAverage() { // calculateAverage function
    var total = 0;  // creates local variable total and set it equal to 0
    for (var i = 0; i < studentArray.length; i++) { // loops through length the studentArray, going to the next student up each loop
        total += parseInt(studentArray[i].grade);  // takes the string at index studentArray[i].grade and returns a number with parseInt and assigns it to total
    }
    avg = total / studentArray.length; // takes value of total and divides by the number of students in the student array, then assigns them to global variable avg
    console.log(avg);
    displayAvg(); // runs displayAvg function
}


/**
 * displayAvg function selects class avgGrade and displays the html of global variable avg
 */
function displayAvg() {
    $('.avgGrade').html(avg); // selects id avgGrade using jquery and takes the value of global variable avg and displays it as html
}


/**
 * updateData - centralized function to update the average and call student list update
 */
function updateData() {
    for (var i = 0; i < studentArray.length; i++) { //
        calculateAverage();
        console.log('updated');
    }
    displayAvg();
}


/**
 * updateStudentList - loops through global student array and appends each objects data into the student-list-container > list-body
 */

/**
 * Listen for the document to load and reset the data to the initial state
 */

