import * as grid from './grid.js'

const VERYEASY='ABCDEFGHIJKLMNOPQRSTUVXWYZ12345679♠♥♦♣'//'□△◇○'
const EASY=VERYEASY.slice(0,26+9)
const DIFFICULTIES={
  'Very easy':VERYEASY,
  'Easy':EASY,
  'Medium':EASY.slice(0,EASY.length/2),
  'Hard':EASY.slice(0,EASY.length/3),
  'Very hard':'12345679',
}
const VIEW=document.querySelector('#difficulties')
const BUTTON=VIEW.querySelector('template#difficulty').content.childNodes[0]

export var choice=false

function select(difficulty){
  choice=DIFFICULTIES[difficulty]
  VIEW.classList.add('hidden')
  grid.show()
}

export function setup(){
  for(let d of Object.keys(DIFFICULTIES)){
    let b=BUTTON.cloneNode(true)
    b.textContent=d
    b.onclick=()=>select(b.textContent)
    VIEW.appendChild(b)
  }
}

export function show(){VIEW.classList.remove('hidden')}
