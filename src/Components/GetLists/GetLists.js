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
        fetch(`https://peaceful-river-54114.herokuapp.com/lists`).then((res) => res.json())
      );
      if(isLoading){
          return <Loading/>
      }
    
    return (
        <div className='px-3' >
           <h1 className='text-3xl text-center my-8 font-semibold text-gray-700'> You have made {lists.length} To-Do Lists</h1>
            <div className='grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5'>
                {
                    lists?.map(list=><SingleList refetch={refetch} key={list._id} list={list}/>)
                }
            </div>
            
        </div>
    );
};

export default GetLists;