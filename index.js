function createEmployeeRecord(array){
return {
  firstName: array[0],
  familyName:array[1],
  title :array[2],
  payPerHour:array[3],
  timeInEvents:[],
  timeOutEvents: []
}
}

function createEmployeeRecords(array)
{
    return array.map(ele=>createEmployeeRecord(ele))
}

let createTimeInEvent = function(employee, dateStamp){
    let [date, hour] = dateStamp.split(' ')

    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })

    return employee
}

   
   function createTimeOutEvent(record, dateStamp) {
 let [date,hour] = dateStamp.split(' ');
   record.timeOutEvents.push({ 
   type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })
   return record;
 }
 
  function hoursWorkedOnDate(record, dateStamp){
let inEvent = record.timeInEvents.find(ele=> ele.date === dateStamp)
let outEvent = record.timeOutEvents.find(ele=> ele.date ===dateStamp)
return (outEvent.hour- inEvent.hour)/100;
 }

   
function wagesEarnedOnDate(record, dateStamp){
  return hoursWorkedOnDate(record,dateStamp) * record.payPerHour;
}   
   
function allWagesFor(employee){
let time = employee.timeInEvents.map(event => event.date)
return time.reduce((total,date)=> total + wagesEarnedOnDate(employee, date), 0)
}
   
function calculatePayroll(employee){
  return employee.reduce((total,ele) => total + allWagesFor(ele), 0)
}

function findEmployeeByFirstName(record, firstName){
return record.find(ele=> ele.firstName === firstName)
}