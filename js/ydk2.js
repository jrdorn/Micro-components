let students = [
  { id: 14, name: "Kyle" },
  { id: 73, name: "Suzy" },
  { id: 112, name: "Frank" },
  { id: 6, name: "Sarah" },
];

function getStudentName(studentID) {
  for (let student of students) {
    if (student.id === studentID) {
      return student.name;
    }
  }
}

let nextStudent = getStudentName(73);

console.log(nextStudent);

/**other than declarations, all variables are the target of an assignment
  or the source of a value
 */

// Variable shadowing
function myFunk() {
  let my_var = "test";
  if (true) {
    let my_var = "new test";
    console.log(my_var);
  }
  console.log(my_var);
}
