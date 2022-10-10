/*
Project: Golf Score App
For: Mountainland Technical College
Type: project assignment
Developer: TrC-Mt (GitHub username)
Due date: 10-27-2022
Start date: 10-6-2022
*/
//=============================================================
// ----- Setup section -----
render();
function log(){
    console.log(Courses)
    console.log('CourseData:')
    console.log(CourseData)
}

function SwitchCourse(){
    if(CN < 2){
        CN += 1
    }
    else{
        CN = 0
    }
    render();
}

var CN = 0;
var Courses = null;
var CourseData = null;

async function fetchdata(){
    Courses = await getAvailableCourses();
    CourseData = await getCourseData();
    log();
}

function getAvailableCourses() {
    return fetch('https://golf-courses-api.herokuapp.com/courses')
    .then((response) => {return response.json()})
}
function getCourseData(){
    var CourseId = Courses.courses[CN].id;
    return fetch('https://golf-courses-api.herokuapp.com/courses/' + CourseId)
    .then((response) => {return response.json()})
}
//-------------------Render section--------------------------------


async function render(){
    //initialize the page
    await fetchdata();
    document.getElementById('coursename').innerHTML = Courses.courses[CN].name;
    
    //make and show the amount of holes. //For this case they all have 18 holes
    var AmountOfHoles = CourseData.data.holeCount
    var FirstRowHTML = `<div class="column heading left-heading">Hole</div>`
    var num1 = 0
    for(let i = 0; i < AmountOfHoles; i++){
        num1 += 1
        FirstRowHTML += `<div class="column heading">${num1}</div>`
    }
    FirstRowHTML += '<div class="column heading">Out</div>'
    document.getElementById('HolesAmount').innerHTML = FirstRowHTML

    //get the teebox number
    var TBN = Number(document.getElementById('TBN').value)

    //make and show the yardage of each hole.
    var SecondRowHTML = `<div class="column heading left-heading">Yardage</div>`
    var TotalYards = 0;
    for(let i = 0; i < AmountOfHoles; i++){
        SecondRowHTML += `<div class="column">${CourseData.data.holes[i].teeBoxes[TBN].yards}</div>`
        TotalYards += CourseData.data.holes[i].teeBoxes[TBN].yards
    }
    SecondRowHTML += `<div class="column">${TotalYards}</div>`
    document.getElementById('Yardage').innerHTML = SecondRowHTML

    //make and show the par of each hole.
    var ThirdRowHTML = `<div class="column heading left-heading">Par</div>`
    var TotalPar = 0;
    for(let i = 0; i < AmountOfHoles; i++){
        ThirdRowHTML += `<div class="column">${CourseData.data.holes[i].teeBoxes[TBN].par}</div>`
        TotalPar += CourseData.data.holes[i].teeBoxes[TBN].par
    }
    ThirdRowHTML += `<div class="column">${TotalPar}</div>`
    document.getElementById('Pars').innerHTML = ThirdRowHTML

    //make and show the HanDCap of each hole.
    var FourthRowHTML = `<div class="column heading left-heading">Handicap</div>`
    var TotalHCP = 0;
    for(let i = 0; i < AmountOfHoles; i++){
        FourthRowHTML += `<div class="column">${CourseData.data.holes[i].teeBoxes[TBN].hcp}</div>`
        TotalHCP += CourseData.data.holes[i].teeBoxes[TBN].hcp
    }
    FourthRowHTML += `<div class="column">${TotalHCP}</div>`
    document.getElementById('Pars').innerHTML = FourthRowHTML

    //Note to self: combine the for loops into one.

    //Rendering players

    // var FifthRowHTML = ``
    // for(var i = 0; i </*amount of players*/; i++){
    //     var PlrTotalScore = 0
    //     FifthRowHTML += `<div class="row">`
    //     FifthRowHTML += `<div class="column heading left-heading">${/*Player[i].name*/ }</div>`
    //     for(var j = 0; j < /*Player[i].scores.length */; j++){
    //         FifthRowHTML += `<div class="column">${/*Player[i].scores[j] */}</div>`
    //         PlrTotalScore += /*Player[i].scores[j] */
    //     }
    //     FifthRowHTML += `<div class="column">${PlrTotalScore}</div>`
    //     FifthRowHTML += `</div>`
    // }
    // document.getElementById('Players').innerHTML = FifthRowHTML
    

}
//-----------------Player objects--------------------
class Player {
    constructor(name, id, scores = []) {
      this.name = name;
      this.id = id;
      this.scores = scores; //Somehow set a max length of the amount of holes
    }
  }
  
  var PlrIdValue = 0
  function addPlr(){
    PlrIdValue += 1
    console.log('PlrIdValue:')
    console.log(PlrIdValue)
    PlrId = 'Plr' + PlrIdValue
    if(PlrIdValue <= 4){
        new Player(document.getElementById('PlrNm').value, id = PlrId)
    }
    else{
        document.getElementById('PlrAdd').innerHTML = `Max Players!`
        document.getElementById('PlrAdd').style.backgroundColor = `#4D4932`
        document.getElementById('PlrAdd').style.color = `rgb(255, 0, 0)`
    }
  }

//------------- Misc section ----------


//CourseData.data.holes[HoleNumber].teeBoxes[TeeBoxNumber].//par, yards, hcp


//==========================================================
