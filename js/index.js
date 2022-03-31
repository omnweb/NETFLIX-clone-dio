const sliders = document.querySelector(".carousel-box");

var scrollClick;
var imgPadding = 20;

showMovieData();

var scrollAmount = 0;

function sliderScrollLeft() {
    sliders.scrollTo({
        top: 0,
        left: (scrollAmount -= scrollClick),
        behavior: "smooth"
    });

    if (scrollAmount < 0) {
        scrollAmount = 0;
    }
}

function sliderScrollRigth() {
    console.log(scrollAmount += scrollClick )
   if (scrollAmount <= sliders.scrollWidth - sliders.clientWidth ) {
      sliders.scrollTo({
        top:0,
        left: (scrollAmount += scrollClick),
        behavior: "smooth"
      });
   }
}
function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}


async function showMovieData() {
    const url = "https://api.themoviedb.org/3/discover/movie?api_key"
    let date = new Date();
    let today = await formatDate(date);
    var result = await axios.get(
        `${url}=${api_key}&/discover/movie?primary_release_date.gte=2021-01-01&primary_release_date.lte=${today}`
    );
    result = result.data.results;

    for (const key in result) {
        if (Object.hasOwnProperty.call(result, key)) {
            const poster = result[key];
                sliders.insertAdjacentHTML(
                    'beforeend',
                    `<img class="img-${key} slider-img" src="https://www.themoviedb.org/t/p/w600_and_h900_bestv2${poster.poster_path}"/>`
            )
        };
    }
    scrollClick = document.querySelector(".img-1").clientWidth + imgPadding;
    // scrollClick = 600;
}
