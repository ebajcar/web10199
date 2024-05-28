#Sudoku Generator Algorithm - www.101computing.net/sudoku-generator-algorithm/
import turtle
from random import randint, shuffle
from time import sleep

#initialise empty 9 by 9 grid
grid = []
grid.append([0, 0, 0, 0, 0, 0, 0, 0, 0])
grid.append([0, 0, 0, 0, 0, 0, 0, 0, 0])
grid.append([0, 0, 0, 0, 0, 0, 0, 0, 0])
grid.append([0, 0, 0, 0, 0, 0, 0, 0, 0])
grid.append([0, 0, 0, 0, 0, 0, 0, 0, 0])
grid.append([0, 0, 0, 0, 0, 0, 0, 0, 0])
grid.append([0, 0, 0, 0, 0, 0, 0, 0, 0])
grid.append([0, 0, 0, 0, 0, 0, 0, 0, 0])
grid.append([0, 0, 0, 0, 0, 0, 0, 0, 0])

myPen = turtle.Turtle()
myPen.tracer(0)
myPen.speed(0)
myPen.color("#000000")
myPen.hideturtle()
topLeft_x=-150
topLeft_y=150

def text(message,x,y,size):
    FONT = ('Arial', size, 'normal')
    myPen.penup()
    myPen.goto(x,y)    		  
    myPen.write(message,align="left",font=FONT)

#A procedure to draw the grid on screen using Python Turtle
def drawGrid(grid):
  intDim=35
  for row in range(0,10):
    if (row%3)==0:
      myPen.pensize(3)
    else:
      myPen.pensize(1)
    myPen.penup()
    myPen.goto(topLeft_x,topLeft_y-row*intDim)
    myPen.pendown()
    myPen.goto(topLeft_x+9*intDim,topLeft_y-row*intDim)
  for col in range(0,10):
    if (col%3)==0:
      myPen.pensize(3)
    else:
      myPen.pensize(1)    
    myPen.penup()
    myPen.goto(topLeft_x+col*intDim,topLeft_y)
    myPen.pendown()
    myPen.goto(topLeft_x+col*intDim,topLeft_y-9*intDim)

  for row in range (0,9):
      for col in range (0,9):
        if grid[row][col]!=0:
          text(grid[row][col],topLeft_x+col*intDim+9,topLeft_y-row*intDim-intDim+8,18)


#A function to check if the grid is full
def checkGrid(grid):
  for row in range(0,9):
      for col in range(0,9):
        if grid[row][col]==0:
          return False

  #We have a complete grid!  
  return True 

#A backtracking/recursive function to check all possible combinations of numbers until a solution is found
def solveGrid(grid):
  global counter
  #Find next empty cell
  for i in range(0,81):
    row=i//9
    col=i%9
    if grid[row][col]==0:
      for value in range (1,10):
        #Check that this value has not already be used on this row
        if not(value in grid[row]):
          #Check that this value has not already be used on this column
          if not value in (grid[0][col],grid[1][col],grid[2][col],grid[3][col],grid[4][col],grid[5][col],grid[6][col],grid[7][col],grid[8][col]):
            #Identify which of the 9 squares we are working on
            square=[]
            if row<3:
              if col<3:
                square=[grid[i][0:3] for i in range(0,3)]
              elif col<6:
                square=[grid[i][3:6] for i in range(0,3)]
              else:  
                square=[grid[i][6:9] for i in range(0,3)]
            elif row<6:
              if col<3:
                square=[grid[i][0:3] for i in range(3,6)]
              elif col<6:
                square=[grid[i][3:6] for i in range(3,6)]
              else:  
                square=[grid[i][6:9] for i in range(3,6)]
            else:
              if col<3:
                square=[grid[i][0:3] for i in range(6,9)]
              elif col<6:
                square=[grid[i][3:6] for i in range(6,9)]
              else:  
                square=[grid[i][6:9] for i in range(6,9)]
            #Check that this value has not already be used on this 3x3 square
            if not value in (square[0] + square[1] + square[2]):
              grid[row][col]=value
              if checkGrid(grid):
                counter+=1
                break
              else:
                if solveGrid(grid):
                  return True
      break
  grid[row][col]=0  

numberList=[1,2,3,4,5,6,7,8,9]
#shuffle(numberList)

#A backtracking/recursive function to check all possible combinations of numbers until a solution is found
def fillGrid(grid):
  global counter
  #Find next empty cell
  for i in range(0,81):
    row=i//9
    col=i%9
    if grid[row][col]==0:
      shuffle(numberList)      
      for value in numberList:
        #Check that this value has not already be used on this row
        if not(value in grid[row]):
          #Check that this value has not already be used on this column
          if not value in (grid[0][col],grid[1][col],grid[2][col],grid[3][col],grid[4][col],grid[5][col],grid[6][col],grid[7][col],grid[8][col]):
            #Identify which of the 9 squares we are working on
            square=[]
            if row<3:
              if col<3:
                square=[grid[i][0:3] for i in range(0,3)]
              elif col<6:
                square=[grid[i][3:6] for i in range(0,3)]
              else:  
                square=[grid[i][6:9] for i in range(0,3)]
            elif row<6:
              if col<3:
                square=[grid[i][0:3] for i in range(3,6)]
              elif col<6:
                square=[grid[i][3:6] for i in range(3,6)]
              else:  
                square=[grid[i][6:9] for i in range(3,6)]
            else:
              if col<3:
                square=[grid[i][0:3] for i in range(6,9)]
              elif col<6:
                square=[grid[i][3:6] for i in range(6,9)]
              else:  
                square=[grid[i][6:9] for i in range(6,9)]
            #Check that this value has not already be used on this 3x3 square
            if not value in (square[0] + square[1] + square[2]):
              grid[row][col]=value
              if checkGrid(grid):
                return True
              else:
                if fillGrid(grid):
                  return True
      break
  grid[row][col]=0             
    
#Generate a Fully Solved Grid
fillGrid(grid)
drawGrid(grid) 
myPen.getscreen().update()
sleep(1)


#Start Removing Numbers one by one

#A higher number of attempts will end up removing more numbers from the grid
#Potentially resulting in more difficiult grids to solve!
attempts = 5 
counter=1
while attempts>0:
  #Select a random cell that is not already empty
  row = randint(0,8)
  col = randint(0,8)
  while grid[row][col]==0:
    row = randint(0,8)
    col = randint(0,8)
  #Remember its cell value in case we need to put it back  
  backup = grid[row][col]
  grid[row][col]=0
  
  #Take a full copy of the grid
  copyGrid = []
  for r in range(0,9):
     copyGrid.append([])
     for c in range(0,9):
        copyGrid[r].append(grid[r][c])
  
  #Count the number of solutions that this grid has (using a backtracking approach implemented in the solveGrid() function)
  counter=0      
  solveGrid(copyGrid)   
  #If the number of solution is different from 1 then we need to cancel the change by putting the value we took away back in the grid
  if counter!=1:
    grid[row][col]=backup
    #We could stop here, but we can also have another attempt with a different cell just to try to remove more numbers
    attempts -= 1
  
  myPen.clear()
  drawGrid(grid) 
  myPen.getscreen().update()

print("Sudoku Grid Ready")