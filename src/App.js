import React, { useEffect, useState } from "react";
import "./styles.css";


function useFetch(url) {
  const [data, setData] = useState('');
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true);

  const fetchApi = async () => {
    try {
      const res = await fetch(url).then((res) => res.json())
      setData(res)
      setLoading(false)
      setError(null)
    } catch(error) {
      setError('There is a problem');
      console.warn(error.message)
    }
  }

  useEffect(() => {
    setLoading(true)
    // fetch(url)
    //   .then(res => res.json())
    //   .then(data => {
    //     setLoading(false);
    //     setData(data);
    //     setError(null);
    //   }).catch(err => {
    //     console.warn(err.message)
    //     setError(err.message);
    //     setLoading(false);
    //   })

    
    fetchApi()
  },[url])

  return {
    loading,
    data,
    error
  }
}

const postIds = [1,2,3,4,5,6,7,8]

export default function App() {
  const [index, setIndex] = useState(0);

  const { loading, data: post, error } = useFetch(
   `https://jsonplaceholder.typicode.com/posts/${postIds[index]}`
  )
  
  const handleIndex = () => {
    setIndex(index => index === postIds.length - 1 ? index : index + 1)
  }

  console.log(post)

  if(loading) {
    return <p>Loading...</p>
  }

  if(error) {
    return (<React.Fragment>
      <p>{error}</p>
      <button onClick={handleIndex}>Generate Post</button>
      </React.Fragment>)
  }

  return (
    <div className="App">
      <h3>{post.title}</h3>
      <p>{post.body}</p>
      <button onClick={handleIndex}>Generate Post</button>
    </div>
  );
}
