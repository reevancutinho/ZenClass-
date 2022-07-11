document.addEventListener("DOMContentLoaded", function () {
  const searchResults = document.querySelector("#search-results");
  const animeURL = `https://api.jikan.moe/v3`;
  const animeForm = document.querySelector("#search-form");

  animeForm.addEventListener("submit", fetchAnime);

  async function fetchAnime(event) {
    event.preventDefault();

    searchResults.innerHTML = ``;

    const form = new FormData(this);
    const query = form.get("search");

    try {
      const response = await fetch(
        `${animeURL}/search/anime?q=${query}&page=1`
      );
      const anime = await response.json();
      if (anime.results == undefined) {
        searchResults.innerHTML += `
                <h2>No anime found</h2>
                `;
      } else {
        anime.results.forEach((data) => {
          // console.log(data.image_url)
          // console.log(data.start_date)
          // console.log(data.end_date)
          // console.log(data.type)
          // console.log(data.rated)
          let startDate=changeDate(data.start_date);
          let endDate=changeDate(data.end_date);

          function changeDate(date) {
              let currentDate=new Date(date);
              let fd=currentDate.toDateString();
              return fd;
          }


        //   searchResults.innerHTML += `
        //             <div class="wrapper">
        //                 <div class="product-image">
        //                      <img src="${data.image_url}" class="col-md-12" alt="loading..."/>
        //                 </div>
        //                 <div class="product-info">
        //                     <div class="product-text">
        //                          <h4>${data.title}</h4>
        //                          <h5>${data.type}</h5>
        //                          <h5>${data.rated}</h5>
        //                          <h5>${startDate}</h5>
        //                          <h5>${endDate}</h5>
        //                     </div>
        //                 </div>
        //             </div>
        //             `;


        // searchResults.innerHTML += `
        // <div class="card">
        //     <div class="card-image">
        //         <img src="${data.image_url}" class="col-md-12" alt="loading..."/>
        //     </div>
        //     <div class="card-content">
        //         <h4>${data.title}</h4>
        //         <h5>${data.type}</h5>
        //         <h5>${data.rated}</h5>
        //         <h5>${startDate}</h5>
        //         <h5>${endDate}</h5>

        //     </div>
        // </div>
        // `

        searchResults.innerHTML += `
        <div class="anime_item">
        <img src="${data.image_url}" alt="loading.."/>
        <div class="anime_info">
            <h3>${data.title}</h3>
            <h6>Type:${data.type}</h6>
            <h6>Rating:${data.rated}</h6>
            <h6>Start date:${startDate}</h6>
            <h6>End date:${endDate}</h6>
        </div>
        </div>
        `
        });
      }
    } catch (error) {
      console.error(error);
    }
  }
});
