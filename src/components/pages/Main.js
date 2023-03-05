import React from "react";
import aliceLogo from "./alice_ring_logo_black.png";
import shemause from "./alice_shema.png";

function Main(){
    return(
        <div className="main">
            <img src={aliceLogo} alt="alice_ring" className="main__logo" />
            
            <div className="intro">
                <h1>Introduction</h1>
                <p>
                Privacy is at the core of the blockchain ecosystem and at the center of the original ideals of the Cypherpunks.</p>
                <br></br><p> However, today with the growing number of applications, particularly within the Ethereum ecosystem with use cases increasingly connected to the rest of the world (apartment rental, tokenization of real-world assets, DID...), it is becoming increasingly difficult to detach one's on-chain identity from one's own identity.
                </p>
            </div>

            <div className="intro">
                <h2>Executive Summary</h2>
                <p>
                Alice's Ring is a solution that addresses the growing need for privacy and anonymity in the blockchain ecosystem by providing a means for individuals to prove solvency without revealing their wallet address or transaction history.<br></br>
                <br></br>This is achieved through the use of <b>cryptographic ring signature </b> technology and other cryptographic means to generate anonymous, verifiable, and valid solvency proofs at a specific point in time.<br></br>
                <br></br>The solution is designed for individuals who value their privacy and want to maintain anonymity while transacting on blockchain platforms, and it offers a unique value proposition by allowing users to prove solvency without compromising their privacy.
                </p>
            </div>
            

            <div className="intro">
                <h2>Use cases</h2>
                <div className="main__content__left">
                    <h3>🏠Renting :</h3>
                    <p>As described in the original MVP, solvency proofs can be used in the context of renting apartments or other properties.
                    <br></br>Landlords can require proof of solvency from tenants to ensure that they have the financial means to pay rent for a certain period of time.
                    <br></br>Solvency proofs can be generated without revealing the tenant's wallet address or transaction history, protecting their privacy.</p>
                    <a href="/renting" className="swap">Learn more</a>
                </div>
                <img src={shemause} alt="alice_schema" className="intro__image"/>
                <div className="main__content__left">
                    <h3>💰Loans :</h3>
                    <p>Solvency proofs can also be used in the context of loans, where lenders may require proof of the borrower's solvency before extending credit.
                    <br></br>By providing a solvency proof, borrowers can demonstrate their financial status without revealing their wallet address or transaction history to the lender.</p>
                    <a href="" className="swap">Learn more</a>
                </div>
                <div className="main__content__left">
                    <h3>📈Investments :</h3>
                    <p>Solvency proofs can be used in the context of investments, where investors may require proof of a company's or individual's solvency before investing in them.
                    <br></br>By providing a solvency proof, the company or individual can demonstrate their financial status without revealing their wallet address or transaction history to the investor.</p>
                    <a href="" className="swap">Learn more</a>
                </div>
                <div className="main__content__left">
                    <h3>📝Insurance :</h3>
                    <p>Solvency proofs can also be used in the context of insurance, where insurers may require proof of the policyholder's solvency before issuing a policy.
                    <br></br>By providing a solvency proof, the policyholder can demonstrate their financial status without revealing their wallet address or transaction history to the insurer.</p>
                    <a href="" className="swap">Learn more</a>
                </div>
                <div className="main__content__left">
                    <h3>🏛️Procurement :</h3>
                    <p>Solvency proofs can be used in the context of procurement, where government agencies or private companies may require proof of solvency from contractors before awarding contracts.
                    <br></br>By providing a solvency proof, contractors can demonstrate their financial status without revealing their wallet address or transaction history to the agency or company.</p>
                    <a href="" className="swap">Learn more</a>
                </div>
                <div className="main__content__left">
                    <h3>🏟️Real estate transactions :</h3>
                    <p>Solvency proofs can be used in the context of real estate transactions, where buyers or sellers may require proof of solvency before entering into a contract.
                    <br></br>By providing a solvency proof, the buyer or seller can demonstrate their financial status without revealing their wallet address or transaction history.</p>
                    <a href="" className="swap">Learn more</a>
                </div>
                <div className="main__content__left">
                    <h3>🎮Gaming :</h3>
                    <p>Solvency proofs can be used in the context of gaming and online gambling, where players may need to demonstrate their solvency in order to participate in certain games or tournaments.
                    <br></br> By providing a solvency proof, players can demonstrate that they have sufficient funds to participate without revealing their wallet address or transaction history.</p>
                    <a href="" className="swap">Learn more</a>
                </div>
                <div className="main__content__left">
                    <h3>❤️Charitable donations :</h3>
                    <p>Solvency proofs can be used in the context of charitable donations, where donors may want to ensure that their contributions are going to a financially stable organization.
                    <br></br>By providing a solvency proof, the organization can demonstrate its financial status without revealing its wallet address or transaction history.</p>
                    <a href="" className="swap">Learn more</a>
                </div>
                <div className="main__content__left">
                    <h3>💸Crowdfunding :</h3>
                    <p>Solvency proofs can be used in the context of crowdfunding campaigns, where organizers may need to demonstrate their solvency to potential backers.
                    <br></br>By providing a solvency proof, the organizer can demonstrate that they have the financial means to carry out the project without revealing their wallet address or transaction history.</p>
                    <a href="" className="swap">Learn more</a>
                </div>
                <div className="main__content__left">
                    <h3>⚙️Supply chain financing</h3>
                    <p>Solvency proofs can be used in the context of supply chain financing, where suppliers may need to demonstrate their solvency in order to secure financing.
                    <br></br>By providing a solvency proof, the supplier can demonstrate its financial status without revealing its wallet address or transaction history to the financing party.</p>
                    <a href="" className="swap">Learn more</a>
                </div>
                <div className="">
                    <p>These are just a few examples of the many potential use cases for solvency proofs.
                    <br></br>Any situation where a party needs to demonstrate their financial status without revealing their wallet address or transaction history on the blockchain could benefit from the use of solvency proofs.</p>
                </div>

            </div>
        </div>

    )
}
export default Main; 