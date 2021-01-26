import React from 'react';

const SignUpForm = () => {
    return (
        <div>
            <form className="signup_form px-3 py-1">
                <h4>Sign Up</h4>
                <div className="row py-1">
                    <div className="col-md-6">
                        <label>Enter your Username</label>
                        <input className="form-control" type="text" name="username" placeholder="Enter your username" />
                    </div>
                    <div className="col-md-6">
                        <label>Enter your Firstname</label>
                        <input className="form-control" type="text" name="firstname" placeholder="Enter your firstname" />
                    </div>
                </div>
                <div className="row py-1">
                    <div className="col-md-6">
                        <label>Enter your lastname</label>
                        <input className="form-control" type="text" name="lastname" placeholder="Enter your lastname" />
                    </div>
                    <div className="col-md-6">
                        <label>Enter your email</label>
                        <input className="form-control" type="email" name="email" placeholder="Enter your email" />
                    </div>
                </div>
                <div className="row py-1">
                    <div className="col-md-12">
                        <label>Enter your password</label>
                        <input className="form-control" type="password" name="password" placeholder="Enter password" />
                    </div>
                </div>
                <div className="row py-1">
                    <div className="col-md-12">
                        <label>Confirm password</label>
                        <input className="form-control" type="password" name="password2" placeholder="Confirm password" />
                    </div>
                </div>
                <button className="btn btn-info btn-sm my-2">Sign Up</button>
            </form>
        </div>
    );
}

export default SignUpForm;
