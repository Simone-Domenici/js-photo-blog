const postRow = document.querySelector('.post-row')

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

        const postCardHTML = `
        <div class="col-4 d-flex justify-center mb-24 card-col">
            <div class="card">
                <div class="wrapper">
                    <div class="card-img"><img src="${url}"></div>
                    <p>${title}</p>
					<img class="pin-img" src="./img/pin.svg">
                </div>
            </div>
        </div>
        `
		root.innerHTML += postCardHTML
	})
}
