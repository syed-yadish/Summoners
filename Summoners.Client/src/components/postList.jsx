import '../styles/postList.css';
import CreatePost from './createPost';
import Post from './post';

const PostList = ( {postList, name, flag, setFlag} ) => {

    return (
        <div className="postList__wrapper">
            {/* <div> */}
                <CreatePost name={name} flag={flag} setFlag={setFlag} />
            {/* </div> */}
            <div className="postList">
                {postList.map((item) => {
                    return (
                        <Post   
                            key={item.postId} 
                            postId={item.postId} 
                            title={item.title} 
                            description={item.description}

                            flag={flag}
                            setFlag={setFlag}
                        />
                    )
                })}
            </div>
        </div>
    );
}

export default PostList;