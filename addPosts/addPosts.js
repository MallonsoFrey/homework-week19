const inputTitle = document.querySelector('.title')
const inputText = document.querySelector('.text')
const button = document.querySelector('.btn')
const output = document.querySelector('.posts')

let countId = 1

// Функция для создания поста
function addPostToDOM(title, body) { 
    const newPost = document.createElement('div');
    newPost.innerHTML = `
        <h2>${title}</h2>
        <p>${body}</p>
        <br>
    `;
    output.appendChild(newPost);
}

// Функция для загрузки постов из localStorage
function loadPosts() {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts.forEach(post => {
        addPostToDOM(post.title, post.body);
    });
}

// Загружаем посты при загрузке страницы
loadPosts();

button.addEventListener('click', function() {
    console.log(output)
    const inputTitleValue = inputTitle.value
    const inputTextValue = inputText.value
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
          title: inputTitleValue,
          body: inputTextValue,
          userId: countId++
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      })
      .then(response => response.json())
      .then((data) => {
        addPostToDOM(data.title, data.body);

        // Сохраняем пост в localStorage
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        posts.push({ title: data.title, body: data.body });
        localStorage.setItem('posts', JSON.stringify(posts));
      })
    
    inputText.value = ''
    inputTitle.value = ''
})