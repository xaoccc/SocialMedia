export const userData = async () => {
    const waitForJwtData = async (timeout = 2000) => {
        const interval = 100;
        const maxAttempts = timeout / interval;
        let attempts = 0;

        return new Promise((resolve, reject) => {
            const check = () => {
                const data = localStorage.getItem('jwtData');
                if (data) return resolve(JSON.parse(data));
                if (++attempts > maxAttempts) return reject(new Error('jwtData not available in time'));
                setTimeout(check, interval);
            };
            check();
        });
    };


    try {
        const authData = await waitForJwtData();
        const accessToken = authData?.access;
        const response = await fetch('http://localhost:8000/api/v1/auth/profile/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
        });

        const userData = await response.json();
        // Debug
        console.log(userData);

        // const [comments, newComment, profilePic] = document.querySelectorAll('.comments, .new-comment, .new-comment > img');
        // const commentWrapper = document.querySelector('.comment-wrapper');
        // const commentsSection = document.querySelector('section.comments');
        // const [newCommentText, newCommentBtn] = newComment.querySelectorAll('button, textarea');
        // Here we put the data into our code:


        // data.comments.forEach(commentData => {
        //     let newComment = commentWrapper.cloneNode(true);
        //     newComment.querySelector('.profile-pic').src = commentData.user.image.png;
        //     newComment.querySelector('.profile-name').textContent = commentData.user.username;
        //     newComment.querySelector('.date').textContent = commentData.createdAt;
        //     newComment.querySelector('.score').textContent = commentData.score;
        //     newComment.querySelector('p').textContent = commentData.content;
        //     commentsSection.appendChild(newComment)

        //     if (commentData.replies.length > 0) {
        //         commentData.replies.forEach(replyData => {
        //             let newReply = commentWrapper.cloneNode(true);
        //             newReply.classList.add('reply');
        //             newReply.querySelector('.profile-pic').src = replyData.user.image.png;
        //             newReply.querySelector('.profile-name').textContent = replyData.user.username;
        //             newReply.querySelector('.date').textContent = replyData.createdAt;
        //             newReply.querySelector('.score').textContent = replyData.score;
        //             const replyTo = document.createElement('a');
        //             replyTo.classList.add('reply-to');
        //             replyTo.innerHTML = '@' + replyData.replyingTo;
        //             replyTo.href = '#';
        //             newReply.querySelector('p').appendChild(replyTo);
        //             newReply.querySelector('p').appendChild(document.createTextNode(' ' + replyData.content));


        //             if (currentUser == replyData.user.username) {
        //                 const editBtn = newReply.querySelector('.comment-header-right > .flex-row');
        //                 const deleteBtn = newReply.querySelector('.comment-header-right > .flex-row').cloneNode(true);
        //                 newReply.querySelector('.comment-header-right').appendChild(deleteBtn)
        //                 deleteBtn.classList.add('delete');
        //                 editBtn.classList.add('edit');
        //                 deleteBtn.querySelector('.reply-txt').textContent = 'Delete';
        //                 editBtn.querySelector('img').src = "./images/icon-edit.svg";
        //                 deleteBtn.querySelector('img').src = "./images/icon-delete.svg";
        //                 editBtn.querySelector('.reply-txt').textContent = 'Edit';
        //             }

        //             commentsSection.appendChild(newReply)
        //         });
        //     }
        // });

        // End of data import 

        if (!response.ok) {
            throw new Error(userData.error || 'Failed to fetch user profile data');
        }
        return userData;

    } catch (err) {
        console.error(err);
        throw new Response('Bad request', { status: 400 });
    }

};