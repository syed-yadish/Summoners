import Header from '../components/header';
import '../styles/profile.css';
import Card from '../components/card';
import SearchBar from '../components/searchBar';
import { useLocation } from 'react-router-dom';
import { useState , useEffect } from 'react';
import { getStats, getLevelIcon } from '../utils/utils';
import { usePromiseTracker, trackPromise } from "react-promise-tracker";
import { getPosts, getComments } from '../utils/postsApi';
import Loading from '../components/loading';
import PostList from '../components/postList';
import ErrorMessage from '../components/errorMessage';
import Post from '../components/post';

const Profile = () => {

    const apiKey = 'RGAPI-aecaee5e-8b9a-4378-8436-f332568ee258';
    const location = useLocation();
    const [ data, setData ] = useState(location.state.value);
    const [ extraData, setExtraData ] = useState({});
    const { promiseInProgress } = usePromiseTracker();
    const [ posts, setPosts ] = useState([]);
    const [flag, setFlag] = useState([false]);
    const sleep = ms => new Promise(r => setTimeout(r, ms));
 
    const handleSearchResults = async () => {
        await sleep(700);
        const userStats = await getStats(location.state.value, apiKey);
        const temp = await getLevelIcon(location.state.value, apiKey);
        setExtraData(temp);
        setData(userStats);
        setPosts(await getPosts(location.state.value));
    }

    const isDataValid = extraData.hasOwnProperty('name')

    useEffect(() => {
        trackPromise(handleSearchResults());
        setData({});
        setExtraData({});
    }, [location.state.value, flag]);

    return (
      <>
        <Header/>
        <div className='profile-wrapper'>
          <div className='profile__search'>
            <SearchBar keyName={<img src='https://i.imgur.com/bI6DHNf.png' width='30' height='30'/>}/>
          </div>
          <div className='profile__board'>
          {promiseInProgress
              ? <Loading />
              :  isDataValid ? 
              <>
                <Card data={ data } extraData={ extraData } /> 
                <PostList postList={ posts } name={location.state.value} flag={flag} setFlag={setFlag}/> 
              </>
              : <ErrorMessage/> }
          </div>

        </div>
      </>
    );
  }

export default Profile;
