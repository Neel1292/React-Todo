import React, { useState } from 'react'
import todo from '../images/todo.svg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// Get Data from Local Storage
const getLocalEntry = () => {
  const list = localStorage.getItem('lists');
  if (list) {
    return JSON.parse(localStorage.getItem('lists'))
  } else {
    return [];
  }
}

const Todo = () => {
  
  const [inputEntry, setInputEntry] = useState("");
  const [allEntry, setAllEntry] = useState(getLocalEntry());
  const [toggleSubmit, setToggleSubmit] = useState(false);
  const [isEditedItem, setIsEditedItem] = useState(null);

  // Add Item to local storage
  React.useEffect(() => {
    return (
      localStorage.setItem('lists', JSON.stringify(allEntry))
    );
  }, [allEntry])
  
  // Add Note
  const addItem = () => {

    if (!inputEntry) {
      toast.error('Please Enter Note !!', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

    } 
    else if(inputEntry && toggleSubmit){
        setAllEntry(
          allEntry.map((elem) => {
              if(elem.id === isEditedItem){
                return { ...allEntry, data:inputEntry }
              }
              return elem;
          })
        )

      setToggleSubmit(false);
      setInputEntry("");
      setIsEditedItem(null)
      
      toast.success('Note Updated Successfuly ! ', {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

    }

    else {

        // New Entry
      const inputData = { id: new Date().getTime().toString(), data: inputEntry }
      setAllEntry([...allEntry, inputData]);
      setInputEntry("");

      toast.success('Note Added ! ', {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

    }

  }
  
  // Edit Item 
  //    When user click on edit button

  // 1. get the id and name of data on which user has clicked on edited
  // 2. set the toggle mode to change the submit button into edit button
  // 3. update the value of set input with the udated value to edit 
  // 4. To pass the current element Id to new state variable for refrence

  const editItem = (id) => {

    // 1.
    let newEditItem = allEntry.find((note) => {
      return id === note.id;
    })
    
    // 2.
    setToggleSubmit(true);

    // 3.
    setInputEntry(newEditItem.data);

    // 4.
    setIsEditedItem(id);
    
  }


  // Delete Selected Item
  const deleteItem = (index) => {
    const updatedItem = allEntry.filter((note) => {
      return index !== note.id;
    })
    setAllEntry(updatedItem);

    toast.warn('Note Deleted !', {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  }

  // Delete All Notes
  const removeAll = () => {

    setAllEntry([]);

    toast.warn('Note Deleted !', {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  }


  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src={todo} alt="Todo Logo" />
            <figcaption>Add Your List Here ✌️</figcaption>
          </figure>

          <div className="addItems">
            <input type="text" placeholder="✍🏻 Add Items...."
              value={inputEntry} onChange={(e) => setInputEntry(e.target.value)} />
              {
                toggleSubmit ? <i className="far fa-edit" title="Update Item" onClick={addItem} ></i>
                : <i className="fa fa-plus add-btn" title="Add Item" onClick={addItem} ></i>
              }
          </div>

          <div className="showItems">
            {
              allEntry.map((note) => {
                return (
                  <div className="eachItem" key={note.id}>
                    <h3>{note.data}</h3>
                    <div className="todo-btn">
                      <i className="far fa-edit" title="Edit Item" onClick={() => editItem(note.id)}></i>
                      <i className="far fa-trash-alt add-btn" title="Delete Item" onClick={() => deleteItem(note.id)}></i>
                    </div>
                  </div>
                );
              })
            }

          </div>

          {/* Clear All */}
          <div className="showItems">
            <button className="btn effect04" data-sm-link-text="Remove All" onClick={removeAll}><span>CHECK ALL</span></button>
          </div>

          <ToastContainer limit={1} />

        </div>
      </div>
    </>
  )
}

export default Todo
