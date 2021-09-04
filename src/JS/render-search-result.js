var res_container = document.querySelector('.res-container');

export const renderBlogsResult = (res) => {
   
    const blog = document.createElement('div');
    let items = res.slice(0, 3);
    blog.innerHTML = items.map(searchResult => {
        return `
        <div class="blog-res bot_border pb-3">
            <a href="#" class="blog-res-link w-100 p-3">
                <div class="blog-sec">
                    <p class="blog-title">
                        ${searchResult['blog_title']}
                    </p>
                </div>
                <div class="blog-sec">
                    <p class="blog-auth">Ahmed Mukahal</p>
                </div>
                <div class="blog-sec">
                    <img src="https://hkandala.dev/_next/image?url=https%3A%2F%2Fcdn.hashnode.com%2Fres%2Fhashnode%2Fimage%2Fupload%2Fv1599232799251%2F6BlYhNrsz.jpeg%3Fw%3D1600%26h%3D840%26fit%3Dcrop%26crop%3Dentropy%26auto%3Dcompress%2Cformat%26format%3Dwebp&w=1920&q=75"
                        alt="blog-search-img" class="blog-img">
                </div>
            </a>
        </div>` ;
    }).join('');
    res_container.appendChild(blog);
    res = [];
}

export const renderUsersResult = (res) => {
    const blog = document.createElement('div');
    let items = res.slice(0, 3);
    blog.innerHTML = items.map(searchResult => {
        return `
        <div class="user-res bot_border">
            <a href="#" class="user-res-link p-3">
                <div class="user-info d-flex-start align-stretch">
                    <div class="user-sec">
                        <img src="${searchResult.user_image}"
                            alt="user-image" class="user-image">
                    </div>
                    <div class="user-sec">
                        <p class="user-name m-0">
                            ${searchResult.user_title}
                        </p>
                        <small class="user-followers">${searchResult.followers} Followers</small>
                    </div>
                </div>
            </a>
        </div>` ;
    }).join('');
    res_container.appendChild(blog);
    res = [];
}

export const renderTagsResult = (res) => {
    const blog = document.createElement('div');
    let items = res.slice(0, 3);
    blog.innerHTML = items.map(searchResult => {
        return `
        <div class="tag-res">
            <a href="#" class="tag-link">
                <div class="d-flex-start">
                    <img src="${searchResult.tag_logo}"
                        alt="tag-logo" class="tag-log border-rad-5">
                    <div class="tag-info">
                        <p class="tag-name"><span class="tag">#</span>${searchResult.tag_title}</p>
                        <small class="tag-followers">${searchResult.tag_followers} developers follows this</small>
                    </div>
                </div>
            </a>
        </div>` ;
    }).join('');
    res_container.appendChild(blog);
    res = [];
}