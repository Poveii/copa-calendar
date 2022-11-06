import "./style.css"

function createGame(player1, hour, player2) {
  return `
    <li>
      <img src="./assets/${player1}-flag.svg" alt="Bandeira do país ${player1}" 
      title="${player1[0].toUpperCase() + player1.substr(1)}" />

      <strong>${hour}</strong>

      <img src="./assets/${player2}-flag.svg" alt="Bandeira do país ${player2}" 
      title="${player2[0].toUpperCase() + player2.substr(1)}" />
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

document.querySelector("#cards").innerHTML =
  createCard("20/11", "domingo", createGame("qatar", "13:00", "ecuador")) +
  createCard(
    "21/11",
    "segunda",
    createGame("england", "10:00", "iran") +
      createGame("senegal", "13:00", "netherlands") +
      createGame("united-states", "16:00", "wales")
  ) +
  createCard(
    "22/11",
    "terça",
    createGame("argentina", "07:00", "saudi-arabia") +
      createGame("denmark", "10:00", "tunisia") +
      createGame("mexico", "13:00", "poland") +
      createGame("france", "16:00", "australia")
  ) +
  createCard(
    "23/11",
    "quarta",
    createGame("morocco", "07:00", "croatia") +
      createGame("germany", "10:00", "japan") +
      createGame("spain", "13:00", "costa-rica") +
      createGame("belgium", "16:00", "canada")
  ) +
  createCard(
    "24/11",
    "quinta",
    createGame("switzerland", "07:00", "cameroon") +
      createGame("uruguay", "10:00", "south-korea")
  )

const bodyElement = document.querySelector("body")
const themeList = ["blue", "green", ""]
let index = 0
setInterval(() => {
  bodyElement.className = themeList[index]
  index < 2 ? index++ : (index = 0)
}, 30000)
