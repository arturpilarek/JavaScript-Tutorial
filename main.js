const tableOfContentUl = document.querySelector(".tableContent")
const contentContainer = document.querySelector(".contentContainer")
const progress = document.getElementById("progressBar")
let currentContentIndex = 0
const sectionDone = []
let progressAmount = 0

// event delegation, was necessary to add event listeners
// to the future html elements, which does not yet exist
// if you want to add any event listener in contentContainer, fx. on some button or input, put it here
contentContainer.addEventListener("click", (e) => {
  // Next lesson button
  if (e.target.classList.contains("btn-next")) {
    const getNextLiData =
      allLi[currentContentIndex + 1].getAttribute("data-topic")
    changeSection(getNextLiData)
    addSectionDone()
    currentContentIndex++
    // Fuction to highlight the current li
    currentLiHighlight(getSection())
    // Progrees Bar move
    progressBar()
    // Previous Lesson button
  } else if (e.target.classList.contains("btn-prev")) {
    const getPrevLiData =
      allLi[currentContentIndex - 1].getAttribute("data-topic")
    changeSection(getPrevLiData)
    addSectionDone()
    currentContentIndex--
    // Function to highlight the current li
    currentLiHighlight(getSection())
  }
})

let moveProcent = 100 / 40

const progressBar = () => {
  let moveBy = progressAmount
  progress.innerText = Math.floor(moveBy * moveProcent) + "%"
  progress.style.setProperty("--width", moveBy * moveProcent + "%")
}

// this function clones content from template and is inserting it into the contentContainer
const changeSection = (dataAttribute) => {
  const targetContent = document
    .querySelector(`.${dataAttribute}`)
    .content.cloneNode(true)
  while (contentContainer.firstChild) {
    contentContainer.firstChild.remove()
  }
  contentContainer.appendChild(targetContent)
}

// Select all .liststyle li
const allLi = Array.from(document.querySelectorAll(".liststyle li"))

allLi.forEach((element, index) => {
  element.addEventListener("click", () => {
    currentContentIndex = index
    currentLiHighlight(element)
    // element data takes data-topic value, which is the name of the template class
    const elementData = element.getAttribute("data-topic")
    // if li has a data-topic attribute, so go further
    if (elementData) {
      changeSection(elementData)
    }
  })
})

// get the current section function
const getSection = () => {
  return allLi.find((li) => {
    return (
      li.getAttribute("data-topic") ==
      allLi[currentContentIndex].getAttribute("data-topic")
    )
  })
}

// Highlight the current selected section
const currentLiHighlight = (highligthedElement) => {
  allLi.forEach((li, index) => {
    li.removeAttribute("id")
    if (index == currentContentIndex) {
      highligthedElement.id = "highlight"
    }
  })
}

const addSectionDone = () => {
  const section = getSection()
  if (!sectionDone.includes(section)) {
    sectionDone.push(section)

    progressAmount = sectionDone.length
    console.log(sectionDone.length)
    sectionDone.forEach((li) => {
      li.classList.add("done")
    })
    // if last element of section Done
    if (sectionDone.length == 39) {
      allLi[39].classList.add("done")
      progressAmount++
      progressBar()
    }
  }
}
console.log(allLi.length)

// At page load
changeSection(allLi[0].getAttribute("data-topic"))
currentLiHighlight(allLi[0])
