const loadNews = async() => {
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
        <a>${catagory.category_name}</a>
        `
        catagories.appendChild(li)
    }
}

loadNews()