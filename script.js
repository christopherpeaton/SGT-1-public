/**
 * Created by christophereaton on 2/19/16.
 */
/**
 * add update button
 * html to reflect update button
 * form validation (if grade is greater than 100, alert, empty strings for name or course alert.)
 * read up on ajax/firebase
 *
 * clear form button
 * make it look good (bootstrap)
 * stats (mean, median, mode, range) reference mo-math
 * @type {Array}
 *try to impliment ajax (reference old code) need button load to database
**/




/**
 * Define all global variables here
 */
var studentArray = [];
var avg = 0;
var acc = 0;

/**
 * The DOM cannot be manipulated safely until the document is ready.  Code inside this ready function will only run once the
 * document is ready.
 */
$(document).ready(function () {
    calculateAverage();
    console.log('doc loaded');

});


/**
 * student_array - global array to hold student objects
 * @type {Array}
 */

/**
 * inputIds - id's of the elements that are used to add students
 * @type {string[]}
 */

/**
 * addClicked - Event Handler when user clicks the add button
 */

/**
 * cancelClicked - Event Handler when user clicks the cancel button, should clear out student form
 */

/**
 * addStudent - creates a student objects based on input fields in the form and adds the object to global student array
 *
 * @return undefined
 *
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
    student['name'] = $('#studentName').val();
    student['grade'] = $('#studentGrade').val();
    student['course'] = $('#courseName').val();
    student['id'] = acc;
    acc++;
    studentArray.push(student);
    console.log('studentArray is ', studentArray);
    addStudentToDOM(student);
    calculateAverage();
}


/**
 *
 * @param student
 *
 * the addStudentToDOM function takes in the parameter of student
 * dynamically creates the grade table, delete button
 * adds class of deleteStudent to button
 * appends the button to the student row
 * appends the student row to the table body
 *
 *
 */
function addStudentToDOM(student) {
    var name = $('<td>').html(student.name);
    var grade = $('<td>').html(student.grade);
    var course = $('<td>').html(student.course);
    var button = $('<button>').html('delete').addClass('deleteStudent');
    var deleteButton = $('<td>').append(button);
    var studentRow = $('<tr>').append(name).append(course).append(grade).append(deleteButton);
    $('tbody').append(studentRow);

    $('.deleteStudent').click(function(student){
        console.log('here');
        $(this).parent().remove();
        deleteStudent(student)
    })
}
/**
 * clearAddStudentForm - clears out the form values based on inputIds variable
 */

/**
 * calculateAverage - loop through the global student array and calculate average grade and return that value
 * @returns {number}
 */
function calculateAverage() {
    var total = 0;
    for (var i = 0; i < studentArray.length; i++) {
        total += parseInt(studentArray[i].grade);
    };

    avg = total / studentArray.length;

    console.log(avg);
    displayAvg();
}

function displayAvg() {
    $('.avgGrade').html(avg);

}


/**
 * updateData - centralized function to update the average and call student list update
 */

/**
 * updateStudentList - loops through global student array and appends each objects data into the student-list-container > list-body
 */

/**
 * addStudentToDom - take in a student object, create html elements from the values and then append the elements
 * into the .student_list tbody
 * @param studentObj
 */

/**
 * reset - resets the application to initial state. Global variables reset, DOM get reset to initial load state
 */

function deleteStudent(student){
    for (var i = 0; i < studentArray.length; i++) {
        if (student.id === studentArray[i].id){
            studentArray.splice(1,i);
        }
    }
    console.log('student deleted');
    console.log('student arr is now: ', studentArray);
}
/**
 * Listen for the document to load and reset the data to the initial state
 */

