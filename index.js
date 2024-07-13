      const apiKey = process.env.NEWS_API_KEY;
        async function fetchData(topic = 'india') {
            try {
                const container = document.getElementById('container');
                const searcheditems = document.getElementById('searcheditems');
                const response = await fetch(`https://newsapi.org/v2/everything?q=${(topic)}&apiKey=${apiKey}`);

                if (!response.ok) throw new Error('Network response was not ok ' + response.statusText);

                const { articles } = await response.json();
                container.innerHTML = '';
                searcheditems.innerText = topic;

                articles.filter(item => item.urlToImage).forEach(item => {
                    const card = document.createElement('div');
                    card.classList.add('card');

                    const img = document.createElement('img');
                    img.src = item.urlToImage;
                    img.alt = item.title;

                    const anchor = document.createElement('a');
                    anchor.href = item.url;
                    anchor.target = '_blank';
                    anchor.appendChild(img);

                    const imageContainer = document.createElement('div');
                    imageContainer.classList.add('urltoimage');
                    imageContainer.appendChild(anchor);

                    const content = document.createElement('div');
                    content.classList.add('content');

                    const title = document.createElement('div');
                    title.classList.add('title');
                    title.textContent = truncateText(item.title, 10);

                    const description = document.createElement('div');
                    description.classList.add('description');
                    description.textContent = truncateText(item.description, 20);

                    content.appendChild(title);
                    content.appendChild(description);

                    card.appendChild(imageContainer);
                    card.appendChild(content);
                    container.appendChild(card);
                });
            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
            }
        }

        document.getElementById('searchInput').addEventListener('keydown', event => {
            if (event.key === 'Enter' && event.target.value.trim()) {
                fetchData(event.target.value.trim());
                event.target.value = '';
            }
        });

        function truncateText(text, limit) {
            return text.split(' ').slice(0, limit).join(' ') + (text.split(' ').length > limit ? '...' : '');
        }

function home() {
    fetchData(topic="india");
}

function fetchWorldNews() {
    fetchData(topic = 'world');
}

function fetchTechnologyNews() {
    fetchData(topic ="technology");
}

function fetchBusinessNews() {
    fetchData(topic = "business");
}

function fetchSportsNews() {
    fetchData(topic = "sports");
}

function fetchEntertainmentNews() {
    fetchData(topic ="entertainment");
}

