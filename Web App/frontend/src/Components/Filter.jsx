import React from 'react';
import Select from 'react-select';

function Filter({data,onSort}){
    
    const options = [
        {value:'name', label:'name'},
        {value:'price',label:'price'},
        {value:'distance',label:'distance'}
    ];
    const defaultValue = options[0];
    
    const  handleChange = (selectedOption) => {
    if (data.length !== 0) {
        
        if(selectedOption.value === 'price'){
          console.log('price');
          const sortedData = data.sort((a, b) => {
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
          onSort(sortedData);
        }
        else if(selectedOption.value === 'distance'){
          console.log('distance');
          const sortedData = data.sort((a, b) => {
            
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

        <Select options={options} onChange={handleChange} defaultValue={defaultValue}/>

    </div>
);
}
export default Filter;