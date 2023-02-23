document.addEventListener("DOMContentLoaded", () => {
  // Initial clean up. DO NOT REMOVE.
  initialCleanup()

  document.getElementById('btn-add-line').addEventListener(
    'click', addLine)
  document.getElementById('btn-del-line').addEventListener(
    'click', delLine)

  // strategy #2: one single event handler for the whole page
  document.getElementById('grid')
    .addEventListener('click',
      (event) => {
        // this is to avoid clicks that fall between boxes
        if (event.target.id == "grid") return
        setRandomColor(event.target)
        updateTotals()
      })
  document.getElementById('grid')
    .addEventListener('mouseover',
      (event) => {
        // likewise, we discard events on the grid element itself
        if (event.target.id == "grid") return
        setHoverColor(event.target)
        updateTotals()
      })

  updateTotals()
})


/**
 * Cleans up the document so that the exercise is easier.
 *
 * There are some text and comment nodes that are in the initial DOM, it's nice
 * to clean them up beforehand.
 */
function initialCleanup() {
  const nodesToRemove = []
  document.getElementById("grid").childNodes.forEach((node, key) => {
    if (node.nodeType !== Node.ELEMENT_NODE) {
      nodesToRemove.push(node)
    }
  })
  for (const node of nodesToRemove) {
    node.remove()
  }
}

function addLine() {
  const grid = document.getElementById('grid')
  for (let i = 0; i < 10; i++) {
    grid.append(document.createElement('div'))
  }
  updateTotals()
}

function delLine() {
  const grid = document.getElementById("grid")
  for (let i = 0; i < 10; i++) {
    grid.removeChild(grid.lastChild)
  }
  updateTotals()
}

function setRandomColor(element) {
  element.style.backgroundColor = randomColor()
  element.classList.remove('hovered')
}

function setHoverColor(element) {
  //  console.log('hover')
  element.style.backgroundColor = ''
  element.classList.add('hovered')
}

function randomColor() {
  // a random (float) number between 0 and 2**24-1
  const F = (1 << 24 - 1) * Math.random()
  // floor it to an int
  const N = Math.floor(F)
  // convert to hexa and build a color
  return `#${N.toString(16)}`
}

function updateTotals() {
  //  console.log('totals')
  const total = document.querySelectorAll("#grid>div").length
  const clicked = document.querySelectorAll('#grid div[style*="background-color"]').length
  const blue = document.querySelectorAll('#grid div.hovered').length
  const original = total - clicked - blue
  document.querySelector("#totals #original").innerHTML = original.toString()
  document.querySelector("#totals #clicked").innerHTML = clicked.toString()
  document.querySelector("#totals #blue").innerHTML = blue.toString()
  document.querySelector("#totals #total").innerHTML = total.toString()
}
