import './App.css';
import { useState } from 'react';
import Course from './components/Course';

class Class {
  index;
  grade;
  credits;
  error;
  constructor(index, grade, credits){
    this.index = index;
    this.grade = grade;
    this.credits = credits;
    this.error = true;
  }
}

function App() {
  const [courses, setCourses] = useState([]);
  const [GPA, setGPA] = useState(0);

  function addNewCourse(){
    let course = new Class(courses.length, '-', 0);
    let courseList = [...courses];
    courseList.push(course);
    setCourses(courseList);
  }

  function updateCourseGrade(index, grade){
    let courseList = [...courses];
    if(grade < 0 || grade > 4){
      courseList[index].error = true;
    }else{
      courseList[index].error = false;
      courseList[index].grade = grade;
    }
    setCourses(courseList);
  }

  function updateCourseCredits(index, credits){
    let courseList = [...courses];
    if(credits === "" || credits === null || credits <= 0){
      courseList[index].error = true;
    }else{
      courseList[index].error = false;
      courseList[index].credits = credits;
    }
    setCourses(courseList);
  }

  function calculateGPA(e){
    e.preventDefault();
    if(courses.length <= 0){
      window.alert("There must be at least 1 class to calculate GPA");
      return;
    }
    let weightedGPASum = 0.0;
    let totalCredits = 0;
    for(let i = 0; i < courses.length; i++){
      if(courses[i].error || courses.grade === '-'){
        window.alert("All fields must be valid");
        return;
      }
      weightedGPASum += (courses[i].grade * courses[i].credits);
      totalCredits += courses[i].credits;
    }
    
    setGPA(weightedGPASum / totalCredits);
  }

  return (
    <div className="App">
      <div>
        <h3>{courses.length} Courses</h3>
        <input type="submit" value="+ Add Course" onClick={() => addNewCourse()}/>
      </div>
      <form action="" onSubmit={(e) => calculateGPA(e)}>
      <div className="classes">
      {courses.map((course) => (
          <Course
            key={course.index}
            setGrade={updateCourseGrade}
            setCredits={updateCourseCredits}
            courseIndex={course.index}
            courseError={course.error}
          />
        ))}
      </div>
      <input type="submit" value="Calculate"/>
      <h1 className={"gpa " + (GPA > 3.0 ? "green-gpa" : GPA > 2.3 ? "yellow-gpa" : GPA >= 2.0 ? "orange-gpa" : "red-gpa")}>{GPA.toFixed(2)}</h1>
      </form>
    </div>
  );
}

export default App;
