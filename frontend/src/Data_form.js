import React from "react";

const Data_form = () => {

    const handleChange = (event) => {

    }
  
    const handleSubmit = (event) => {
    }

    return (
    <div className="Data_form_container">
            <form className="Data_form" onSubmit={handleSubmit}>
            <label>Required Man:</label>
            <input type="text" name="men" onChange={handleChange} />
            <label>Cement:</label>
            <input type="text" name="cement" onChange={handleChange} />
            <div className="submit_button">
                <p type="submit">Submit</p>
                </div>
        </form>
            </div>
    );
    };


export default Data_form;

