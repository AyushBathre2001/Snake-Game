//Initialization of variables, arrays and objects
let direction = { x: 0, y: 0 }
let speed = 4
let lastRender = 0
let snakeArr = [{ x: 12, y: 15 }]
let snakeFood = { x: 3, y: 8 }
let score = 00
let play = true
let bgState = true
let bg = new Audio('./music/bg.mp3')
bg.loop = true
let gameover = new Audio('./music/gameOver.wav')
let eating = new Audio('./music/eating.wav')


let poster = document.getElementsByClassName('poster')[0]

on.addEventListener('click', () => {
    poster.style.top = "-100%"
})
bgmusic.addEventListener('click', () => {
    if (bgmusic.style.color == "white") {
        bg.pause()
        bgmusic.style.color = "gray"
    }
    else {
        bg.play()
        bgmusic.style.color = "white"
    }
})

sound.addEventListener('click', () => {
    if (sound.style.color == "white") {
        eating.src = ""
        gameover.src = ""
        sound.style.color = "gray"
    }
    else {
        gameover = new Audio('./music/gameOver.wav')
        eating = new Audio('./music/eating.wav')
        sound.style.color = "white"
    }
})

state.addEventListener('click', () => {
    if (state.style.color == "white") {
        state.classList.remove("ri-pause-circle-fill")
        state.classList.add('ri-play-circle-fill')
        state.style.color = "#fff"
        play = false
    }
    else {
        state.classList.remove("ri-play-circle-fill")
        state.classList.add('ri-pause-circle-fill')
        state.style.color = "white"
        play = true
    }
})

//Game functions
function main(ctime) {

    //Managing FPS
    window.requestAnimationFrame(main)
    if ((ctime - lastRender) / 1000 < 1 / speed) {
        return;
    }
    lastRender = ctime
    if (play == true) {
        gameEngine()

    }
}

function isCollide(snaArr) {
    //If snake bump into itself
    for (let i = 1; i < snaArr.length; i++) {
        if (snaArr[i].x === snaArr[0].x && snaArr[i].y === snaArr[0].y) {
            return true
        }
    }
    //If snake bump into the wall
    if (snaArr[0].x <= 0 || snaArr[0].x >= 18 || snaArr[0].y <= 0 || snaArr[0].y >= 18) {
        return true
    }

    return false
}

//moving the snake
function moving() {
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] }

    }
    snakeArr[0].x = snakeArr[0].x + direction.x
    snakeArr[0].y = snakeArr[0].y + direction.y
}



function gameEngine() {

    let hs = localStorage.getItem("HS")
    //GameOver situation
    if (isCollide(snakeArr)) {
        gameover.play()
        bg.pause()
        if (score > hs) {
            alert(`Congratulations, High-Score - ${score}, press any key to start again...`)
            localStorage.setItem("HS", score)
        }
        else {

            alert(`GameOver! Score - ${score}, press any key to start again...`)
        }
        bgState = true
        bg.currentTime = "0"
        direction = { x: 0, y: 0 }
        snakeArr = [{ x: 12, y: 15 }]
        score = 00
        scr.innerText = `Score - ${score}`
    }

    //If snake eaten the food
    if (snakeArr[0].x === snakeFood.x && snakeArr[0].y === snakeFood.y) {
        eating.play()
        snakeArr.unshift({ x: snakeArr[0].x + direction.x, y: snakeArr[0].y + direction.y })
        let a = 2
        let b = 16
        snakeFood = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
        score = score + 5
        if (score > hs) {
            scr.innerText = `High Score - ${score} `
        }
        else {
            scr.innerText = `Score - ${score}`

        }
    }


    moving()


    //Display snake and food
    board.innerHTML = ""
    snakeArr.forEach((e, index) => {
        let snakeElement = document.createElement('div')
        snakeElement.style.gridRowStart = e.y
        snakeElement.style.gridColumnStart = e.x

        if (index === 0) {
            snakeElement.classList.add("head")

        }
        else {
            snakeElement.classList.add("snake")
        }

        board.appendChild(snakeElement)
    })

    let foodElement = document.createElement('div')

    foodElement.style.gridRowStart = snakeFood.y
    foodElement.style.gridColumnStart = snakeFood.x
    foodElement.classList.add("food")
    board.appendChild(foodElement)

}


//Main logic
window.requestAnimationFrame(main)



//KeyPress Events
document.addEventListener('keydown', (e) => {

    if (bgState == true) {
        bg.play()
    }
    bgState = false

    direction = { x: 0, y: 1 }
    switch (e.key) {
        case "ArrowUp":
            direction.x = 0
            direction.y = -1

            break;
        case "ArrowDown":
            direction.x = 0
            direction.y = 1

            break;
        case "ArrowLeft":
            direction.x = -1
            direction.y = 0

            break;
        case "ArrowRight":
            direction.x = 1
            direction.y = 0

            break;

        default:
            break;
    }
})