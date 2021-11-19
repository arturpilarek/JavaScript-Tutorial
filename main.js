const tableOfContentUl = document.querySelector(".tableContent")
const contentContainer = document.querySelector(".contentContainer")
let currentContentIndex
const sectionDone = []

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
    // Previous Lesson button
  } else if (e.target.classList.contains("btn-prev")) {
    const getPrevLiData =
      allLi[currentContentIndex - 1].getAttribute("data-topic")
    changeSection(getPrevLiData)
    addSectionDone()
    currentContentIndex--
    // Function to highlight the current li
    currentLiHighlight(getSection())
  } else {
    console.log("Missed")
  }
})

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
    sectionDone.forEach((li) => {
      li.classList.add("done")
    })
  }
}

// Future cookies
// let count = 0
// const storage = window.localStorage

// var test = new Date()

// var date = test.getDate() + "/" + test.getMonth() + "/" + test.getFullYear()

// console.log(date)

// document.querySelector(".tableOfContent").addEventListener("click", () => {
//   count++
//   document.cookie = `amount=${count}; expires=${Date.now()}`
// })

// Future error handling in code box

// function throw_msg() {
//   try {
//     var a = ""
//     alert(b)
//     console.lug("asdsa")
//   } catch (throw_error) {
//     document.getElementById("error-box").innerHTML = throw_error.message
//     setTimeout(function () {
//       document.getElementById("error-box").innerHTML = ""
//     }, 2000)
//   }
// }

// throw_msg()

// window.onerror = function (e) {
//   document.getElementById("error-box").innerHTML = e.toString()
// }

// setInterval(() => {
//   for (let i = 0; i < true; i++) {
//     console.lung(`asdsada ${i}`)
//   }
// }, 1)
