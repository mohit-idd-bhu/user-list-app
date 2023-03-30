import React, { useState, useEffect } from "react";
import MyLoader from "../UI/MyLoader";
import User from './User';

function UserList() {
  const [data, setData] = useState([]);
  const [loading,setLoading]=useState(false);
  const [page, setPage] = useState(10);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const response = await (await fetch(`https://randomuser.me/api/?results=200`)).json();
    const newData = response.results;
    const modifiedData=
        newData.map(
            user =>{
                const newUser={
                    name: user.name.first+' '+user.name.last,
                    email: user.email,
                    phone: user.phone,
                    picture:user.picture.large
                }
                return newUser;
            }
        );
    setData(modifiedData);
    setLoading(false);
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      setLoading(true)
      setTimeout(
        ()=>{
          setPage(page=>page+10);
          setLoading(false);
        }
        ,1000
      )
      
    }
  };

  return (
    <React.Fragment>

      {data.length >0 
      &&
      data.slice(0,page).map( user=>
        <User name={user.name} email={user.email} phone={user.phone} picture={user.picture} key={user.email}/>
      )}

      {loading && 
        <MyLoader/>
      }

    </React.Fragment>
  );
}

export default UserList;
