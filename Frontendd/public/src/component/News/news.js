import react from 'react';
import OutlinedCard from './card';
import Api from './api';



const News = () => {
    return (
        <div>
            <h1 style={{color:"white"}}>News</h1>
            <Api />
        </div>
   )
}

export default News;