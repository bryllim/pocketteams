import React from "react";

const SubTask = () => {
//   const [inputList, setInputList] = useState({ subtask: "" }, { subtask: "" });
  
//   const handleChange = (e , index) => {
//     const { name, value } = e.target;
//     const list = [...inputList];
//     list[index][name] = value;

//     setInputList({
//       ...inputList,
//       [name]: value,
//     });
//   };

//   const addInput = () => {
//       setInputList([...inputList, {subtask: ""}])
//   }

//   console.log(JSON.stringify(inputList, null, 2));

  return (
    <div>
      {/* {inputList.map(( item, i ) => { */}
        {/* return ( */}
          <div
            // key={i} 
            className="d-flex align-items-center my-2 ">
            <i class="lni lni-checkmark-circle pe-2"></i>
            <input
              name="subtask"
              className="full"
              type="text"
            //   value={item.subtask}
            //   onChange={e => handleChange (e, i)}
            />
          </div>
        {/* ); */}
      {/* })} */}
    </div>
  );
};

export default SubTask;
