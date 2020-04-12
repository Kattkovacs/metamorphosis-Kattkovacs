initDragAndDrop();

function initDragAndDrop() {
    shuffleCards();
    let draggables = document.querySelectorAll(".card");
    let dropZones = document.querySelectorAll(".card-slot");
    initDraggables(draggables);
    initDropZones(dropZones);
}

function initDraggables(draggables) {
    for (const draggable of draggables) {
        initDraggable(draggable);
    }
}

function initDropZones(dropZones) {
    for (let dropZone of dropZones) {
        initDropZone(dropZone);
    }
}

function shuffleCards() {
    let mixedCardsContainer = document.querySelector(".mixed-cards");
    for (let i = mixedCardsContainer.children.length; i >= 0; i--) {
        mixedCardsContainer.appendChild(mixedCardsContainer.children[Math.random() * i | 0]);
    }
}

function initDraggable(draggable) {
    draggable.addEventListener("dragstart", dragStartHandler);
    draggable.addEventListener("drag", dragHandler);
    draggable.addEventListener("dragend", dragEndHandler);
    draggable.setAttribute("draggable", "true");
}

function initDropZone(dropZone) {
    dropZone.addEventListener("dragenter", dropZoneEnterHandler);
    dropZone.addEventListener("dragover", dropZoneOverHandler);
    dropZone.addEventListener("dragleave", dropZoneLeaveHandler);
    dropZone.addEventListener("drop", dropZoneDropHandler);
}

function dragStartHandler(event) {
    setDropZonesHighlight(true);
    this.classList.add('dragged', 'drag-feedback');
    event.dataTransfer.setData("type/dragged-box", 'dragged');
    event.dataTransfer.setData("text/plain", this.textContent.trim());
    deferredOriginChanges(this, 'drag-feedback');
}

function dragHandler() {
}

function dragEndHandler() {
    setDropZonesHighlight(false);
    this.classList.remove('dragged');
}

function dropZoneEnterHandler(e) {
    if (e.dataTransfer.types.includes('type/dragged-box')) {
        this.classList.add("over-zone");
        e.preventDefault();
    }
}
function dropZoneOverHandler(e) {
    let draggedElement = document.querySelector('.dragged');
    let childImage = draggedElement.firstElementChild;
    if (e.dataTransfer.types.includes('type/dragged-box') &&
        (e.currentTarget.dataset.slot === childImage.dataset.status)) {
        this.classList.add("right-zone");
        e.preventDefault();
    }
}

function dropZoneLeaveHandler(e) {
    if (e.dataTransfer.types.includes('type/dragged-box') &&
        e.relatedTarget !== null &&
        e.currentTarget !== e.relatedTarget.closest('.drop-zone')) {
        this.classList.remove("over-zone");
        this.classList.remove("right-zone");
        }
}

function dropZoneDropHandler(e) {
    let draggedElement = document.querySelector('.dragged');
    let childImage = draggedElement.firstElementChild;
    if (e.currentTarget.dataset.slot === childImage.dataset.status) {
        // this.classList.add("right-zone");
        e.currentTarget.appendChild(draggedElement);
    }
    e.preventDefault();
    }

function setDropZonesHighlight(highlight = true) {
    const dropZones = document.querySelectorAll(".card-slot");
    for (const dropZone of dropZones) {
        if (highlight) {
            dropZone.classList.add("active-zone");
        } else {
            dropZone.classList.remove("active-zone");
            dropZone.classList.remove("over-zone");
        }
    }
}

function deferredOriginChanges(origin, dragFeedbackClassName) {
    setTimeout(() => {
        origin.classList.remove(dragFeedbackClassName);
    });
}
