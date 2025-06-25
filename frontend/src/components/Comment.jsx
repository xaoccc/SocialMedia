export default function Comment() {

    

    return (
        <div class="comment-wrapper flex-row">
            <div class="rating-wrapper">
                <button>
                    <img src="./images/icon-plus.svg" alt="plus icon" />
                </button>
                <div class="score">5</div>
                <button>
                    <img src="./images/icon-minus.svg" alt="plus icon" />
                </button>
            </div>
            <article>
                <div class="comment-header flex-row">
                    <div class="comment-header-left flex-row">
                        <img class="profile-pic" src="" alt="" />
                        <div class="profile-name"></div>
                        <div class="date"></div>
                    </div>
                    <div class="comment-header-right flex-row">
                        <div class="flex-row">
                            <img src="./images/icon-reply.svg" alt="reply icon" />
                            <a class="reply-txt">Reply</a>
                        </div>
                    </div>
                </div>
                <p class="comment-body"></p>
            </article>
        </div>
    );
}