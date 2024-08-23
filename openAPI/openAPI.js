const container = document.querySelector('.container')

fetch('https://jsonplaceholder.typicode.com/posts')
    .then ((res) => res.json())
    .then ((data) => {
        const info = data
        info.forEach(element => {
            const post = document.createElement('div') 
            post.innerHTML = `
            <span style="font-weight: bold; color: red;">Заголовок:${element.title}</span> <br>
            <br>
            Статья: ${element.body} <br>
            <br>
            <br>`
            container.append(post)
        });
    })
    .catch ((err) => container.innerText = err)
        //container.innerText = JSON.stringify(data)
        /*data.forEach(element => {
            const info = document.createElement('p')
            const jsonString = JSON.stringify(element, null, 2)
            info.innerHTML = jsonString
            container.appendChild(info)
        });*/

