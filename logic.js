'use strict'

const modalForWinning = document.querySelector(".modalForWinning")
const main = document.querySelector(".main");
const lodoBox = document.getElementById("lodoBox");
const rollDiceBtn = document.getElementById("rollBtn");
const diceImg = document.getElementById("diceImg");
const players = document.querySelectorAll(".playerBox");
const holdBtn = document.getElementById("holdBtn");
const currentScoreBoxes = document.querySelectorAll(".currentScore");
const totalScoreBoxes = document.querySelectorAll(".totalScore");
const resetBtn = document.getElementById("resetBtn");

let sumDiceNum = 0;


rollDiceBtn.addEventListener("click", () => {
    let diceNum = Math.floor(Math.random() * 6) + 1;
    lodoBox.style.display = "flex"
    diceImg.src = `dice-${diceNum}-fill.svg`
    sumDiceNum += diceNum;

    changPlayer(diceNum)
    currentScore(0)
    currentScore(1)
})

holdBtn.addEventListener("click", () => {
    forTotalScore(0)
    forTotalScore(1)
    changPlayer("1")
    winnerSelection()
})

resetBtn.addEventListener("click", () => {
    location.reload()
})

function changPlayer(diceNum) {
    if (diceNum == 1) {
        sumDiceNum = 0
        currentScoreBoxes.forEach((elem) => {
            elem.textContent = sumDiceNum
        })
        players[0].classList.toggle("p1Active")
        players[1].classList.toggle("p2Active")
    }
}

function currentScore(n) {
    if (players[n].classList.contains(`p${n + 1}Active`)) {
        currentScoreBoxes[n].textContent = sumDiceNum
    }
}

function forTotalScore(n) {
    if (players[n].classList.contains(`p${n + 1}Active`)) {
        totalScoreBoxes[n].textContent = Number(totalScoreBoxes[n].textContent) + Number(currentScoreBoxes[n].textContent)
    }
}

function winnerSelection() {
    totalScoreBoxes.forEach((elem) => {
        if (elem.textContent >= 100) {
            setModal(0)
            setModal(1)
        }
    })
}

function setModal(n) {
    modalForWinning.style.height = "15vmin"
    setTimeout(() => {
        if (players[n].classList.contains(`p${n + 1}Active`)) {
            if (n == 0) {
                n = 1
            }
            else {
                n = 0;
            }
            const nameOfTheWinner = totalScoreBoxes[n].previousElementSibling.textContent
            let text = `${nameOfTheWinner} is Win 🎉`

            let i = 1;
            displayTextInModal(i, text)
        }
    }, 700)

}

function displayTextInModal(i, text) {
    const currentChar = text.substring(i - 1, i)
    modalForWinning.textContent += currentChar

    if (i <= text.length) {
        i++;

        setTimeout(() => {
            displayTextInModal(i, text)
        }, 50)
    }
}


window.addEventListener("resize", () => {
    setHeightModuleAndMain()
})
setHeightModuleAndMain()

function setHeightModuleAndMain() {
    let modalHeight = getComputedStyle(modalForWinning).getPropertyValue("height")
    main.style.height = `calc(100vh - ${modalHeight})`
}
