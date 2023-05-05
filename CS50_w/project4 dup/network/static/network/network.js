document.addEventListener('DOMContentLoaded', function() {

    document.querySelector('#profile').style.display = 'none';
    window.history.pushState('Netwerk', 'Netwerk', 'http://127.0.0.1:8000/');
    if (document.getElementById('following')) {
        document.getElementById('following').addEventListener('click', () => postsLoad("/followed",1));
    } else {
        document.getElementById('newPost').addEventListener('click', () => force_login());
    }
    postsLoad("",1);
});

function postsLoad(addon,page) {
    if (addon.includes("?")) {
        addon+=`&page=${page}`;
    } else {
        document.querySelector('#profile').style.display = 'none';
        addon+=`?page=${page}`;
    }
    console.log(`access ${addon}`);
    fetch(`/load${addon}`)
    .then(response => response.json())
    .then(response => {
        document.getElementById('posts').innerHTML="";
        build_paginator(addon, page, response, pageNum)
        response.posts.forEach(post => postBuild(post));
    })
}


function profileShow(creator_id) {
    postsLoad(`?profile=${creator_id}`, 1);
    document.querySelector('#newPost').style.display = 'none';
    followBtn = document.getElementById(`follow-button`);
    followBtn.style.display = 'none';
    document.querySelector('#profile').style.display = 'block';
    fetch(`/profile/${creator_id}`)
    .then(response => response.json())
    .then(profile => {
        document.getElementById('postsFollowing').innerHTML=profile.following;
        document.getElementById('postsFollowing').innerHTML=profile.followers;
        document.getElementById('profile_username').innerHTML=profile.profile_username;
        if (profile.follow_available) {
            followBtn.style.display = 'unset';
            if (profile.currenntly_following) {
                followBtn.innerHTML = 'unfollow';
            } else {
                followBtn.innerHTML = 'follow';
            }
            followBtn.addEventListener('click', () => followUpdate(creator_id));
        }
    })
    window.scrollTo(0,0);
}

function postBuild(post) {
    const cardPost = document.createElement('div');
    cardPost.className = "card col-9";

    const header = document.createElement('div');
    header.className = "card header profile";
    header.innerHTML = post.creator_username;
    cardPost.append(header);
    header.addEventListener('click', () => profileShow(post.creator_id));

    const cardBod = document.createElement('div');
    cardBod.className = "card-body";
    cardBod.id = `postBody_${post.id}`;

    const txt = document.createElement('p');
    txt.className = "card-text";
    txt.id = `content_${post.id}`;
    txt.innerHTML = post.content;
    cardBod.append(txt);

    const likeRow = document.createElement('div');
    likeRow.id = `likeRow${post.id}`;
    likeRow.className = "row align-items-center";

    const likeIcon = document.createElement('i');
    likeIcon.id = `like-icon-${post.id}`;
    let heart_bg;
    if (post.liked) {
        heart_bg="";
    } else {
        heart_bg="-empty";
    }
    likeIcon.className = `icon-heart${heart_bg} col-auto`;
    if(document.getElementById('following')) {
        likeIcon.addEventListener('click', () => likeUpdate(post));
    } else {
        likeIcon.addEventListener('click', () => force_login());
    }
    likeRow.append(likeIcon);

    const likes = document.createElement('div');
    likes.id = `likes-amount-${post.id}`;
    likes.className = "card-text likes col auto";
    likes.innerHTML = post.likes;
    likeRow.append(likes);

    const likeTxt = document.createElement('div');
    likeTxt.className = "card-text likeTxt col-auto";
    likeTxt.innerHTML = "like(s)";
    likeRow.append(likeTxt);

    const date = document.createElement('div');
    date.className = "blockquote-footer col-auto";
    date.innerHTML = post.time;
    likeRow.append(date);

    if (post.editable) {
        const edit = document.createElement('button');
        edit.className = "card-text col-auto btn btn-link";
        edit.innerHTML = "Edit";
        edit.addEventListener('click', () => postEdit(post));
        likeRow.append(edit);
    }
    cardBod.append(likeRow);
    cardPost.append(cardBod);

    const row = document.createElement('row');
    row.className = "row justify-content-center";
    row.append(cardPost);

    document.querySelector('#posts').append(row);   
}

function likeUpdate(post) {
    fetch(`/post/${post.id}/likeUpdate`)
    .then(response => response.json())
    .then(response => {
        if(response.liked) {
            document.getElementById(`like-icon-${post.id}`).className = "icon-heart col-auto";
        } else {
            document.getElementById(`like-icon-${post.id}`).className = "icon-heart-empty col-auto";
        }
        document.getElementById(`likes-amount-${post.id}`).innerHTML = response.likes;
    })
}

function followUpdate(profID) {
    fetch(`/profile/${profID}/followUpdate`)
    .then(response => response.json())
    .then(response => {
        followBtn = document.getElementById('follow-btn');
        if (response.newFollower) {

        }
    })
}

function postEdit(post) {
    const likeRow = document.getElementById(`likeRow_${post.id}`);
    const content = document.getElementById(`content_${post.id}`);

    const postBody = content.parentNode;

    const editBtnRow = document.createElement('div');
    editBtnRow.className = "row";

    const saveBtn = document.createElement('button');
    saveBtn.className = "btn btn-info col-auto";
    saveBtn.type = "button";
    saveBtn.innerHTML = "Save";   
    saveBtn.addEventListener('click', () => {
        const newContent = document.getElementById(`newContent${post.id}`).value;
        fetch(`/postSave`, {
            method:'PUT',
            headers: {
                'X-CSRFToken' : getCookie("csrftoken")
            },
            body: body = JSON.stringify({
                postID: post.id,
                newContent: newContent,
            })
        })
        .then(response => response.json())
        .then(response =>{
            if (response.result) {
                content.innerHTML = newContent;
            } else {
                alert("Unauthorized to edit");
            }
            editBtnRow.remove();
            contentEditable.remove();
            postBody.append(content);
            postBody.append(likeRow);
        })
    }) 
    editBtnRow.append(saveBtn);

    const contentEditable = document.createElement('input');
    contentEditable.id = `newContent_${post.id}`;
    contentEditable.type = "textarea";
    contentEditable.className = "form-control col-9"
    contentEditable.value = content.innerHTML;

    document.getElementById(`likeRow_${post.id}`).remove();
    document.getElementById(`content_${post.id}`).remove();

    editBtnRow.append(contentEditable);

    const cancelBtn = document.createElement('button');
    cancelBtn.className = "btn btn-light col-auto";
    cancelBtn.type = "button";
    cancelBtn.innerHTML = "Camce;";
    cancelBtn.addEventListener('click', () => {
        editBtnRow.remove()
        contentEditable.remove()
        postBody.append(content);
        postBody.append(likeRow);
    });
    editBtnRow.append(cancelBtn);
    postBody.appendChild(editBtnRow);
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}
