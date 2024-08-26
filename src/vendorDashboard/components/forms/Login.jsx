


import React, { useState } from 'react';
import { API_URL } from '../../data/apiPath';

const Login = ({ showWelcomeHandler }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_URL}/vendor/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();
            if (response.ok) {
                console.log(data);
                setEmail("");
                setPassword("");
                alert("Login successful");
                localStorage.setItem("loginToken", data.token);
                showWelcomeHandler();
            } else {
                console.log("Login failed", data);
                alert("Login failed");
                return;
            }

            const vendorId = data.vendorId;
            console.log("Checking for vendor ID: ", vendorId);

            // Correct URL to fetch vendor details
            const vendorResponse = await fetch(`${API_URL}/vendor/single-vendor/${vendorId}`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("loginToken")}`
                }
            });

            const vendorData = await vendorResponse.json();
            if (vendorResponse.ok) {
                const vendorFirmId = vendorData.vendorFirmId;
                console.log(vendorData);
                console.log("My firm name is: ", vendorData.firmName);
                console.log("Checking for vendor firm ID", vendorFirmId);

                localStorage.setItem("vendorFirmId", vendorFirmId);
                localStorage.setItem("firmName", vendorData.firmName);

                window.location.reload();
            } else {
                console.log("Failed to fetch vendor data", vendorData);
                alert("Failed to fetch vendor data");
            }
        } catch (error) {
            console.log("Login failed", error);
            alert("Login failed");
        }
    };

    return (
        <div className="loginSection">
            <form className="authForm" onSubmit={handleSubmit}>
                <h3>Vendor Login</h3>
                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                /><br />
                <label>Password</label>
                <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                /><br />
                <div className="btnSubmit">
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default Login;






























