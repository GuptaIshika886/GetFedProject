import react,{useState,useEffect} from "react";
import "../styles.css";
import {Navigate,useNavigate} from "react-router-dom";
import UserLogin from "./UserLogin";
function CntnOwner()
{
  const navigate=useNavigate();
  const[count,setCount]=useState(0)
  const[apiData,setApiData]=useState({})
  const initialValues={username:"",email:"",pwd:"",cpwd:""}
  const[formValues,setFormValues]=useState(initialValues)
  const[formErrors, setFormErrors] = useState({});
  const[isSubmit, setIsSubmit] = useState(false);
  const[submittedUsername,setSubmittedUsername]=useState('');
  const[errorFound,setErrorFound]=useState();
  const[details,setDetails]=useState(
    {
        username:"",
        cname:"",
        email:"",
        pwd:"",
        cpwd:""
    }
)

    useEffect(()=>{
      fetch('http://127.0.0.1:8000/cntnOwnerDetail/')
      .then((res)=>res.json())
      .then((data)=>setApiData(data))
    },[])

    const handleChange=(e)=>{
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
        const newData={...details}
        newData[e.target.id]=e.target.value
        setDetails(newData)
        if(e.target.name=="username"){
          setSubmittedUsername(e.target.value);
        }
    }

    const validate = (values) => {
      const errors = {};
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
      if (!values.username) {
        errors.username ="Username is required!";
        setErrorFound(true);
      }
      if (!values.email) {
        errors.email = "Email is required!";
        setErrorFound(true);
      } else if (!regex.test(values.email)) {
        errors.email = "This is not a valid email format!";
        setErrorFound(true);
      }
      if (!values.pwd) {
        errors.pwd = "Password is required";
        setErrorFound(true);
      } else if (values.pwd.length < 4) {
        errors.pwd = "Password must be more than 4 characters";
        setErrorFound(true);
      } else if (values.pwd.length > 10) {
        errors.pwd = "Password cannot exceed more than 10 characters";
        setErrorFound(true);
      }
      if(!values.cpwd){
          errors.cpwd="Confirm Password Field is Required";
          setErrorFound(true);
      }else if(values.cpwd!==values.pwd){
          errors.cpwd="Password and Confirm Password are not same";
          setErrorFound(true);
      }
      if(apiData.map((item)=>{
        (item.username==submittedUsername)?
        (errors.username="Username already exists"):<div></div>
      }))
      return errors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
        const url='http://127.0.0.1:8000/cntnOwnerDetail/'
        if(Object.keys(formErrors).length === 0){
        fetch(url, { 

        method: 'POST', 
        mode: 'cors', 
        body: JSON.stringify(
            {
                username:details.username,
                cname:details.cname,
                email:details.email,
                pwd:details.pwd,
                cpwd:details.cpwd
            }
        ) 
  
      }).then((res)=>res.json())
      .then((data)=>console.log(data))
      console.log(formErrors)
      redirectLogin()
    }
      };
    
      const redirectLogin=()=>{
       if ((Object.keys(formErrors).length === 0 && isSubmit))
      {
        alert('Signed Up Successfully')
        window.location.href='http://localhost:3000/LoginPage/OwnerLogin'
      }
    
      }
      


    return(
        <div className="register">
        <div className="col-1">
            <center><h2 style={{color:'black'}}>Sign Up</h2></center>
            <form id='form' className='flex flex-col' onSubmit={handleSubmit}>
            <input type="text"  id ="username" placeholder='Username' name="username" value={formValues.username}
            onChange={(e)=>{handleChange(e)}}/><p style={{color:'red'}}>{formErrors.username}</p>
            <input type="text"  id ="cname" placeholder='Canteen Name' name="cname" value={formValues.cname}
            onChange={(e)=>{handleChange(e)}}/><p style={{color:'red'}}>{formErrors.cname}</p>
            <input type="email" id="email" placeholder='Email' name="email" value={formValues.email}
            onChange={(e)=>{handleChange(e)}}/> <p style={{color:'red'}}>{formErrors.email}</p>
            <input type="password" id="pwd" placeholder='Password' name="pwd" value={formValues.pwd}
            onChange={(e)=>{handleChange(e)}}/><p style={{color:'red'}}>{formErrors.pwd}</p>
            <input type="password" id="cpwd" placeholder='Confirm Password' name="cpwd" value={formValues.cpwd}
            onChange={(e)=>{handleChange(e)}}/><p style={{color:'red'}}>{formErrors.cpwd}</p>
            <button className='btn' style={{color:'black'}}>Sign Up</button>
            </form>
</div>
 
        </div>
        
    )
}

export default CntnOwner


