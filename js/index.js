const loadCatagory = async() => {
    const url = 'https://openapi.programming-hero.com/api/news/categories'
    const res = await fetch(url);
    const data = await res.json();
    displayNewsCatagory(data.data.news_category);
}


const displayNewsCatagory = data => {
    const catagories = document.getElementById('catagory')
    for (const catagory of data){
        const li = document.createElement('li')
        li.innerHTML = `
        <button onclick="loadNews('${catagory.category_id}')" class='btn btn-primary'>${catagory.category_name}</button>
        `
        catagories.appendChild(li)
    }
}

const loadNews = async(category_id) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`
    const res = await fetch(url)
    const data = await res.json()
    // console.log(data.data)
    displayNews(data.data)
}

const displayNews = newsDetail => {
    const newsDetailContainer = document.getElementById('news-detail-card')
    newsDetailContainer.textContent = ''
    newsDetail.forEach(newsDetail =>{
        // console.log(newsDetail)
        const {_id, title, thumbnail_url, author, details, total_view} = newsDetail
        const div = document.createElement('div')
        div.classList.add('row', 'mt-2')
        div.innerHTML= `
        <div class="col-md-4 text-center">
        <img src="${thumbnail_url}" class="img-fluid rounded-start" alt="...">
      </div>
      <div class="col-md-8">
      <div class="card-body">
      <h5 class="card-title">${title}</h5>
      <p class="card-text">${details.length > 50 ? details.slice(0,100) + '...' : details}</p>
      <div class="d-flex justify-content-between card-text text-muted">
        <div class="d-flex">
            <div>
                <img src="${author.img}"style="height:25px;width:25px;border-radius: 50%;"alt="">
            </div>
            <div>
                <p>${author.name ? author.name : 'no data'}</p>
            </div>
        </div>
        <div class="d-flex">
            <div>
                <i class="fa-solid fa-eye"></i>
            </div>
            <div>
                <p>${total_view ? total_view : 'no data'}</p>
            </div>
        </div>
        <div>
            <button type="button" onclick="loadNewsDetails('${_id}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Details</button>
        </div>
    </div>
      </div>
        `
        newsDetailContainer.appendChild(div)
    })
}

const loadNewsDetails = async(news_id) => {
    const url = `https://openapi.programming-hero.com/api/news/${news_id}`
    const res = await fetch(url)
    const data = await res.json()
    console.log(data.data[0])
    displayNewsDetails(data.data[0])
}

const displayNewsDetails = news => {
    const modalTtitle = document.getElementById('exampleModalLabel')
    modalTtitle.innerText = news.title
    const detailesNews = document.getElementById('details-news')
    detailesNews.innerHTML = `
    <img src="${news.thumbnail_url}" class="img-fluid rounded-start" alt="...">
    <p>${news.details ? news.details : 'no data'}</p>
    <p>Rating:${news.rating.number} (${news.rating.badge})</p>

    `
}

loadCatagory()