
/* Grabbing the relevant DOM elements to use them in javascript */
const projectNameEl = document.querySelector('#project-name')
const nextTaskEl = document.querySelector('#next-task')
const taskHistoryEl = document.querySelector('#task-history')
const resetButtonEl = document.querySelector('#reset-button')
const topLiButton = document.createElement('button')


/* This function checks if there's anything in localstorage and puts an empty array in there if there isn't */
const checkLocalStorage = function() {
  //grab whatever is in local storage
  let storedHistory = localStorage.getItem('storedHistory')
  //check if there's anything there
  if (!storedHistory) {
    //if there's nothing there, put in an empty array
    localStorage.setItem('storedHistory', JSON.stringify([]))
    //then pull that blank array out and store it in stored history
    storedHistory = localStorage.getItem('storedHistory')
    //then return the stored history
    return JSON.parse(storedHistory)
  } else {
    //otherwise just return the stored history
    return JSON.parse(storedHistory)
  }
}

// grab whatever is in local storage and store it in task history
let taskHistory = checkLocalStorage() //should return either an empty array or an array of objects

// create variable for the interval and timeDisplay
let timeDisplay = 0
let defaultName = 'default name'
let idValue = 0
let taskTimerID = null

//create a variable to hold the task properties
let nextTask = {
  id: idValue,
  name: '',
  time: 0
}

const intervalFunction = function(task) {
  if (taskTimerID) {
    clearInterval(taskTimerID)
    // firstLi.removeChild(topLiButton)
  }
  taskTimerID = setInterval(function(){
    // updateTotal()
    updateHeader(updatedTotal())
    timeDisplay++
    task.time = timeDisplay
    //store item local storage
    localStorage.setItem('storedHistory', JSON.stringify(taskHistory))

    const firstLi = document.querySelector('li')
    firstLi.innerHTML = `${task.name} - ${task.time}`
    //also add on the new button to start/stop timer
    firstLi.appendChild(topLiButton)
    // firstLi.appendChild(resumeLiButton)
  }, 1000)
}

//on click, stop the timer
topLiButton.addEventListener('click', function() {
  // debugger
  if (taskTimerID) clearInterval(taskTimerID)
  console.log(topLiButton)
  firstTask.removeChild(topLiButton)
  // intervalFunction(taskHistory[0])

  // console.log('sup')
})


//on submission, add stuff to history and clear the input box
nextTaskEl.addEventListener('change', function(e) {

  //iterate the idValue
  idValue++
  //assign new value to the task
  nextTask.id = idValue
  //assign the input value to the name
  nextTask.name = e.target.value

  taskHistory.push(nextTask)
  //push new history to local storage
  localStorage.setItem('storedHistory', JSON.stringify(taskHistory))

  //empty the div out, then update the div with the new history values by iterating over them
  renderUpdatedHistory(taskHistory)
  intervalFunction(nextTask)

  //clear out the input box
  nextTaskEl.value = null

  //empty out the nexttask variable properties
  timeDisplay = 0
  nextTask = emptyNextTask()
})

//empty out the next task template
const emptyNextTask = function() {

  return {
    id: idValue,
    name: defaultName,
    time: timeDisplay
  }
}

let firstTask
// write a function to show the updated task history in the proper div
const renderUpdatedHistory = function(taskHistory) {
  // clear the history div element
  taskHistoryEl.innerHTML = ''

  //create a ul to live in the history div
  const ulNode = document.createElement('ul')
  // add the ul to the history div
  taskHistoryEl.appendChild(ulNode)
  
  taskHistory = checkLocalStorage()
  // Iterate over each item in the array
  taskHistory.forEach(function(task) {
    //create the li node to append
    const taskNode = document.createElement('li')
    //add the tasks html to that li node
    taskNode.innerHTML = `${task.name} - ${task.time}`
    //add the li node above the ul's child node
    ulNode.insertBefore(taskNode, ulNode.childNodes[0])
  })

  // startTaskTimer(nextTask)
  //if the ul has a firstchild of li, give it a button
  if (document.querySelector('ul > li:first-child')) {
    firstTask = document.querySelector('ul > li:first-child')
    // const topLiButton = document.createElement('button')
    firstTask.appendChild(topLiButton).textContent = 'stop'
    // firstTask.appendChild(resumeLiButton).textContent = 'resume'
  }
}
//render based on whatever is in taskhistory at start
renderUpdatedHistory(taskHistory)

//setup button to reset history when clicked and then render list again
resetButtonEl.addEventListener('click', function() {
  // reset the history
  taskHistory = []
  // upload that history to local storage
  localStorage.setItem('storedHistory', JSON.stringify(taskHistory))
  timeDisplay = 0
  total = 0
  updateHeader(0)
  // rerender the history
  renderUpdatedHistory(taskHistory)
  clearInterval(taskTimerID)

})

// let total = 0
//make a function that counts up all the seconds
const updatedTotal = function() {
  let total = 1
  taskHistory.forEach(function(arrayItem) {
    total = total + arrayItem.time
    // console.log(total)
  })
  return total
}
// make a function that updates the header
const updateHeader = function(total) {
  const headerEl = document.querySelector('#project-time')
  // debugger
  console.log(total)
  headerEl.innerHTML = `${total} seconds`
}