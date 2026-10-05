console.log("SilentX Dashboard loaded");

const botTabs = document.querySelectorAll(".bot-tab");

botTabs.forEach(tab => {
    tab.addEventListener("click", () => {

        botTabs.forEach(item => {
            item.classList.remove("active");
        });

        tab.classList.add("active");

        console.log("Selected:", tab.textContent.trim());
    });
});
