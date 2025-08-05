import NavBar from './NavBar.jsx';
import { useAuth } from '../context/AuthContext';
import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import ErrorMsg from './Errormsg.jsx';

const Profile = () => {
    const { jwtData } = useAuth();
    const [userProfile, setUserProfile] = useState(useLoaderData());
    const [userData, setUserData] = useState();
    const [editProfileState, setEditProfileState] = useState();
    const [validateFormFields, setValidateFormFields] = useState({
        profilePictureURL: true, 
        username: true,
        firstName: true,
        lastName: true
    });

    useEffect(() => {
    }, [jwtData]);

    useEffect(() => {
    }, [userProfile]);

    // We put the API call into the hook, so that we call it just once on page render, otherwise there will be an infinite loop
    useEffect(() => {
        const getUserData = async () => {
            // e.preventDefault();

            try {
                const response = await fetch('http://localhost:8000/api/v1/auth/user/', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${jwtData.access}`,
                    }
                })
                if (!response.ok) {
                    const errorData = await response.json();
                    console.error('Error:', errorData);
                    return;
                }
                const data = await response.json();
                setUserData(data);

            } catch (error) {
                console.error(error);
            }

        }
        getUserData();


    }, []);


    const editProfile = () => {
        setEditProfileState('editMode');
    }

    const finishEditProfile = async (userData, userProfile) => {

        try {
            const response = await fetch('http://localhost:8000/api/v1/auth/user/edit/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwtData.access}`,
                },
                body: JSON.stringify({
                    profile_picture_url: userProfile.profile_picture_url,
                    username: userData.username,
                    first_name: userData.first_name,
                    last_name: userData.last_name,
                })


            })

            const data = await response.json();            
            console.log(data);


            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error:', errorData);
                return;
            }

            
            setEditProfileState(null);
        } catch (error) {
            console.error(error);
        }      
    }

    return (
        <>
            <section className="container">
                <NavBar />
                {jwtData ? (
                    <div className="contact">
                        <h1>Profile</h1>
                        {
                            (!editProfileState) ?
                                <div className="profile-data">
                                    <img src={userProfile.profile_picture_url} alt='profile picture' />                                    
                                    <p><span>User Name:</span><span>{userData ? userData.username : null}</span></p>
                                    <p><span>Email Address:</span><span>{userData ? userData.email : null}</span></p>
                                    <p><span>First Name:</span><span>{userData ? userData.first_name : null}</span></p>
                                    <p><span>Last Name:</span><span>{userData ? userData.last_name : null}</span></p>
                                    <button onClick={editProfile}>Edit Profile</button>
                                </div>
                                :
                                <form className="profile-data" onSubmit={(e) => {e.preventDefault(); finishEditProfile(userData, userProfile)}}>
                                    <div className='flex-col'>
                                        <label htmlFor='profile_pic'>Profile Picture</label>
                                        <input 
                                            name='profile_pic' 
                                            id="profile_pic" 
                                            value={userProfile.profile_picture_url} 
                                            onChange={(e) => {
                                                setUserProfile({...userProfile, profile_picture_url: e.target.value});                                                
                                                setValidateFormFields(prev => ({...prev, profilePictureURL: false}));
                                               }}
                                            
                                        />
                                    </div>
                                    <ErrorMsg fieldName={'email'} fieldValue={(userProfile) ? userProfile.profile_picture_url : null } validateInput={validateFormFields.profilePictureURL}></ErrorMsg>
                                    
                                    <div className='flex-col'>
                                        <label htmlFor='username'>User Name:</label>
                                        <input 
                                            name='username' 
                                            id="username" 
                                            value={userData.username}
                                            onChange={(e) => setUserData({...userData, username: e.target.value})}
                                        />
                                    </div>
                                    <div className='flex-col'>
                                        <label htmlFor='first_name'>First Name:</label>
                                        <input 
                                            name='first_name' 
                                            id="first_name" 
                                            value={userData.first_name}
                                            onChange={(e) => {
                                                setUserData({...userData, first_name: e.target.value});
                                                setValidateFormFields(prev => ({...prev, firstName: false}));
                                            }}
                                        />
                                    </div>
                                    <ErrorMsg fieldName={'name'} fieldValue={(userData) ? userData.first_name : null } validateInput={validateFormFields.firstName}></ErrorMsg>

                                    <div className='flex-col'>
                                        <label htmlFor='last_name'>Last Name:</label>
                                        <input 
                                            name='last_name' 
                                            id="last_name" 
                                            value={userData.last_name} 
                                            onChange={(e) => {
                                                setUserData({...userData, last_name: e.target.value});
                                                setValidateFormFields(prev => ({...prev, lastName: false}));
                                            }}
                                        />
                                    </div>
                                    <ErrorMsg fieldName={'name'} fieldValue={(userData) ? userData.last_name : null } validateInput={validateFormFields.lastName}></ErrorMsg>

                                    <button type='submit'>Submit</button>
                                </form>
                        }

                    </div>
                ) : (
                    <p>You are not logged in</p>
                )}
            </section>
        </>
    )
};

export default Profile;