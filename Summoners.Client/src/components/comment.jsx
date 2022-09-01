const Comment = ({author, text, id}) => {
    return (
        <div className="comment">
            <p>{text}</p>
        </div>
    );
}

export default Comment;