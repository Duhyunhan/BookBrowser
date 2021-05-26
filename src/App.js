import React,{useState, useEffect, useRef, useCallback} from 'react';
import Search from '../src/Image/search-solid.png'
import './App.css';
import axios from 'axios';
import BookComponent from './components/BookComponent';

const App=()=> {
  const [inputs,setInput] = useState('');
  const [data, setData] = useState([]);
  const page = useRef(1);
  const options ={
    method:'get',
    url:'https://dapi.kakao.com/v3/search/book',
    headers: {
      Authorization: "KakaoAK 07d3d1fda2336d9ea02e5db1bf60439b" 
    },
    params : {
      query: `${inputs}`,
      page:page.current,
      sort: "accuracy", // accuracy | recency 정확도 or 최신
      size: 10, // 한 페이지에 보여 질 문서의 개수
      target:'title'
    },
}
  const search=(e)=>{
    const {value} = e.target;
    setInput(value);
  }
  const infiniteScroll = useCallback(()=>{
    // console.log('input state',inputs);
    let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
    let scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
    let clientHeight = document.documentElement.clientHeight;
    // // console.log('scrollHeight',scrollHeight,'scrollTop',scrollTop,'clientHeight',clientHeight)
    // // console.log('d',Math.round(scrollTop+clientHeight), scrollHeight)
    if (scrollTop+clientHeight === scrollHeight){
      console.log('무한스크롤 해야함...',scrollTop+clientHeight, scrollHeight);
      console.log('input state',inputs);
      setTimeout(()=>{
        getData();
      },1000)
      // getData();
    }
  },[inputs,data])

  useEffect(()=>{
    window.addEventListener('scroll',infiniteScroll,true)
  },[infiniteScroll])

  

  async function getData(){
    console.log(inputs, page.current, data.length)
    document.getElementById('state').innerText="로딩중...."
    document.getElementById('loading').innerText="로딩중...."
    

    await axios(options).then(response => {
      console.log('response',response)
      if(response.data.documents.length===0){
        document.getElementById('state').innerText="검색결과가 없습니다."
      }else{
        document.getElementById('state').innerText="검색어를 입력해 주세요";
        page.current +=1;
      }

      if (response.data.meta.total_count===data.length){
        document.getElementById('loading').innerText=""
      }else{
        setData([...data,...response.data.documents])
        document.getElementById('loading').innerText=""
      }
    })

    // window.addEventListener('scroll',infiniteScroll,true)
  } 
 function CallApi (e) {
    e.preventDefault();
    setData([]);
    page.current=1;
    if (inputs.length===0){
      document.getElementById('state').innerText="텍스트를 입력해 주세요";
      document.getElementById('loading').innerText="";
    }else {
      getData();
    }
    
  }

  return (
    <div className="App">
      <form action="" onSubmit={e=>CallApi(e)}>
        <input type="text" name="search" onChange={search} value={inputs}/>
        <input type="image" src={Search} alt="제출버튼"/>
      </form>
      <p id="state">검색어를 입력해 주세요</p>
      <div className="display">
        {data.map(doc=><BookComponent key={doc.contents} props={doc}/>)}
      </div>
      <div id="loading"></div>
    </div>
  );
}

export default React.memo(App);
