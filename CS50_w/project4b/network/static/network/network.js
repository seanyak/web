function getCookie(name){
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if(parts.length == 2) return parts.pop().split(`;`).shift();
}


function submitHandler(id) {
    const textareaValue = document.GetElementById(`textarea_${id}`).value;
    const content = document.GetElementById(`content${id}`);
    const modal = document.GetElementById(`modal_editPost${id}`);
    fetch(`/edit/${id}`, {
        method: "POST",
        headers: {"Content-type": "application/json", "X-CSRFToken": getCookie("csrftoken")},
        body: JSON.stringify({
            content: textareaValue
        })
    })
    .then(response => response.json())
    .then(result => {
        content.innerHTML = result.data;

        modal.classList.remove('show');
        modal.setAttribute('aria-hidden', 'true');
        modal.setAttribute('style', 'display: none');
    
        const modalsBackdrops = document.getElementsByClassName('modal-backdrop');
    
        for(let i=0; i < modalsBackdrops.length; i++) {
            document.body.removeChild(modalsBackdrops[i]);
        }
    })
}


function likeHandler(id, userLiked) {
    const btn = document.GetElementById(`${id}`);

    btn.classlist.remove('fa-thumbs-up')
    btn.classlist.remove('fa-thumbs-down')
    if (userLiked.indexOf(id) >= 0) {
        var liked = true;
    } else {
        var liked = false;
    }

    if (liked == true) {
        fetch(`/remLike/${id}`)
        .then(response => response.json)
        .then(result => {
            btn.classlist.add('fa-thumbs-up')
        })
    } else {
        fetch(`/addLike/${id}`)
        .then(response => response.json)
        .then(result => {
            btn.classlist.add('fa-thumbs-down')
        })
    }
    liked =!liked
}