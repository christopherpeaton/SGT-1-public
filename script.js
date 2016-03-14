/**
 * Created by christophereaton on 2/19/16.
 */
/**
 * do plunkr assosciated with lfz firebase slides
 * impliment edit button
 * understand bootstrap grid system
 * learn how to make own grid sysem like bootstraps grid systemz
 * build a full website for password generator
 *
 *
 * make it look good (bootstrap)
 * @type {Array}
 **/


var studentArray = [];
var avg = 0;
var acc = 0;
var baseUrl = 'https://sgt-1-public.firebaseio.com/'; // base firebase url
var fireRef = new Firebase(baseUrl); //Firebase reference
var studentRef = new Firebase(baseUrl + 'students'); //firebase student branch ref.


$(document).ready(function () { // uses jquery to find document, and when the document is ready/loaded will run the function
    calculateAverage(); // calculates average grade of all students combined
    loadData();
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
    if (!validateFormInputs(student)) { // checks to see if validateFormInputs with parameter of student is true or false
        studentRef.push(student); // pushes new student information to database
        studentRef.on('child_added', function(snapshot){ // database is listening for child added, runs anon function with parameter snapshot
            student['id'] = snapshot.key(); //  set id of student equal to firebase id
        });
        studentArray.push(student);  //  push new student to the student array
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
    console.log('student passed into dom is ', student);
    var name = $('<td>').html(student.name);  // dynamically creating student name in table
    var grade = $('<td>').html(student.grade);  // dynamically creating student grade in table
    var course = $('<td>').html(student.course);  // dynamically creating student course in table
    var mButton = $('<button>').html('modify').addClass('modifyStudent'); // dynamically creates modify button
    var modifyStudent = $('<td>').append(mButton);  //appends button to the table
    var dButton = $('<button>').html('delete').addClass('deleteStudent');  //dynamically creates delete student button
    var deleteButton = $('<td>').append(dButton);  // appends button to table
    var studentRow = $('<tr>').append(name).append(course).append(grade).append(modifyStudent).append(deleteButton);  // appends name, course, grade, modify student and delete button to student row
    $('tbody').append(studentRow); // appends studentRow to the table body
    

    $('.deleteStudent').click(function () { //using jquery, selects class deleteStudent after the delete button is clicked, then runs a function with parameter of student
        console.log('student within delete event handler ', student);
        $(this).parent().parent().remove();// using jquery, selects id deleteStudent, selects the parent of id student and removes the parent
        deleteStudent(student); // runs deleteStudent function, taking in the parameter of student
    });
}


function deleteStudent(student) {
    console.log('student.id is', student.id);
    var child = studentRef.child(student.id);  // finding specific child in students node in firebase
    console.log('child within deleteStudent is ', child);
    child.remove();  // removes specified child
    for (var i = 0; i < studentArray.length; i++) {  //runs through student array
        if (student.id === studentArray[i].id) {  // checks if student.id is of equal value and equal type to the id of studentArray at index i
            studentArray.splice(i, 1);  // splices (removes) one item at index i
        }
    }

    console.log('child is ', child);
    console.log('student deleted');
    console.log('student arr is now ', studentArray);
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

function loadData() {
    studentRef.on('child_added', function(snapshot) {  // allows reflection of database
        var child = snapshot.val(); // child is equal to the value of snapshot which is the database
        child.id = snapshot.key(); // takes value of snapshot.key and saves it as child.id
        var rawData = snapshot.val(); // rawData is equal to the value of snapshot
        rawData.id = snapshot.key(); //  id in rawData is equal to the key in snapshot
        studentArray.push(rawData);  // push value of snapshot to studentArray
        addStudentToDOM(rawData);  // adds database data to DOM
        console.log(studentArray);
    });

}


function editStudent(student) {

}



/**
 * updateStudentList - loops through global student array and appends each objects data into the student-list-container > list-body
 */

/**
 * Listen for the document to load and reset the data to the initial state
 */

