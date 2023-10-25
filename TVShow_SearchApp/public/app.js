const form = document.querySelector('#searchForm');
const list = document.querySelector('#lists');
form.addEventListener('submit',
    async function (e) {
        e.preventDefault();
        clearTV();
        const searchTerm = form.elements.query.value;
        const res = await axios.get(`https://api.tvmaze.com/search/shows?q=${searchTerm}`);
        addTV(res.data);
        form.elements.query.value = '';
    })

const addTV = function (shows) {
    for (let ele of shows) {
        if (ele.show.image) {
            const divTV = document.createElement('div');
            const url = document.createElement('a');
            url.href = ele.show.url;
            const figure = document.createElement('figure');
            figure.classList.add('figure');
            const imageURL = ele.show.image.medium;
            const nameTV = ele.show.name;
            const name = document.createElement('figcaption');
            name.innerText = nameTV;
            name.classList.add('text-center');
            name.classList.add('figure-caption');
            const img = document.createElement('img');
            img.src = imageURL;
            img.classList.add('figure-img');
            img.classList.add('rounded');

            divTV.classList.add('col');
            url.appendChild(img)
            figure.appendChild(url);
            figure.appendChild(name);
            divTV.appendChild(figure);
            list.appendChild(divTV);
        }
    }
}

const clearTV = function () {
    list.innerHTML='';
}