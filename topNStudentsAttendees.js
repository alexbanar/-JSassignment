const students = ['Eden', 'Refael', 'Yoni', 'Nitzan', 'Hadas'];
const attendees = [
                    ['Eden', 'Refael', 'Yoni', 'Nitzan', 'Hadas', 'Ortal'], 
                    ['Berry', 'Nitzan', 'Yoni', 'Eden', 'Hadas', 'Ortal'], 
                    ['Maxim', 'Ortal', 'Yoni', 'Refael', 'Nitzan', 'Alex'], 
                    ['Eden', 'Andrew', 'Yoni', 'Nitzan', 'Ortal','Nitzan']                    
                  ];

const topNStudentsAttendees = (students, attendees, N) => {
    //Students array can not be empty
    if(students.length == 0) {
        console.log("students array can not be empty");
        return;
    }
    //The number of top 'N' students to return need
    //to be integer and greater than or equal to 1 
    if(!(Number.isInteger(N) && (N >= 1))) {
        console.log(`The number of 'N' top students to return need
                     \rto be integer and greater than or equal to 1`);
        return;
    }
    //Attendees array can not be empty
    if(attendees.length == 0) {
        console.log("attendees array can not be empty");
        return;
    }
    //Attendees 2D's sub arrays can not be all empty
    if(attendees.every(attendee => attendee.length == 0)) {
        console.log("'attendees 2D's sub arrays can not be all empty");
        return;
    }
    //The array for saving the number of attendees in lectures 
    //of each student by the order as students names array order.
    //Initiation of every such member is 0
    let studentsAttendeesNumber = new Array(students.length).fill(0);
    //Array of objects for saving together student name 
    //and a number of lectures this student attended
    let outputOfObj = [];
    //Array for keeping final order of names of students
    //by the number of their most attendees lectures by descending order
    let output = [];
    
    //For each 'student name' in 'students names list(array)' do
    students.forEach((student, index) => {
        //For each 'attendees sub array' in 'attendees students names list(2D array)' do
        attendees.forEach(lectureAttendees => {
            //Limit to one appearance 'lecture attendees', that accidentally
            //has been registered by the same student twice (or more times), 
            //if such exist, for the same lecture.
            //This limit will reduce run work continuation time with 'lecture attendees' array
            lectureUniqAttendees = [...new Set(lectureAttendees)];

            //If 'current student name' exist in 'uniq same name attendees sub array' -
            //increase by 1 the suitable member at 'index'(current student place)
            //in 'uniq same name attendees sub array' for saving the number 
            //of 'attendees in lectures' of 'current student'
            if(lectureUniqAttendees.some(uniqAttendeeStudent => 
                                            uniqAttendeeStudent === student)) {
                ++studentsAttendeesNumber[index];
            }                      
        })
       
        //Create a new object from 1)'current student' in 'current attendee(array)'
        // at 'current student index' place and 2)current student name
        //and add a new object to array of objects for saving 
        //together 'student name'  and a 'number of lectures' this student attended        
        outputOfObj.push({"attendeesNum" : studentsAttendeesNumber[index],
                          "studentName" : student
                        });       
    });
   
    //Sort by descending order by 'attendees number' field   
    //the array of objects for saving together student name  
    //and a number of lectures of this student attended
    outputOfObj.sort((a, b) => parseInt(b.attendeesNum) - parseInt(a.attendeesNum));
    
    //Take 'N' first members from the array of objects for saving together 
    //'student name' and a number of 'attended' lectures of this 'student'
    output = outputOfObj.filter((element, index) => index < N)
                        //From every one of 'N' first members take 'student name'  
                        //and return array of size 'N' of studet names                      
                        .map((el) => el.studentName);
    
    //Print the array of 'N' members for keeping in final order of names of students
    //ordered by the number of their most attended lectures by descending order
    console.log("Output:", output);
    
    //For printing Bold Black for 'Output:'
    //console.log('\x1b[1m\x1b[30m%s\x1b[0m', "Output:", output);  
          
}

//Run the main function with an array of students,
//an array of attendees of students, and return 'N'(3) 
//'students names' of students that most attended the lectures 
//and by descending order of number of their attended lectures
topNStudentsAttendees(students, attendees, 3);
                                