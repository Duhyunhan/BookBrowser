import React from 'react';
import './BookComponent.css'


function BookComponent({props}) {
    console.log('props?',props)
    const {authors,contents,datetime,title,url,publisher,price,thumbnail,status,sale_price}=props;
    // console.log('title',url)

    const getTime = (datetime)=>{
      const date = new Date(datetime);
      return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
    }

  return(
    <div className="container" >
        <img className="thumbnail" src={thumbnail} alt="aa" />   
        <p className="title">{title}</p>
        <p className="authors">{authors}</p>
        <p className="publisher">{publisher}</p>
        <p className="datetime">{getTime(datetime)}</p>
        <p className="price">₩ {status==="정상판매" ? sale_price:price}</p>
    </div>
  );
}

const styles = {
  container:{
    borderWidth:1,
    display:'flex',
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center'
  }
}

export default BookComponent;