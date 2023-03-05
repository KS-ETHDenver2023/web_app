import React from "react";
import shemause from "../alice_shema.png";

function Renting(){
    return(
        <div className="main">
            <h1>🏠Renting</h1>
            <div className="main__content__left">
                    <p>As described in the original MVP, solvency proofs can be used in the context of renting apartments or other properties.
                    <br></br>Landlords can require proof of solvency from tenants to ensure that they have the financial means to pay rent for a certain period of time.
                    <br></br>Solvency proofs can be generated without revealing the tenant's wallet address or transaction history, protecting their privacy.</p>
                </div>
                <img src={shemause} alt="alice_schema" className="intro__image"/>
        </div>
    )
}
export default Renting; 