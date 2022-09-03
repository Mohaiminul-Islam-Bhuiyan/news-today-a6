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
    console.log(data.data)
}



loadCatagory()