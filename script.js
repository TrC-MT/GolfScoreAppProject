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
    return fetch('https://golf-courses-api.herokuapp.com/courses') //This site is gone now. I cannot find it in the wayback machine.
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
    
    //show the selected teebox
    if(TBN <= 3){
        document.getElementById('teetype').innerHTML = CourseData.data.holes[0].teeBoxes[TBN].teeType
    }
    

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
    document.getElementById('Handicaps').innerHTML = FourthRowHTML

    //Note to self: combine the for loops into one.

    //Rendering players

    var FifthRowHTML = ``
    var fullScores = 0
    for(var i = 0; i < players.length; i++){
        var PlrTotalScore = 0
        FifthRowHTML += `<div class="row">`
        FifthRowHTML += `<div class="column heading left-heading">${players[i].name}   <u>id=${players[i].id}</u></div>`
        for(var j = 0; j < AmountOfHoles; j++){
            var currentScore = Number(players[i].scores[j] || 0)
            FifthRowHTML += `<div class="column">${currentScore}</div>`
            PlrTotalScore += currentScore

            //if all the scores are filled out
            
            if((j == (AmountOfHoles-1)) && (players[i].scores[j] != (0 || undefined))){
                fullScores += 1
                if(fullScores == players.length){
                    document.getElementsByTagName('footer')[0].style.visibility = 'visible'
                }
            }
        }
        FifthRowHTML += `<div class="column">${PlrTotalScore}</div>`
        FifthRowHTML += `</div>`
    }
    document.getElementById('Players').innerHTML = FifthRowHTML


    //Making sad color scheme if wanted
    if(CS == true){
        ColorScheme()
    }
}
//-----------------Player section--------------------
class Player {
    constructor(name, id, scores = []) {
      this.name = name;
      this.id = id;
      this.scores = scores; //Somehow set the max length to the amount of holes
    }
  }

  //Warning global variable!!!
  var players = [] //[{name: value, id: value, score: [number, number, number]}, {name: value, id: value, score: [number, number, number]}]
  //Warning global variable!!!

  //adding a player
  var PlrIdValue = 0
  function addPlr(){
    PlrIdValue += 1
    PlrId = 'Plr' + PlrIdValue
    if(PlrIdValue <= 4){
        var NewPlayer = new Player(document.getElementById('PlrNm').value, id = PlrId)
        players.push(NewPlayer)
    }
    else{
        document.getElementById('PlrAdd').innerHTML = `Max Players!`
        document.getElementById('PlrAdd').style.backgroundColor = `#4D4932`
        document.getElementById('PlrAdd').style.color = `rgb(255, 0, 0)`
    }
    render();
  }

  //adding a player.scores
  function addPlrScr(){
    PId = document.getElementById('PlrId').value
    
    for(var i = 0; i < players.length;){
        if(players[i].id == PId){   // Remember that max length value somehow

            if(players[i].scores[players[i].scores.length-1] === null){
                players[i].scores.pop()
            }
            
            players[i].scores.push(document.getElementById('PlrScr').value)

            i++
        }
        else{
            i++
        }
    }
    render();
  }
  //undo a player.scores
  function undoPlrScr(){
    PId = document.getElementById('PlrId').value
    
    for(var i = 0; i < players.length;){
        if(players[i].id == PId){
            console.log('popping the score')
            console.log('before')
            console.log(players[i].scores)
            players[i].scores.pop()
            console.log('after')
            console.log(players[i].scores)
            i++
        }
        else{
            i++
        }
    }
    render();
  }
//-------------------Save + restore section----------------
function save(){
    
}
function restore(){

}
//Note to self: finish the congradulations first.


//------------- Misc section ----------


//CourseData.data.holes[HoleNumber].teeBoxes[TeeBoxNumber].//par, yards, hcp

//--------------------Sad Color Scheme-----------------------

//Warning global variable!!!
var CS = false
//Warning global variable!!!

//Central color #727872
function ColorScheme(){
    CS = true
    for(var i = 0; i < document.getElementsByClassName('navInput').length; i++){
        document.getElementsByClassName('navInput')[i].style.backgroundColor = '#818577'
    }
    
    for(var i = 0; i <document.getElementsByTagName('button').length; i++){
        document.getElementsByTagName('button')[i].style.backgroundColor = '#868F81'
        document.getElementsByTagName('button')[i].style.color = '#FFA99E'    
    }
    
    document.getElementsByTagName('main')[0].style.backgroundColor = '#77857F'

    document.getElementsByTagName('body')[0].style.backgroundColor = '#77857F'

    document.getElementsByTagName('header')[0].style.backgroundColor = '#818F85'

    for(var i = 0; i < document.getElementsByClassName('row').length; i++){
        document.getElementsByClassName('row')[i].style.backgroundColor = '#868F81'
    }
    
    for(var i = 0; i < document.getElementsByClassName('column').length; i++){
        document.getElementsByClassName('column')[i].style.color = '#DDDDDD'
    }
    for(var i = 0; i < document.getElementsByClassName('heading').length; i++){
        document.getElementsByClassName('heading')[i].style.color = '#FFFFFF'
    }
    
    for(var i = 0; i < document.getElementsByTagName('u').length; i++){
        document.getElementsByTagName('u')[i].style.color = '#84607C'
    }

    document.getElementsByTagName('footer')[0].style.backgroundColor = '#E6E18E'
    document.getElementsByTagName('footer')[0].style.color = '#94C794'

}

//==========================================================
