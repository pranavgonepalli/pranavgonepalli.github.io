var apiKey = "4ebccc79672c4b07859022112e3b1451";
// var apiKey = "9f71b7c98b004e259f3b347f1c8aa3cf";
// var apiKey = "2b7de68e84674f419197f5a98001fcac";

function getSource(id, num){
    $.ajax({
        url:"https://api.spoonacular.com/recipes/"+id+"/information?apiKey="+apiKey,
        success: function(res){
            // document.getElementById("source"+num).innerHTML=res.sourceUrl
            document.getElementById("source"+num).href=res.sourceUrl
        }
    });
}
function getRecipe(q){
    var numRecipes = parseInt(document.getElementById("numRecipes").value);
    if (numRecipes > 9) {
        numRecipes = 9;
    }
    if (numRecipes < 0) {
        numRecipes = 0;
    }
    var ranking = parseInt(document.getElementById("ranking").value);

    $.ajax({
        url:"https://api.spoonacular.com/recipes/findByIngredients?apiKey="+apiKey+"&number="+numRecipes+"&ranking="+ranking+"&ingredients="+q,
        success: function(res){
            for (let index = 1; index <= 9; index++) {
                document.getElementById("recipe"+index).style="display:none"
            }
            
            console.log("test")
            for (let index = 1; index <= numRecipes; index++) {
                document.getElementById("title"+index).innerHTML=res[index-1].title
                document.getElementById("img"+index).src=res[index-1].image
                document.getElementById("recipe"+index).style="display:absolute"
                getSource(res[index-1].id, index)
            }
        }
    });
}

// Stuff flying in
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

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));

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