import React, { useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { divisions } from '../divisions/divisions';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../Firebase/Firebase.init';
import { db } from '../../Firebase/Firebase.init';
import { doc, setDoc } from 'firebase/firestore';
import { storage } from '../../Firebase/Firebase.init';

const Home = () => {
    const [selectedDivision, setSelectedDivision] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [selectedUpazila, setSelectedUpazila] = useState("");
    const [selectVillage, setSelectedVillage] = useState("");
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        fatherName: "",
        motherName: "",
        birthDate: "",
        signature: "",
        image: "",
    })
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

          setFormData((prev) => ({
            ...prev,
            [name]: value,
}))
    }
    
    const handleData = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const userCredential = await 
            createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            let imageUrl = "";
               if(formData.image){
                const storageRef = ref(storage, `users/${user.uid}/${formData.image.name}`);
                const uploadTask = await uploadBytesResumable(storageRef, formData.image);
                imageUrl = await getDownloadURL(uploadTask);
               }

             await setDoc(doc(db, "users", user.uid), {
                firstName: formData.firstName,
                lastName: formData.lastName,
                fatherName:formData.fatherName,
                motherName: formData.motherName,
                birthDate: formData.birthDate,
                signature: formData.signature,
                image: imageUrl,

                division: selectedDivision,
                district: selectedDistrict,
                upazila: selectedUpazila,
                village: selectVillage
                 
                

             });

            console.log("User & Data Saved Successfull");
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
                          <input name="firstName" className="input text-black text-lg bg-[#018d01]" placeholder="Fast Name" value={formData.firstName} onChange={handleChange}/>
                         
                         <label className='label text-[#DADADA] text-lg'>Last-Name</label>
                         <input name="lastName" className='input text-black text-lg bg-[#018d01]' placeholder='Last Name' value={formData.lastName} onChange={handleChange} />

                          <label className='label text-[#DADADA] text-lg'>Father-Name</label>
                          <input name="fatherName" className='input text-black text-lg bg-[#018d01]' placeholder='Father Name' value={formData.fatherName} onChange={handleChange}/>

                          <label className='label text-[#DADADA] text-lg'>Mother-Name</label>
                          <input name='motherName' className='input text-black text-lg bg-[#018d01]' placeholder='Mother Name' value={formData.motherName} onChange={handleChange}/>

                          <label className='label text-[#DADADA] text-lg'>Date of Birth</label>
                          <input type='date' name="birthDate" className='input text-black text-lg bg-[#018d01]' placeholder='Date of Birth' value={formData.birthDate} onChange={handleChange}/>

                            <label className='label text-[#DADADA] text-lg'>Signature</label>
                            <input type="text" name="signature" className='input text-black text-lg bg-[#018d01]' placeholder='Signature' value={formData.signature} onChange={handleChange}/>

                           <div className='flex pt-5 gap-12'>
                                <label className='label text-[#DADADA] text-lg'>Image</label>            
                                <input type="file" accept="image/*" className='input text-black text-lg bg-[#018d01] w-[130px] h-[130px]' placeholder='image' src="" alt="" onChange={(e) => setFormData((prev) => ({
                                       ...prev,
                                    image: e.target.files[0],
                                 }))
                              }
                                  />
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