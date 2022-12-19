import "./style.css"

function giveDayDate(date) {
  const weekDays = [
    "Domingo",
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
  ]

  let index = new Date(`2022-${date} 12:00:00`).getDay()
  return weekDays[index]
}

function giveFormattedDate(date) {
  let newDate = new Date(date)
  let day = newDate.getDate()
  let month = newDate.getMonth()
  if (day <= 9) day = `0${newDate.getDate()}`
  return `${month + 1}-${day}`
}

function giveHourDate(date) {
  let hour = new Date(date).getHours()
  if (hour <= 9) hour = `0${hour}`
  return `${hour}:00`
}

function addGameCard(conditional, [games, date]) {
  if (conditional) return

  const createdGames = games.map((game) => {
    return createGame(
      game.homeTeam,
      giveHourDate(game.date),
      game.awayTeam,
      game.status
    )
  })

  const dayDate = giveDayDate(date)
  date = date.split("-").reverse().join("/")

  document.querySelector("#cards").innerHTML += createCard(
    date,
    dayDate,
    createdGames.join("")
  )
}

const preliminariesButton = document.querySelector("#preliminaries")
const finalsButton = document.querySelector("#finals")
fetch("https://copa22.medeiro.tech/matches")
  .then((response) => response.json())
  .then((api) => {
    const gamesGroupedByDate = {}
    api.forEach((game) => {
      const gameDate = giveFormattedDate(game.date)

      if (!gamesGroupedByDate[gameDate]) {
        gamesGroupedByDate[gameDate] = []
      }

      gamesGroupedByDate[gameDate].push(game)
    })

    Object.entries(gamesGroupedByDate).forEach(([date, games]) => {
      addGameCard(date <= "12-02", [games, date])
    })

    preliminariesButton.addEventListener("click", () => {
      document.querySelector("#cards").innerHTML = ""
      animationDelay = -0.4
      Object.entries(gamesGroupedByDate).forEach(([date, games]) => {
        addGameCard(date >= "12-03", [games, date])
      })
    })

    finalsButton.addEventListener("click", () => {
      document.querySelector("#cards").innerHTML = ""
      animationDelay = -0.4
      Object.entries(gamesGroupedByDate).forEach(([date, games]) => {
        addGameCard(date <= "12-02", [games, date])
      })
    })
  })

function createGame(player1, hour, player2, status) {
  let { name: name1, goals: goals1 } = player1
  let { name: name2, goals: goals2 } = player2

  if (status == "scheduled") {
    goals1 = ""
    goals2 = ""
  }

  return `
    <li>
      <div class="country" title="${
        name1[0].toUpperCase() + name1.substring(1)
      }">
        <img src="./assets/${name1
          .toLowerCase()
          ?.replace(" ", "-")}-flag.svg" alt="Bandeira do país ${name1
    .toLowerCase()
    ?.replace(" ", "-")}"
         />
        <strong>${goals1}</strong>
      </div>

      <strong>${hour}</strong>

      <div class="country" title="${
        name2[0].toUpperCase() + name2.substring(1)
      }">
        <img src="./assets/${name2
          .toLowerCase()
          ?.replace(" ", "-")}-flag.svg" alt="Bandeira do país ${name2
    .toLowerCase()
    ?.replace(" ", "-")}" 
         />
        <strong>${goals2}</strong>
      </div>
    </li>
  `
}

let animationDelay = -0.4
function createCard(date, day, games) {
  animationDelay += 0.4
  return `
    <div class="card" style="animation-delay: ${animationDelay}s;">
      <h2>${date} <span>${day}</span></h2>

      <ul>
        ${games}
      </ul>
    </div>
  `
}

const bodyElement = document.querySelector("body")
const themeList = ["blue", "green", ""]
let index = 0
setInterval(() => {
  bodyElement.className = themeList[index]
  index < 2 ? index++ : (index = 0)
}, 30000)
