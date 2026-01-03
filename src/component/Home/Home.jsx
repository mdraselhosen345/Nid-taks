import React, { useState } from 'react';
import { divisions } from '../divisions/divisions';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../Firebase/Firebase.init';


const Home = () => {
    const [selectedDivision, setSelectedDivision] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [selectedUpazila, setSelectedUpazila] = useState("");
    const [selectVillage, setSelectedVillage] = useState("");
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [fast, setFast] = useState("");
    const [last, setLast] = useState("");
    const [father, setFather] = useState("");
    const [mother, setMother] = useState("");
    const [date, setDate] = useState("");
    const [signature, setSignature] = useState("");
    const [image, setImage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    
    const handleData = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const userCredential = await 
            createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log("User Created:", user);
        }catch (error) {
            setError(error.message);
        }finally{
            setLoading(false);
        }

    };
    
    
    return (
        <div className='h-[700px] bg-gradient-to-r from-[#004700] via-[#018d01] to-[#004700]'>
            
               <div className='flex'>
                {/* left side */}
                   <div className='w-[640px] h-[700px] pt-5'>
                     <form>
                      <fieldset className="fieldset ml-[120px]">
                        <label className="label text-[#DADADA] text-lg">Fast-Name</label>
                          <input type="fast" className="input text-black text-lg bg-[#018d01]" placeholder="Fast Name"/>
                         
                         <label className='label text-[#DADADA] text-lg'>Last-Name</label>
                         <input type="last" className='input text-black text-lg bg-[#018d01]' placeholder='Last Name' />

                          <label className='label text-[#DADADA] text-lg'>Father-Name</label>
                          <input type="father" className='input text-black text-lg bg-[#018d01]' placeholder='Father Name'/>

                          <label className='label text-[#DADADA] text-lg'>Mother-Name</label>
                          <input type='mother' className='input text-black text-lg bg-[#018d01]' placeholder='Mother Name'/>

                          <label className='label text-[#DADADA] text-lg'>Date of Birth</label>
                          <input type='date' className='input text-black text-lg bg-[#018d01]' placeholder='Date of Birth'/>

                            <label className='label text-[#DADADA] text-lg'>Signature</label>
                            <input type="signature" className='input text-black text-lg bg-[#018d01]' placeholder='Signature'/>

                          <div className='flex pt-5 gap-12'>
                                <label className='label text-[#DADADA] text-lg'>Image</label>            
                                <input type="image" className='input text-black text-lg bg-[#018d01] w-[130px] h-[130px]' placeholder='image' src="" alt="" />
                          </div>

                        </fieldset>
                     </form>

                   </div>

                   {/* right side */}
               <div className='w-[640px] pt-5'>
                    
 <form>
 <fieldset className="fieldset ml-[120px]">
  {/* Division */}
<label className="label text-[#DADADA] text-lg">Division :</label>
<select
  className="input text-black text-lg bg-[#018d01]"
  value={selectedDivision}
  onChange={(e) => {
    setSelectedDivision(e.target.value);
    setSelectedDistrict("");
    setSelectedUpazila("");
    setSelectedVillage("");
  }}
>
  <option value="">Select Division</option>
  {Object.keys(divisions).map((division) => (
    <option key={division} value={division}>
      {division}
    </option>
  ))}
</select>

{/* District */}
{selectedDivision && (
  <>
    <label className="label text-[#DADADA] text-lg">District :</label>
    <select
      className="input text-black text-lg bg-[#018d01]"
      value={selectedDistrict}
      onChange={(e) => {
        setSelectedDistrict(e.target.value);
        setSelectedUpazila("");
        setSelectedVillage("");
      }}
    >
      <option value="">Select District</option>
      {Object.keys(divisions[selectedDivision] || {}).map((district) => (
        <option key={district} value={district}>
          {district}
        </option>
      ))}
    </select>
  </>
)}

{/* Upazila */}
{selectedDistrict && (
  <>
    <label className="label text-[#DADADA] text-lg">Upazila :</label>
    <select
      className="input text-black text-lg bg-[#018d01]"
      value={selectedUpazila}
      onChange={(e) => {
         setSelectedUpazila(e.target.value);
         setSelectedVillage("");
      }            
        }
    >
      <option value="">Select Upazila</option>
      {Object.keys(
        divisions[selectedDivision]?.[selectedDistrict] || {}
      ).map((upazila) => (
        <option key={upazila} value={upazila}>
          {upazila}
        </option>
      ))}
    </select>
  </>
)}
{/* Village */}

{
    selectedUpazila && (
        <>
         <label className='label text-[#DADADA] text-lg'>Village :</label>
        <select
           className='input text-black text-lg bg-[#018d01]'
           value={selectVillage}
           onChange={(e) => setSelectedVillage(e.target.value)}
        >
          <option value="">select Village</option>
             {(divisions[selectedDivision] 
                ?.[selectedDistrict]
                ?.[selectedUpazila] || []
              ).map((village) => (
                <option key={village} value={village}>
                    {village}
                </option>
                
              ))
                   
                }
        </select>
        </>
    )
}

                        </fieldset>
                     </form>

                      <div className=''>
                          
                              <div className='flex ml-[120px]'>
                                    <div className='pt-3'>
                                      <form onSubmit={handleData}>
                                        <fieldset className="fieldset">
                                         <label className="label text-[#DADADA] text-lg pt-1">Number :</label>
                                         <input type="number" className="input text-black text-lg bg-[#018d01]" name="" id="" placeholder='Number' />
                                         <br />
                                         <label className="label text-[#DADADA] text-lg pt-1">Email :</label>
                                         <input type="email" className="input text-black text-lg bg-[#018d01]" name="" id="" placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                                          <br />
                                         <label className="label text-[#DADADA] text-lg pt-1">password</label>
                                         <input type="password" className="input text-black text-lg bg-[#018d01]" name="" id="" placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} required/>
                                             <div className='pt-1'>
                                                 <input type="checkbox" name="" id="" />
                                             </div>
                                              {error && <p className="text-red-600 mt-2">{error}</p>}
                                           <button type='submit' className="btn btn-primary mt-1 text-lg w-[320px]"
                                                 disabled={loading}>
                                                submit
                                           </button> 
                                        </fieldset>
                                       </form>
                                     </div>
                              </div>
                      </div>
                   </div>
               </div>
        </div>
    );
};

export default Home;