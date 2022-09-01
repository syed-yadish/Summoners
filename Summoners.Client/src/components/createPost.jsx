import { useState , useEffect } from "react";
import '../styles/createPost.css';

const CreatePost = ({ name, flag, setFlag }) => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const sendData = async (e) => {
        e.preventDefault();
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const body = JSON.stringify({
          Title: e.target["title"].value,
          Description:e.target["description"].value,
        })
        console.log(`body: ${body}`);
        const requestOptions = {
          method: 'POST',
          mode: 'cors',
          headers: myHeaders,
          body: body,
          redirect: 'follow'
        };

        const response = await fetch(`https://localhost:7261/api/Post/${name}`, requestOptions);
        setTitle('');
        setDescription('');
        setFlag([!flag]);
    }

    return (
        <div className="form__post">
            <form action="" onSubmit={sendData}>
                <input className="titleInput" type="text" placeholder="Set a title" name="title" value={title} onChange={e => setTitle(e.target.value)}/>
                <input className="descInput" type="text" placeholder="Set a description" name="description" value={description} onChange={e => setDescription(e.target.value)}/>
                <button className="createButton">Post</button>
            </form>
        </div>
    );
};

export default CreatePost;