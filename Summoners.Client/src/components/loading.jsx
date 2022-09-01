import LoadingIcons from 'react-loading-icons';
import '../styles/loading.css'

const Loading = () => {
    return (
        <div className="loading">
            <LoadingIcons.ThreeDots />
        </div>
    );
}

export default Loading;