import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import Loading from '../Loading/Loading';
import SingleList from '../SingleList/SingleList';

const GetLists = () => {
    const {
        isLoading,
        error,
        data: lists,
        refetch,
      } = useQuery("lists", () =>
        fetch(`http://localhost:4000/lists`).then((res) => res.json())
      );
      if(isLoading){
          return <Loading/>
      }
    
    return (
        <div >
           <h1 className='text-2xl text-center my-5'> Total lists: {lists.length}</h1>
            <div className='grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5'>
                {
                    lists?.map(list=><SingleList refetch={refetch} key={list._id} list={list}/>)
                }
            </div>
            
        </div>
    );
};

export default GetLists;