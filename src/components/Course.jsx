function Course(props){
    return ( 
        <div>
            <input 
                className={props.courseError ? "error" : ""}
                type="number" 
                placeholder="Credits" 
                onChange={(e) => props.setCredits(props.courseIndex, e.target.value)}
            />
            <select name="grade" id="" onChange={(e) => props.setGrade(props.courseIndex, e.target.value)} tabIndex="-1">
                <option value="-">-</option>
                <option value="4.0">A</option>
                <option value="3.7">A-</option>
                <option value="3.3">B+</option>
                <option value="3.0">B</option>
                <option value="2.7">B-</option>
                <option value="2.3">C+</option>
                <option value="2.0">C</option>
                <option value="1.7">C-</option>
                <option value="1.3">D+</option>
                <option value="1.0">D</option>
                <option value="0.0">F</option>
            </select>
        </div>
    );
}

export default Course;