const host='http://localhost:8080/Bibliotheque/' 
const fetchCustomers = (h='')=>{
    const fetchData=async(url,method,data='')=>{
        
        const options={
            method:method,
            headers:{
                "Content-Type": "application/x-www-form-urlencoded",
            },        
        }
        if(method!='GET')options.body=data.toString()
   
    
        const r = await fetch(h+url,options)
        if(r.ok) return r.json()
            else throw new Error('Erreur de url')
        }       
    
    return {
       
        get:async(url)=>{
            return await fetchData(url,'GET')
        },
        post:async(url,data)=>{
            console.log("dd")
            return await fetchData(url,'POST',data)
        },
        put:async(data)=>{
            console.log("ddd")
            return await fetchData('PUT',data)
        },
        delete:async(data)=>{
            return await fetchData('DELETE',data)
        }

    }
  
   
}
 export const api= fetchCustomers('http://192.168.1.141:3000')