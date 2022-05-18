import React from 'react';
import AddToLists from '../AddToLists/AddToLists';
import GetLists from '../GetLists/GetLists';

const ToDo = () => {
    return (
        <div className='px-12'>
            <AddToLists/>
            <GetLists/>
        </div>
    );
};

export default ToDo;