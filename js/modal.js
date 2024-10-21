// Get the modal element
const modal = document.getElementById("generic_modal");

//  get modal content
const modalContent = modal.querySelector(".modal-content")

// get data-closable attr
const dataClosable = modal.getAttribute("data-closable") ?? "yes"  // values; yes, no

// get data-open attr
const dataOpen = modal.getAttribute("data-open") ?? "closed"	// values: open, closed

// Get the button that opens the modal
const btn = document.getElementById("openModalBtn");

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];

if (btn) {
	// When the user clicks the button, open the modal with fade-in effect
	btn.onclick = function () {
		openModal()
	}
}

document.addEventListener("DOMContentLoaded", () => {
	// if data-open attribute is open then show modal without button
	if (dataOpen === "open") {
		openModal()
	}
})

if (span) {
	// When the user clicks on <span> (x), close the modal with fade-out effect
	span.onclick = function () {
		closeModal(dataClosable === "yes");
	}
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
	if (event.target === modal) {
		closeModal(dataClosable === "yes");
	}
}

// Function to open modal with fade in effect
function openModal() {
	modal.classList.add("show");
	modalContent.classList.add("open-anim");
}

// Function to close modal with fade-out effect
function closeModal(closable = true) {
	if (!closable) return
	modalContent.classList.remove("open-anim")
	modalContent.classList.add("close-anim")

	const timeout = setTimeout(() => {
		modalContent.classList.remove("close-anim");
		modal.classList.remove("show");
		clearTimeout(timeout)
	}, 700);
}
