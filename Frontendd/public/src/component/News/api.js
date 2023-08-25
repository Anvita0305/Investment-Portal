import {useEffect,useState} from "react";
import OutlinedCard from "./card";


function projectCards(val){
    return (
        <>
        <OutlinedCard
        title={val.title}
        subheader={val.author}
        image={val.urlToImage}
        description={val.description}
        content={val.content}
        url={val.url}
        />
        </>
    );
}


function Api() {

const [data, setData] = useState([]);
useEffect(() => {
	fetch('https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=13a283f294f64af591c92f7749cbc7a8')
	.then(response => response.json())
	.then(json => {
		const data=json; console.log(data.articles); 
		setData(data.articles);
	})
	}, []);

return (
	<div>
		{/* <OutlinedCard /> */}
		<div id="cards">{data.map(projectCards)}</div>
	</div>
);
}

export default Api;
