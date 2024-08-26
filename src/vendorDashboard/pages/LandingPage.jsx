
import React,{useState,useEffect} from 'react'
import NavBar from '../components/NavBar'
import SideBar from '../components/SideBar'
import Register from '../components/forms/Register'
import Login from '../components/forms/Login'
import AddFirm from '../components/forms/AddFirm'
import AddProduct from '../components/forms/AddProduct'
import Welcome from '../components/Welcome'
import AllProducts from '../components/AllProducts'

const LandingPage = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showFirm, setShowFirm] = useState(false);
  const [showProduct, setShowProduct] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const [showFirmTitle, setShowFirmTitle] = useState(true);

  useEffect(()=>{
    const loginToken=localStorage.getItem("loginToken");
    if (loginToken){
        setShowLogout(true);
    }
  })

  useEffect(()=>{
    const firmName=localStorage.getItem("firmName");
    if (firmName){
        setShowFirmTitle(false);
    }
  },[])

  const showLoginHandler = () => {
    setShowLogin(true);
    setShowRegister(false);
    setShowFirm(false);
    setShowProduct(false);
    setShowWelcome(false);
    setShowAllProducts(false);
  }
  const showRegisterHandler = () => {
    setShowRegister(true);
    setShowLogin(false);
    setShowFirm(false);
    setShowProduct(false);
    setShowWelcome(false);
    setShowAllProducts(false);
  }
  const showFirmHandler=()=>{
    if (showLogout){
        setShowFirm(true);
        setShowLogin(false);
        setShowRegister(false);
        setShowProduct(false);
        setShowWelcome(false);
        setShowAllProducts(false);
    }else{
        alert("please login first");
        setShowLogin(true);
    }
  }
  const showProductHandler=()=>{
    if(showLogout){
        setShowProduct(true);
        setShowFirm(false);
        setShowLogin(false);
        setShowRegister(false);
        setShowWelcome(false);
        setShowAllProducts(false);
    }else{
        alert("please login first");
        setShowLogin(true);
    }
  }
  const showWelcomeHandler=()=>{
    setShowWelcome(true);
    setShowProduct(false);
    setShowFirm(false);
    setShowLogin(false);
    setShowRegister(false);
    setShowAllProducts(false);
  }

  const showAllProductsHandler=()=>{
    if(showLogout){
        setShowAllProducts(true);
        setShowWelcome(false);
        setShowProduct(false);
        setShowFirm(false);
        setShowLogin(false);
        setShowRegister(false);
    }else{
        alert("please login first");
        setShowLogin(true);
    }
    
  }

  const logoutHandler=()=>{
    confirm("Are you sure to Logout?");
    localStorage.removeItem("loginToken");
    localStorage.removeItem("firmId");
    localStorage.removeItem("vendorFirmId");
    localStorage.removeItem("firmName");
    setShowLogout(false);
    setShowFirmTitle(true);
  }
  
  return (
    <div>
        <section className="landingsection">
            <NavBar showLoginHandler={showLoginHandler} showRegisterHandler={showRegisterHandler} showLogout={showLogout} logoutHandler={logoutHandler}/>
            <div className="collectionSection">
                <SideBar showFirmHandler={showFirmHandler} showProductHandler={showProductHandler} showAllProductsHandler={showAllProductsHandler} showFirmTitle={showFirmTitle}/>
                {showLogin && <Login showWelcomeHandler={showWelcomeHandler}/>}
                {showRegister && <Register showLoginHandler={showLoginHandler}/>}
                {showFirm && showLogout && <AddFirm/>}
                {showProduct && showLogout && <AddProduct/>}
                {showWelcome && <Welcome/>}
                {showAllProducts && showLogout && <AllProducts/>}
                {/**/}
            </div>
            
        </section>
    </div>
  )
}

export default LandingPage