import React, { Component } from 'react';
import { Avatar } from "@material-ui/core";
import ImageUploader from 'react-images-upload';



class CreateProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            about: "",
            gender: "",
            phone: "",
            DOB: "",
            career: "",
            city: "",
            image: "",
            pictures: []
        }
        this.onDrop = this.onDrop.bind(this)
    }

    onDrop = picture => {
        this.setState({
            pictures: this.state.pictures.concat(picture),
        }, () => {
            console.log(this.state.pictures)
        })
    }


    render() {
        return (
            <div>
                <form>
                    <ImageUploader
                        withIcon={true}
                        buttonText='Choose Images'
                        onChange={this.onDrop}
                        imgExtension={['.jpg', '.gif', '.png', '.gif']}
                        maxFileSize={5242880}
                    />
                </form>
            </div>
        );
    }
}

export default CreateProfile;
