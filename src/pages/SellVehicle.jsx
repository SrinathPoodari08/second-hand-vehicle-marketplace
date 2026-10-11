import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/VehicleContext";
import { FieldError, Label, inputCls } from "../components/Common";

const initial = { vehicleType:"Car", brand:"", model:"", variant:"", year:"", registrationYear:"", price:"", fuel:"Petrol", transmission:"Manual", kilometers:"", owners:"1", color:"", city:"", state:"", areaPincode:"", condition:"Good", description:"", sellerName:"", phone:"", email:"", images:[] };

export default function SellVehicle() {
  const { addListing, userData, showToast } = useApp();
  const navigate = useNavigate();
  const [form,setForm]=useState({...initial,sellerName:userData?.name||"",email:userData?.email||""});
  const [error,setError]=useState(""); const [preview,setPreview]=useState(false);
  const update=(key,value)=>setForm(f=>({...f,[key]:value}));
  function handlePhotos(e){ const files=Array.from(e.target.files||[]); const invalid=files.some(f=>!f.type.startsWith("image/")); if(invalid){setError("Please select image files only.");return;} files.slice(0,6).forEach(file=>{const reader=new FileReader();reader.onload=()=>setForm(f=>({...f,images:[...f.images,reader.result].slice(0,6)}));reader.readAsDataURL(file);}); }
  function validate(){ if(!form.brand||!form.model||!form.year||!form.registrationYear||!form.price||!form.city||!form.state||!form.areaPincode||!form.sellerName||!form.phone||!form.email||!form.description||!form.images.length){setError("Please complete all required vehicle, location, image and contact fields.");return false;} if(!/^\d{10}$/.test(form.phone)){setError("Enter a valid 10-digit phone number.");return false;} if(!form.email.includes("@")){setError("Enter a valid email address.");return false;} return true; }
  function submit(e){e.preventDefault();if(!validate())return;addListing({...form,status:"Published",year:Number(form.year),registrationYear:Number(form.registrationYear),price:Number(form.price),kilometers:Number(form.kilometers)||0,owners:Number(form.owners)||1});navigate("/dashboard");}
  function draft(){localStorage.setItem("vehicleListingDraft",JSON.stringify(form));showToast("Listing draft saved","success");}
  function doPreview(){if(validate())setPreview(true);}
  return <div className="max-w-4xl mx-auto px-4 py-10"><div className="mb-7"><h1 className="font-display font-extrabold text-3xl">Sell your vehicle</h1><p className="text-muted mt-1">Enter your vehicle details and upload photos. Your listing will appear to buyers after you publish it.</p></div>
    <form onSubmit={submit} className="surface border border-c rounded-lg p-5 md:p-7">
      {error&&<div className="rounded-md px-4 py-3 mb-6 text-sm" style={{background:"var(--danger-bg)",color:"var(--danger)"}}>{error}</div>}
      <div className="grid sm:grid-cols-2 gap-5">
        <div><Label>Vehicle type</Label><select className={inputCls} value={form.vehicleType} onChange={e=>update("vehicleType",e.target.value)}>{["Car","SUV","Sedan","Hatchback","Bike"].map(x=><option key={x}>{x}</option>)}</select></div>
        {[['brand','Brand','e.g. Maruti Suzuki'],['model','Model','e.g. Swift'],['variant','Variant','e.g. VXI'],['year','Manufacturing year','2024'],['registrationYear','Registration year','2024'],['price','Expected selling price (₹)','650000'],['kilometers','Kilometers driven','25000'],['color','Color','White'],['city','City','Warangal'],['state','State','Telangana'],['areaPincode','Area / Pincode','506001'],['sellerName','Seller name','Your name'],['phone','Phone number','10-digit number'],['email','Email address','you@example.com']].map(([key,label,placeholder])=><div key={key}><Label htmlFor={key}>{label}</Label><input id={key} className={inputCls} placeholder={placeholder} type={['year','registrationYear','price','kilometers'].includes(key)?'number':key==='phone'?'tel':key==='email'?'email':'text'} value={form[key]} onChange={e=>update(key,e.target.value)}/></div>)}
        <div><Label>Fuel type</Label><select className={inputCls} value={form.fuel} onChange={e=>update("fuel",e.target.value)}>{["Petrol","Diesel","CNG","Electric","Hybrid"].map(x=><option key={x}>{x}</option>)}</select></div>
        <div><Label>Transmission</Label><select className={inputCls} value={form.transmission} onChange={e=>update("transmission",e.target.value)}><option>Manual</option><option>Automatic</option></select></div>
        <div><Label>Number of owners</Label><select className={inputCls} value={form.owners} onChange={e=>update("owners",e.target.value)}>{[1,2,3,4].map(x=><option key={x} value={x}>{x}{x===1?'st':x===2?'nd':x===3?'rd':'th'} owner</option>)}</select></div>
        <div><Label>Vehicle condition</Label><select className={inputCls} value={form.condition} onChange={e=>update("condition",e.target.value)}>{["Excellent","Good","Fair"].map(x=><option key={x}>{x}</option>)}</select></div>
      </div>
      <div className="mt-5"><Label htmlFor="vehicle-photo">Vehicle images (up to 6)</Label><input id="vehicle-photo" type="file" accept="image/*" multiple className={inputCls} onChange={handlePhotos}/><div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-3">{form.images.map((img,i)=><img key={i} src={img} alt={`Vehicle preview ${i+1}`} className="w-full h-32 object-cover rounded-md border border-c"/>)}</div></div>
      <div className="mt-5"><Label htmlFor="description">Vehicle description</Label><textarea id="description" rows="5" className={inputCls} placeholder="Tell buyers about the vehicle..." value={form.description} onChange={e=>update("description",e.target.value)}/></div>
      <div className="flex flex-wrap gap-3 mt-6"><button type="button" onClick={draft} className="px-5 py-3 rounded-md border border-c font-semibold">Save Draft</button><button type="button" onClick={doPreview} className="px-5 py-3 rounded-md border border-c font-semibold">Preview Listing</button><button type="submit" className="px-6 py-3 rounded-md font-bold" style={{background:"var(--navy)",color:"#fff"}}>Submit Listing</button></div>
    </form>
    {preview&&<div className="fixed inset-0 z-[90] bg-black/50 flex items-center justify-center p-4" onClick={()=>setPreview(false)}><div className="surface rounded-lg max-w-2xl w-full max-h-[90vh] overflow-auto p-6" onClick={e=>e.stopPropagation()}><div className="flex justify-between items-center mb-5"><h2 className="font-display font-bold text-xl">Listing Preview</h2><button onClick={()=>setPreview(false)} className="font-semibold">Close</button></div><div className="grid sm:grid-cols-2 gap-4">{form.images.map((img,i)=><img key={i} src={img} alt="Preview" className="w-full h-40 object-cover rounded-md"/>)}</div><h3 className="font-display font-bold text-2xl mt-5">{form.brand} {form.model}</h3><p className="text-muted">{form.variant} · {form.year} · {form.city}, {form.state}</p><p className="font-bold text-xl mt-3">₹{Number(form.price||0).toLocaleString("en-IN")}</p><p className="text-sm mt-3">{form.description}</p></div></div>}
  </div>;
}
