const instButton = document.querySelectorAll(".__instButton");
if (null !== instButton) {
    function b() {
        let c = document.querySelector(`.__modalInst[data-id="${this.dataset.id}"]`);
        c.classList.add("auth-block_active"), wrap.style.filter = "blur(5px)", clicker.style.display = "flex"
    }
    instButton.forEach(c => {
        c.addEventListener("click", b)
    }), clicker.addEventListener("click", function() {
        let c = document.querySelector(".account-content_active");
        null !== c && (c.classList.remove("account-content_active"), console.log("closed"), wrap.style.filter = "blur(0px)", clicker.style.display = "none")
    })
}