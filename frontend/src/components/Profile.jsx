import NavBar from './NavBar.jsx';
import { useAuth } from '../context/AuthContext';
import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';

const Profile = () => {
    const { jwtData } = useAuth();
    const userProfile = useLoaderData();
    const [userData, setUserData] = useState();
    const [editProfileState, setEditProfileState] = useState();

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
        setEditProfileState('editMode')

    }

    // Todo...post request
    const finishEditProfile = () => {
        setEditProfileState(null)

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
                                    <p><span>Last Name</span><span>{userData ? userData.last_name : null}</span></p>
                                    <button onClick={editProfile}>Edit Profile</button>
                                </div>
                                :
                                <form className="profile-data" onSubmit={finishEditProfile}>
                                    <div class='flex-col'>
                                        <label>Profile Picture</label>
                                        <input name="" id="" value={userProfile.profile_picture_url} />
                                    </div>
                                    <div class='flex-col'>
                                        <label for='username'>User Name:</label>
                                        <input name='username' id="username" value={userData.username} />
                                    </div>
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