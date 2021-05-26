import React from 'react';
import './BookComponent.css'
import noimage from '../Image/no-picture.jpg';


function BookComponent({props}) {
    // console.log('props?',props)
    const {authors,datetime,title,url,publisher,price,thumbnail,status,sale_price}=props;
    // console.log('title',url)

    const getTime = (datetime)=>{
      const date = new Date(datetime);
      return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
    }

  return(
    <div className="container" >
        <a href={url} rel="noreferrer" target="_blank" >
          <img className="thumbnail" src={thumbnail?thumbnail:noimage} alt="aa" /> 
        </a>  
        <p className="title">{title}</p>
        <p className="authors">{authors}</p>
        <p className="publisher">{publisher}</p>
        <p className="datetime">{getTime(datetime)}</p>
        <p className="price">₩ {status==="정상판매" ? (sale_price>0? sale_price:price):price}</p>
    </div>
  );
}


export default BookComponent;