
import React,{useState} from 'react'
import { API_URL} from '../../data/apiPath';

const AddFirm = () => {
  const [firmName,setFirmName] = useState("");
  const [area,setArea] = useState("");
  const [category,setCategory] = useState([]);
  const [region,setRegion] = useState([]);
  const [offer,setOffer] = useState("");
  const [file,setFile] = useState(null);

  const handleCategoryChange = (event)=> {
    const value=event.target.value;
    if(category.includes(value)){
        setCategory(category.filter((item) => item!==value));
    }
    else{
        setCategory([...category, value]);
    }
  }

  const handleRegionChange = (event)=> {
    const value=event.target.value;
    if(region.includes(value)){
        setRegion(region.filter((item) => item!==value));
    }
    else{
        setRegion([...region, value]);
    }
  }

  const handleImageUpload = (event) =>{
    const selectedImage=event.target.files[0];
    setFile(selectedImage);
  }
  

  const handleFirmSubmit = async (e) => {
    e.preventDefault();
    try {
        const loginToken = localStorage.getItem("loginToken");
        if (!loginToken) {
            console.error("user not authenticated");
            return;
        }

        const formData = new FormData();
        formData.append("firmName", firmName);
        formData.append("area", area);
        formData.append("offer", offer);
        formData.append("image", file);
        category.forEach((value) => {
            formData.append("category", value);
        });
        region.forEach((value) => {
            formData.append("region", value);
        });

        const response = await fetch(`${API_URL}/firm/add-firm`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${loginToken}`,
            },
            body: formData
        });

        const data = await response.json();
        if (response.status === 200) {
            console.log(data);
            alert("Firm added successfully");
            setFirmName("");
            setArea("");
            setOffer("");
            setFile(null);
            setCategory([]);
            setRegion([]);
            localStorage.setItem("firmId", data.firmId);
        } else if (response.status === 400 && data.message === "vendor can only have one firm") {
            alert("Firm exists! Only one firm can be added.");
        } else {
            alert("Failed to add firm");
        }
    } catch (error) {
        console.error("failed to add firm", error);
    }
};
  return (
    <div className="firmSection">
        <form className="tableForm" onSubmit={handleFirmSubmit}>
            <h3>Add Firm</h3>
            <label>Firm Name</label>
            <input name="firmName" value={firmName} onChange={(e)=>setFirmName(e.target.value)} type="text"/>
            <label>Area</label>
            <input name="area" value={area} onChange={(e)=>setArea(e.target.value)} type="text"/>
            <div className="checkInp">
                <label>Category</label>
                <div className="inputsContainer">
                    <div className="checkboxContainer">
                        <label>veg</label>
                        <input type="checkbox" checked={category.includes("veg")} value="veg" onChange={handleCategoryChange}/>
                    </div>

                    <div className="checkboxContainer">
                        <label>non-veg</label>
                        <input type="checkbox" checked={category.includes("non-veg")} value="non-veg" onChange={handleCategoryChange}/>
                    </div>
                </div>
            </div>
            <label>Offer</label>
            <input  name="offer" value={offer} onChange={(e)=>setOffer(e.target.value)} type="text"/>
            <div className="checkInp">
                <label>Region</label>
                <div className="inputContainer">
                    <div className="fields">
                        <div className="checkboxContainers">
                            <label>South-Indian</label>
                            <input type="checkbox" value="South-Indian" checked={region.includes("South-Indian")} onChange={handleRegionChange}/>
                        </div>

                        <div className="checkboxContainers">
                            <label>North-Indian</label>
                            <input type="checkbox" value="North-Indian" checked={region.includes("North-Indian")} onChange={handleRegionChange}/>
                        </div>
                    </div>

                    <div className="fields">
                        <div className="checkboxContainers">
                            <label>Chineese</label>
                            <input type="checkbox" value="Chineese" checked={region.includes("Chineese")} onChange={handleRegionChange}/>
                        </div>

                        <div className="checkboxContainers">
                            <label>Bakery</label>
                            <input type="checkbox" value="Bakery" checked={region.includes("Bakery")} onChange={handleRegionChange}/>
                        </div>
                    </div>
                </div>
            </div>
            
            <label>Firm Image</label>
            <input type="file" onChange={handleImageUpload}/><br/>
            <div className="btnSubmit">
                <button type="submit">Submit</button>
            </div>
        </form>
    </div>
  )
}

export default AddFirm;
