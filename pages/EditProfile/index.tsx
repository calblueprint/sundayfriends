import React from 'react';
import Layout from "../../components/Layout/Layout"

const EditProfilePage: React.FunctionComponent = () => {
    return (
        <Layout title = 'EditProfile'>
            <div>
                I will fill this in for edit profile but don't know if i should handle editing on 
                same profile page but just change the state, or push to another page editprofile that is 
                a duplicate of profile, but is able to edit. ok i am going to sleep now 
            </div>
        </Layout>   
    );
}

export default EditProfilePage;