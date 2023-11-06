import React,{ useState } from 'react';
import Select from 'react-select';
import "../css/home.css";


function Filter({data,onSort}){
  
    const [selectedOption, setSelectedOption] = useState(null);
    const [sortby,setSortby] = useState("");
    const [sortedValue, setSortedValue] = useState([]);

    const handleOptionChange = (event) => {
      console.log(event.target.value);
      setSelectedOption(event.target.value);
     
      if(event.target.value === 'boy')
       {   console.log("Boy");
           
           console.log("test");
           let filtered = sortedValue.filter(asortedValue=>{
            return(
              asortedValue.Girls === 0
            );
          });onSort(filtered);
      }
      else if(event.target.value === 'girl') 
        {   
          console.log("Girls");     
          console.log("test");
          let filtered = sortedValue.filter(asortedValue=>{
          return(
            asortedValue.Boys === 0
          );
        });
        onSort(filtered);
        }
          else {console.log("Anything");
              onSort(sortedValue);     
        }
    };
  
    const options = [
        {value:'name', label:'name'},
        {value:'price',label:'price'},
        {value:'distance',label:'distance'}
    ];
    const defaultValue = options[0];

    const colourstyles = {
      placeholder : (defaultsyles) => {
        return{
          ...defaultsyles,
          color:'#016551',
          
        }
      }
    }
    const  handleChange = (selectedOption) => {
     
    if (data.length !== 0) {
        
        if(selectedOption.value === 'price'){
          console.log('price');
          setSortby("price");
          let byPrice = data.sort((a, b) => {
            const PriceA = a.Price;
            const PriceB = b.Price;
          
            if (PriceA < PriceB) {
              return -1;
            }
            if (PriceA > PriceB) {
              return 1;
            }
            return 0;
          });
          setSortedValue(byPrice);
          onSort(byPrice);
        }
        else if(selectedOption.value === 'distance'){
          console.log('distance');
         // setSortby("distance");
          let sortedData = data.sort((a, b) => {
            
            let x =  a.Distance.toLowerCase();
            let y =  b.Distance.toLowerCase();
            
            let flag1 = false;
            let flag2 = false;
            if(x.includes('km')){
             flag1 = true;
             
            }
            if(y.includes('km')){
             flag2 = true;   
            
            }
           let distA = x.replace(/\D/g,'');
           let distB = y.replace(/\D/g,'');
          
           if(distB ===0 || distB === '') distB = 1000000;
          if(distA ===0 || distA === '') distA = 10000000;
         
          distA = parseInt(distA);  
          distB = parseInt(distB);  

           if(flag1){ 
                distA = distA*1000;
               }
          if(flag2){ 
             distB = distB*1000;
          }
            if (distA < distB) {
              return -1;
            }
            if (distA > distB) {
              return 1;
            }
          
            return 0;
          });
          setSortedValue(sortedData);
          onSort(sortedData);
        }
        else if(selectedOption.value === 'name'){
            console.log('name');
            setSortby("name");
            let byName = data.slice(0);
            byName.sort(function(a, b) {
            var x = a.Title?.toLowerCase()||'';
            var y = b.Title?.toLowerCase()||'';
            return x < y ? -1 : x > y ? 1 : 0;
            });
            setSortedValue(byName);
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
    
    <div className="headerSearch">
        <div className='selectmenu'><Select options={options} onChange={handleChange} styles={colourstyles}/></div>
        
        <div>

              <div>
      
      <label  className='radio'>
        <input
          type="radio"
          value="boy"
          checked={selectedOption === "boy"}
          onChange={handleOptionChange}
         
        />
        &nbsp;Boy&nbsp;&nbsp;
      </label>
      
      <label  className='radio'>
        <input
          type="radio"
          value="girl"
          checked={selectedOption === "girl"}
          onChange={handleOptionChange}
        />
        &nbsp;Girl&nbsp;&nbsp;
      </label>
      <label  className='radio'>
        <input
          type="radio"
          value="any"
          checked={selectedOption === "any"}
          onChange={handleOptionChange}
        />
        &nbsp;All&nbsp;
      </label>
     
    </div>     
        </div>
    </div>
);
}
export default Filter;