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
        console.log(newsDetail)
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
                <img src="${author.img}"style="height:20px;width:20px;"alt="">
            </div>
            <div>
                <p>${author.name}</p>
            </div>
        </div>
        <div class="d-flex">
            <div>
                <i class="fa-solid fa-eye"></i>
            </div>
            <div>
                <p>${total_view}</p>
            </div>
        </div>
        <div>
            <button class="btn btn-primary">Details</button>
        </div>
    </div>
      </div>
        `
        newsDetailContainer.appendChild(div)
    })
}

loadCatagory()