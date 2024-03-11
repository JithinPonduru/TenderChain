import './input.css';

function generateTenderId() {
    const timestamp = Date.now().toString().slice(-5); // Use last 5 digits of timestamp
    const random = Math.floor(Math.random() * 100000); // Generate a random 5-digit number
    return parseInt(timestamp + random.toString().padStart(5, '0')); // Combine and ensure 10 digits
}



function BodyofTenderPage({ contract }) {



    const handleInput = (e) => {
        const input = e.target;
        input.value = input.value.replace(/\D/g, ''); // Remove non-numeric characters
    };

    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1; // Month is zero-based, so add 1
    const year = currentDate.getFullYear();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();


    const deployContract = async (e) => {
        e.preventDefault();
        try {
            const tenderid = generateTenderId();
            const dateTimeString = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
            const title = document.querySelector("#Title").value;
            const details = document.querySelector("#Details").value;
            const startDate = new Date(`${document.querySelector('#startYYYY').value}-${document.querySelector('#startMM').value}-${document.querySelector('#startDD').value}`);
            const lastDate = new Date(`${document.querySelector('#LastYYYY').value}-${document.querySelector('#LastMM').value}-${document.querySelector('#LastDD').value}`);
            const bidOpeningDate = new Date(`${document.querySelector("#BiddingYYYY").value}-${document.querySelector("#BiddingMM").value}-${document.querySelector("#BiddingDD").value}`);
            const organisationName = document.querySelector("#OrganisationName").value;

            const status = startDate <= currentDate && lastDate >= currentDate ? "Active" : "Inactive";

            // Deploy contract
            const transaction = await contract.deployContract(
                tenderid.toString(),
                title.toString(),
                status.toString(),
                details.toString(),
                dateTimeString.toString(),
                startDate.toString(),
                lastDate.toString(),
                bidOpeningDate.toString(),
                organisationName.toString(),
            );
            await transaction.wait();

        } catch (error) {
            console.error(error);
            document.querySelector("#result").innerHTML = `<h3>Error: ${error.message}</h3>`;
        }
    };


    return (
        <div className='tenderinput'>
            <div className="container" style={{ backgroundColor: '#e5e5e5', padding: '1.5rem', borderRadius: '10px' }}>
                <form onSubmit={deployContract} action='/temp'>
                    <div className="row">
                        <h4>Account</h4>
                        <div className="input-group input-group-icon">
                            <input id='Title' type="text" placeholder="Title of the Project" style={{ borderRadius: '10px' }} required
                                autoComplete='off' />
                            <div className="input-icon">
                                <i className="fa fa-user" style={{ marginLeft: '15px' }} ></i>
                            </div>
                        </div>
                        <h4>Discription</h4>
                        <div className="input-group input-group-icon">
                            <input id='Details' type="text" placeholder="Discription of the Project" style={{ borderRadius: '10px' }} required
                                autoComplete='off' />
                            <div className="input-icon">
                                <i className="fa-solid fa-info" style={{ marginLeft: '15px' }}></i>
                            </div>
                        </div>
                        <div className="col-half">
                            <h4>Start Date</h4>
                            <div className="input-group">
                                <div className="col-third">
                                    <input
                                        id='startDD'
                                        type="text"
                                        placeholder="DD"
                                        style={{ marginRight: '10px' }}
                                        maxLength="2"
                                        onInput={handleInput}
                                        required
                                        autoComplete='off'
                                    />
                                </div>
                                <div className="col-third">
                                    <input
                                        id='startMM'
                                        type="text"
                                        placeholder="MM"
                                        style={{ marginRight: '10px' }}
                                        maxLength="2"
                                        onInput={handleInput}
                                        required
                                        autoComplete='off'
                                    />
                                </div>
                                <div className="col-third">
                                    <input
                                        id='startYYYY'
                                        type="text"
                                        placeholder="YYYY"
                                        maxLength="4"
                                        onInput={handleInput}
                                        required
                                        autoComplete='off'
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-half">
                            <h4>Last Date</h4>
                            <div className="input-group">
                                <div className="col-third">
                                    <input
                                        id='LastDD'
                                        type="text"
                                        placeholder="DD"
                                        style={{ marginRight: '10px' }}
                                        maxLength="2"
                                        onInput={handleInput}
                                        required
                                        autoComplete='off'
                                    />
                                </div>
                                <div className="col-third">
                                    <input
                                        id='LastMM'
                                        type="text"
                                        placeholder="MM"
                                        style={{ marginRight: '10px' }}
                                        maxLength="2"
                                        onInput={handleInput}
                                        required
                                        autoComplete='off'
                                    />
                                </div>
                                <div className="col-third">
                                    <input
                                        id='LastYYYY'
                                        type="text"
                                        placeholder="YYYY"
                                        maxLength="4"
                                        onInput={handleInput}
                                        required
                                        autoComplete='off'
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-half">
                            <h4>Bidding Date</h4>
                            <div className="input-group">
                                <div className="col-third">
                                    <input
                                        id='BiddingDD'
                                        type="text"
                                        placeholder="DD"
                                        style={{ marginRight: '10px' }}
                                        maxLength="2"
                                        onInput={handleInput}
                                        required
                                        autoComplete='off'
                                    />
                                </div>
                                <div className="col-third">
                                    <input
                                        id='BiddingMM'
                                        type="text"
                                        placeholder="MM"
                                        style={{ marginRight: '10px' }}
                                        maxLength="2"
                                        onInput={handleInput}
                                        required
                                        autoComplete='off'
                                    />
                                </div>
                                <div className="col-third">
                                    <input
                                        id='BiddingYYYY'
                                        type="text"
                                        placeholder="YYYY"
                                        maxLength="4"
                                        onInput={handleInput}
                                        required
                                        autoComplete='off'
                                    />
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="row">

                        <div className="col-half">
                            <h4>Organisation Name</h4>
                            <div className="input-group">
                                <input id="OrganisationName" type="text" placeholder="Organisation Name" required
                                    autoComplete='off' />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <h4>Terms and Conditions</h4>
                        <div className="input-group">
                            <input type='checkbox' id='terms' required
                                autoComplete='off' style={{ marginRight: '1%' }} />
                            <label htmlFor="terms">I acknowledge that I have read the privacy policy and that I agree to the terms and conditions set out by Organization Name for this service.</label>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-warning">Deploy Contract</button>
                    <div id="result"></div>
                </form>

            </div >
        </div >
    );
}

export default BodyofTenderPage;
