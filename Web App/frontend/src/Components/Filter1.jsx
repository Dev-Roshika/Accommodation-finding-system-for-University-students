import React,{ useState } from 'react';
import Select from 'react-select';
import "../css/home.css";

function Filter1({data,onSort}){
 
    const [selectedOption, setSelectedOption] = useState(null);
    const handleOptionChange = (event) => {
      setSelectedOption(event.target.value);
    };
    
    const options = [
        {value:'name', label:'name'},
        {value:'price',label:'price'},
        {value:'distance',label:'distance'}
    ];
    //setSelectedOption('all');
    const defaultValue = options[0];
        
    const  handleChange = (selectedOption) => {
     
    if (data.length !== 0) {
        
        if(selectedOption.value === 'price'){
          console.log('price');
          const sortedData = data;
          onSort(sortedData);
        }
        else if(selectedOption.value === 'distance'){
          console.log('distance');
          const sortedData = data
          onSort(sortedData);
        }
        else if(selectedOption.value === 'name'){
            console.log('name');
            let byName = data.slice(0);
            byName.sort(function(a, b) {
            var x = a.Title?.toLowerCase()||'';
            var y = b.Title?.toLowerCase()||'';
            return x < y ? -1 : x > y ? 1 : 0;
            });
            onSort(byName);
        }
        else{
          console.log('everything went wrong');
        }
      

    } else {
      console.log("Element at index 2 does not exist.");
    }

    };
    
return (
    
    <div className="filter">
        <p>this is a test....</p>
      
        <Select options={options} onChange={handleChange} defaultValue={""}/>
        <div>

              <div>
      <h3>by Gender:</h3>
      <label>
        <input
          type="radio"
          value="boy"
          checked={selectedOption === "boy"}
          onChange={handleOptionChange}
        />
        Boy
      </label>
      <br />
      <label>
        <input
          type="radio"
          value="girl"
          checked={selectedOption === "girl"}
          onChange={handleOptionChange}
        />
        Girl
      </label>
      <br /><label>
        <input
          type="radio"
          value="any"
          checked={selectedOption === "any"}
          onChange={handleOptionChange}
        />
        All
      </label>
      <p>show results for : {selectedOption}</p>
    </div>     
        </div>
    </div>
);
}
export default Filter1;