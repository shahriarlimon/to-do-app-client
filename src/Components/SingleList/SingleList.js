import React, { useState } from "react";

const SingleList = ({ list,refetch }) => {
  const { _id, title, description } = list;
  const [strike, setStrike] = useState(false)
  const handleDelete = (title) => {
    const url = `https://peaceful-river-54114.herokuapp.com/list/${title}`;
    fetch(url, {
      method: "DELETE",
    }).then(res=>res.json()).then(data=>{
        if(data.deletedCount){
            alert('Successfully deleted')
            refetch();
        }
    })
  };
  return (
    <div class="card bg-neutral text-neutral-content">
      <div class="card-body items-center text-center">
        {strike?<strike><h2 class="card-title">{title}</h2></strike>:<h2 class="card-title">{title}</h2>}
        { strike?<strike><p>{description}</p></strike> :<p>{description}</p>}
        <div class="card-actions justify-end">
          <button onClick={()=>setStrike(!strike)} class="btn btn-primary">Completed</button>
          <button onClick={()=>handleDelete(title)} class="btn btn-ghost">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleList;
