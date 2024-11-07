const postRow = document.querySelector('.post-row')
const imgFocus = document.querySelector('.overlay-img-container img')
const overlay = document.querySelector('.overlay')
const htmlBody = document.querySelector('body')

axios
	.get('https://jsonplaceholder.typicode.com/photos', {
		params: {
			_limit: 6,
		},
	})
	.then((res) => {
		console.log(res)
		const posts = res.data
        appendPosts(posts, postRow)
	})
	.catch((err) => {
		console.log(err)
	})

function appendPosts(posts, root) {

	posts.forEach((post) => {
        const title = post.title
		const url = post.url
        console.log(url, title)

		const cardWrapper = document.createElement('div');
		cardWrapper.className = 'col-4 d-flex justify-center mb-24 card-col'
 
        const postCardHTML = `
            <div class="card">
                <div class="wrapper">
                    <div class="card-img"><img src="${url}"></div>
                    <p>${title}</p>
					<img class="pin-img" src="./img/pin.svg">
                </div>
            </div>
        `
		cardWrapper.innerHTML = postCardHTML
		root.append(cardWrapper) 

		cardWrapper.addEventListener('click', openPostsImg);
	})
}

function openPostsImg(event) {
	const clickedElement = event.target;
	const clickedCard = clickedElement.closest('.card');

  	if (clickedCard) {
    	const clickedImageUrl = clickedCard.querySelector('.card-img img').src;
		imgFocus.src = clickedImageUrl;
		console.log(clickedImageUrl)
  	}

  	overlay.classList.toggle('d-none')
  	htmlBody.classList.toggle('overflow-hidden')
}  


overlay.addEventListener('click', (event) => {
	const clickedElement = event.target;
	if (!clickedElement.classList.contains('overlay-img') && !clickedElement.classList.contains('overlay-img-container')) {
		overlay.classList.add('d-none');
		htmlBody.classList.remove('overflow-hidden');
		console.log('no img')
	}
})