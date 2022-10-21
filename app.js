document.addEventListener('DOMContentLoaded', () => {
    const gridDisplay = document.querySelector(".grid")
    const scoreDisplay = document.getElementById("score")
    const resultDisplay = document.getElementById("result")
    const width = 4
    let squares = []
    let valid = false
    let score = 0
    function createBoard(){
        for(let i = 0; i<width*width;i++){
            square = document.createElement('div')
            square.innerHTML = 0
            gridDisplay.appendChild(square)
            squares.push(square)
        }
        generate()
        generate()
    }
    createBoard()


    function generate(){
        let number = Math.floor(Math.random()*squares.length)
        if(squares[number].innerHTML == 0){
            squares[number].innerHTML = 2
        }else generate()
    }

    function checkWin(){
        for(let i = 0;i<squares.length;i++){
            if(squares[i].innerHTML == 2048)
            {
                resultDisplay.innerHTML = "You Win"
                document.removeEventListener('keyup',control)
            }
        }
    }

    function checkLose(){
        let lose = true
        for(let i = 0;i<squares.length;i++){
            if(squares[i].innerHTML == 0)
            {
                lose = false
            } 
        }
        if(lose){
            resultDisplay.innerHTML = "You Lose"
            document.removeEventListener('keyup',control)
        }
    }


    function moveRight(){
        for (let i = 0;i<width*width;i=i+width){
            let newRow = []

            //make a new array containing non zero elements
            for (let j = 0;j<width;j++){
                if (squares[i+j].innerHTML != 0){
                        newRow.push(parseInt(squares[i+j].innerHTML))
                }
            }
            console.log(newRow)
            //add the elements if they repeat
            for (let j = newRow.length-1;j>0;j--){
                if (newRow[j]===newRow[j-1])
                {
                    
                    newRow[j]=newRow[j]*2
                    score = score+newRow[j]
                    newRow.splice(j-1,1)
                }
            }
            //fill rest of the spaces with zeros
            let zeros = Array(width-newRow.length).fill(0)
            newRow = zeros.concat(newRow)
            for (let j = 0;j<width;j++){
                if(squares[i+j].innerHTML != newRow[j]){
                    valid = true
                }
                squares[i+j].innerHTML = newRow[j]
            }
        }

    }

    function moveLeft(){
        for (let i = 0;i<width*width;i=i+width){
            let newRow = []
            for (let j = 0;j<width;j++){
                if (squares[i+j].innerHTML != 0){
                        newRow.push(parseInt(squares[i+j].innerHTML))
                }
            }
            for (let j = 0;j<newRow.length-1;j++){
                if (newRow[j]==newRow[j+1])
                {
                    newRow[j]=newRow[j]*2
                    score = score+newRow[j]
                    newRow.splice(j+1,1)
                }
            }

            let zeros = Array(width-newRow.length).fill(0)
            newRow = newRow.concat(zeros)
            for (let j = 0;j<width;j++){
                if(squares[i+j].innerHTML != newRow[j]){
                    valid = true
                }
                squares[i+j].innerHTML = newRow[j]
            }
        }

    }

    function moveDown(){
        for (let i = 0;i<width;i++){
            let newCol = []
            for (let j = 0;j<width*width;j=j+width){
                if (squares[i+j].innerHTML != 0){
                        newCol.push(parseInt(squares[i+j].innerHTML))
                }
            }
            for (let j=newCol.length-1;j>0;j--){
                if (newCol[j]===newCol[j-1])
                {   
                    newCol[j]=newCol[j]*2
                    score = score+newCol[j]
                    newCol.splice(j-1,1)
                }
            }
 

            let zeros = Array(width-newCol.length).fill(0)
            newCol = zeros.concat(newCol)
            for (let j = 0;j<width*width;j=j+width){
                if(squares[i+j].innerHTML != newCol[j/width]){
                    valid = true
                }
                squares[i+j].innerHTML = newCol[j/width]
            }
        }

    }

    function moveUp(){
        for (let i = 0;i<width;i++){
            let newCol = []
            for (let j = 0;j<width*width;j=j+width){
                if (squares[i+j].innerHTML != 0){
                        newCol.push(parseInt(squares[i+j].innerHTML))
                }
            }

            for (let j=0;j<newCol.length-1;j++){
                if (newCol[j]===newCol[j+1])
                {
                    newCol[j]=newCol[j]*2
                    score = score+newCol[j]
                    newCol.splice(j+1,1)
                }
            }
            
            let zeros = Array(width-newCol.length).fill(0)
            newCol = newCol.concat(zeros)
            for (let j = 0;j<width*width;j=j+width){
                console.log(i+j,j/width)
                if(squares[i+j].innerHTML != newCol[j/width]){
                    valid = true
                }
                squares[i+j].innerHTML = newCol[j/width]
            }
        }

    }




    function control(e){
        if(e.keyCode == 87){
            valid = false
            moveUp()
            if(valid){
                generate()
            }
        }
        else if(e.keyCode == 83){
            valid = false
            moveDown()
            if(valid){
                generate()
            }
        }
        else if(e.keyCode == 65){
            valid = false
            moveLeft()
            if(valid){
                generate()
            }
        }
        else if(e.keyCode == 68){
            valid = false
            moveRight()
            if(valid){
                generate()
            }
        }
        checkWin()
        checkLose()
        scoreDisplay.innerHTML = score
    }



    document.addEventListener('keyup',control)

})