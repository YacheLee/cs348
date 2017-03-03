function render_liveChat() {
    html = `<div class="live-chat">
        <div class="chat-btn">
            <span class="chat-icon glyphicon glyphicon-comment" aria-hidden="true"></span>
        </div>
        <div class="chat-box">
            <div class="chat-header">
                <h6>Chat with us now!</h6>
                <p>eVeg is on the line.</p>
                <span class="chat-close glyphicon glyphicon-remove" aria-hidden="true"></span>
            </div>
            <div class="chat-convo">
                <div class="chat-date">
                    <p>Friday 3rd March 2017</p>
                </div>
                <div class="chat-thread">
                    <p>Hi! Do you need any help?</p>
                </div>
            </div>
            <div class="chat-msg">
                <input type="text" placeholder="Write your message...">
            </div>
        </div>
    </div>`;
    $('#live-chat').append(html);
}

$(document).ready(function(){
    render_liveChat();
    $('.chat-btn').click(function(){
        $('.chat-box').show();
        $('.chat-btn').hide();
    });

    $('.chat-box .chat-header .chat-close').click(function(){
        $('.chat-box').hide();
        $('.chat-btn').show();
    });
});
