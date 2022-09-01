import '../styles/post.css'
import LOLBackground from '../assets/images/league-of-legends.jpg';
import LOLBackgroundALT from '../assets/images/League-Jinx.jpg';
import CreateComment from './createComment';
import CommentList from './commentList';
import { useState, useEffect } from 'react';
import { getComments } from '../utils/postsApi';
import LeagueIcon from '../assets/images/PostLeagueIcon.png'

const Post = ({ postId, title, description, summonerName, flag, setFlag }) => {

    const [comments, setComments] = useState([]);
    const handleDelete = async (e) => {
        e.preventDefault();
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const requestOptions = {
            method: 'DELETE',
            mode: 'cors',
            headers: myHeaders,
            redirect: 'follow'
        };
        const response = await fetch(`https://localhost:7261/api/Post/${postId}`, requestOptions);
        setFlag(!flag);
    }

    const handleComments = async () => {
        setToggle(!toggle);
        setComments(await getComments(postId));
    }

    const [toggle, setToggle] = useState(false);

    

    return (
        <div className='postdiv'> 
            <div className="blog_post">
                <button className="noselect" onClick={handleDelete}><span className='text'>Delete</span><span className="icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/></svg></span></button>
                <div className="img_pod">
                    <img className="post__img"src={LeagueIcon} alt="random image" />
                </div>
                <div className="container_copy">
                    {/* <h3>myknos</h3> Add date time */}
                    <h1>{title}</h1>
                    <p className='post__text'>{description}</p>
                </div>
                    <button className="comment__button" onClick={handleComments}>See comments</button>
            </div>
            {toggle && 
            <> 
            <CommentList commentList={comments} />
            <CreateComment postId={postId} flag={flag} setFlag={setFlag} />
            </>
            }
        </div>
    );
};

export default Post;