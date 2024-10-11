const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry)
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } else {
            entry.target.classList.remove('show');
        }
    });
});

const hiddenElementsLeft = document.querySelectorAll('.hiddenLeft');
hiddenElementsLeft.forEach((el) => observer.observe(el));

const hiddenElementsRight = document.querySelectorAll('.hiddenRight');
hiddenElementsRight.forEach((el) => observer.observe(el));

const blob = document.getElementById("blob");
document.body.onpointermove = event => {
    const { clientX, clientY } = event;
    blob.style.left = `${clientX}px`;
    blob.style.top = `${clientY}px`;
    // blob.animate({
    //     left: `${clientX}px`,
    //     top: `${clientY}px`,
    // }, {duration: 500, fill: "forwards"})
}

const aboutnav = document.getElementById("aboutnav");
const experiencenav = document.getElementById("experiencenav");
const projectsnav = document.getElementById("projectsnav");
const contactnav = document.getElementById("contactnav");

aboutnav.addEventListener('click', function() {
    document.getElementById("about").scrollIntoView({behavior: "smooth", block: "start"});
});

experiencenav.addEventListener('click', function() {
    document.getElementById("experiences").scrollIntoView({behavior: "smooth", block: "start"});
});

projectsnav.addEventListener('click', function() {
    document.getElementById("projects").scrollIntoView({behavior: "smooth", block: "start"});
});

contactnav.addEventListener('click', function() {
    document.getElementById("contact").scrollIntoView({behavior: "smooth", block: "start"});
});