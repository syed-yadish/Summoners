import Comment from "./comment";

const CommentList = ({commentList}) => {
    console.log(`commentlst`);
    console.log(commentList);
    return (
        <div className="comment__list">
            {commentList.map( (item) => {
                return (
                    <Comment author={item.author} text={item.text} id={item.postId} />
                )
            })}
        </div>
    );
};

export default CommentList;