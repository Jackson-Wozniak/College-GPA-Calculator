import './styles/App.css';
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
    let course = new Class(courses.length, 0.0, 0);
    let courseList = [...courses];
    courseList.push(course);
    setCourses(courseList);
  }

  function updateCourseGrade(index, grade){
    let courseList = [...courses];
    courseList[index].grade = grade;
    setCourses(courseList);
  }

  function updateCourseCredits(index, credits){
    let courseList = [...courses];
    courseList[index].credits = credits;
    setCourses(courseList);
  }

  function calculateGPA(e){
    e.preventDefault();
    console.log(courses);
    let weightedGPASum = 0.0;
    let totalCredits = 0;
    for(let i = 0; i < courses.length; i++){
      weightedGPASum += (parseFloat(courses[i].grade) * parseInt(courses[i].credits));
      totalCredits += parseInt(courses[i].credits);
    }
    //ensure not dividing by 0
    if(totalCredits === 0){
      setGPA(-1);
      return;
    }
    setGPA(weightedGPASum / totalCredits);
  }

  return (
    <div className="App">
      <div>
        <h3>{courses.length} Courses</h3>
        <input type="submit" value="+ Add Course" onClick={() => addNewCourse()} className="buttons"/>
      </div>
      <form className="form" onSubmit={(e) => calculateGPA(e)}>
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
      <input type="submit" value="Calculate"className="buttons"/>
      <h1 
        className={
          "gpa " + 
          //Great GPA is above 3.3
          (GPA >= 3.5 ? "great-gpa" : 
          //Good GPA is 3.0 - 3.5
          GPA >= 3.0 ?  "good-gpa" :
          //Solid GPA is 2.7 - 3.0
          GPA >= 2.7 ? "solid-gpa" :
          //Average GPA is 2.0 - 2.7
          GPA >= 2.0 ? "average-gpa" :
          //below average GPA is 1.7 - 2.0
          GPA >= 1.7 ? "below-average-gpa" :
          //Bad is anything below 1.7
          "bad-gpa")
        }>
            {(GPA >= 0.0 && GPA <= 4.0) ? (Math.round(GPA * 100) / 100).toFixed(2) : '-1.00'}
      </h1>
      </form>
    </div>
  );
}

export default App;
