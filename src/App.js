import React,{useState} from 'react';
import Search from '../src/Image/search-solid.png'
import './App.css';
import axios from 'axios';
import BookComponent from './components/BookComponent';

function App() {
  const [input,setInput] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);


  function search(e){
    const {value, name} = e.target;
    setInput(value);
  }

  async function CallApi (e) {
    e.preventDefault();
    setLoading(false);
    const options ={
      method:'get',
      url:'https://dapi.kakao.com/v3/search/book',
      headers: {
        Authorization: "KakaoAK 07d3d1fda2336d9ea02e5db1bf60439b" 
      },
      params : {
        query: `${input}`,
        sort: "accuracy", // accuracy | recency 정확도 or 최신
        // page: 1, // 페이지번호
        size: 10, // 한 페이지에 보여 질 문서의 개수
        target:'title'
      },
  }
    await axios(options).then(response => {
      // console.log(response.data)
      setData([...response.data.documents])
    })
    setLoading(true);
    setInput('');
  }

  return (
    <div className="App">
      <form action="" onSubmit={e=>CallApi(e)}>
        <input type="text" name="search" onChange={search} value={input}/>
        <input type="image" src={Search} alt="제출버튼"/>
      </form>
      {loading? (<p>검색어를 입력해 주세요</p>):(<p>로딩중....</p>)}
      <div className="display">
        {data.map(doc=><BookComponent props={doc}/>)}
      </div>
    </div>
  );
}

export default App;
