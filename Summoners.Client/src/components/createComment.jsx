import { useState } from "react";

const CreateComment = ({ postId, flag, setFlag }) => {

    const [comment, setComment] = useState('');

    const handleComment = async (e) => {
        e.preventDefault();
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const body = JSON.stringify({
            PostId: postId,
            Text: e.target["comment"].value
        });
        // console.log(`body: ${body}`);
        const requestOptions = {
            method: 'POST',
            mode: 'cors',
            headers: myHeaders,
            body: body,
            redirect: 'follow'
        };

        const response = await fetch(`https://localhost:7261/api/Post/${postId}/comments`, requestOptions);
        setComment('');
        setFlag([!flag]);
    }

    return (
        <div className= "create_comment">
            <form onSubmit={handleComment}>
                <input 
                    className= "create_comment_input"
                    placeholder="Add Comment.." 
                    type="text" 
                    name="comment" 
                    value={comment} 
                    onChange={e => setComment(e.target.value)} />
            </form>
        </div>
    );
}

export default CreateComment;