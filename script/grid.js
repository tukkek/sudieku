import * as rpg from './rpg.js'
import * as difficulty from './difficulty.js'

const VIEW=document.querySelector('#grid')
const ZONE=VIEW.querySelector('template#zone').content.childNodes[0]
const CELL=ZONE.querySelector('template#cell').content.childNodes[0]
const WIN={}

class Grid{
  constructor(){
    this.zones=[]
    this.cells=Array.from(new Array(9),()=>new Array(9))
  }
  
  roll(){
    for(let z of this.zones){
      let rolls=rpg.shuffle(difficulty.choice,true)
      rolls[rpg.roll(0,8)]=false
      let i=0
      for(let x=z.x;x<z.x+3;x++) for(let y=z.y;y<z.y+3;y++) 
        this.cells[x][y].textContent=rolls[i++]||''
    }
    try{
      this.paint()
    }catch(e){
      if(e!=WIN) throw e
      this.roll()
    }
  }
  
  click(cell,zone){
    if(!cell.textContent) return
    let empty=false
    for(let x=zone.x;x<zone.x+3;x++) for(let y=zone.y;y<zone.y+3;y++){
      let c=this.cells[x][y]
      if(c.textContent) continue
      empty=c
      break
    }
    let deltax=Math.abs(cell.x-empty.x)
    let deltay=Math.abs(cell.y-empty.y)
    if(deltax==0&&deltay==0) return
    if(deltax>1||deltay>1) return
    if(deltax&&deltay) return
    empty.textContent=cell.textContent
    cell.textContent=''
    try{
      this.paint()
    }catch(e){
      if(e!=WIN) throw e
      alert('You won! 🥳')
      VIEW.classList.add('hidden')
      difficulty.show()
    }
  }
  
  validate(cell){
    if(!cell.textContent) return true
    for(let x=0;x<9;x++)
      if(x!=cell.x&&cell.textContent==this.cells[x][cell.y].textContent) return false
    for(let y=0;y<9;y++)
      if(y!=cell.y&&cell.textContent==this.cells[cell.x][y].textContent) return false
    return true
  }
  
  paint(){
    let win=true
    for(let x=0;x<9;x++) for(let y=0;y<9;y++){
      let c=this.cells[x][y]
      let v=this.validate(c)
      c.setAttribute('valid', v)
      if(!v) win=false
    }
    if(win) throw WIN
  }
}

export var grid=new Grid()

function draw(zone,xp,yp){
  for(let y=2+yp;y>=yp;y--)
    for(let x=xp;x<3+xp;x++){
      let c=CELL.cloneNode(true)
      c.x=x
      c.y=y
      c.onclick=()=>grid.click(c,zone)
      grid.cells[x][y]=c
      zone.appendChild(c)
    }
}

export function setup(){
  for(let y=2;y>=0;y--)
    for(let x=0;x<3;x++){
      let z=ZONE.cloneNode(true)
      z.x=x*3
      z.y=y*3
      draw(z,z.x,z.y)
      VIEW.appendChild(z)
      grid.zones.push(z)
    }
}

export function show(){
  VIEW.classList.remove('hidden')
  grid.roll()
}
