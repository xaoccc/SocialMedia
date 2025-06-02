export const userData = async () => {
    const authData = JSON.parse(localStorage.getItem('jwtData'));    
    const accessToken = authData?.access;

    try {
        const response = await fetch('http://localhost:8000/api/v1/auth/profile/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
        });

        const userData = await response.json();
        // Debug
        // console.log(userData);

        if (!response.ok) {
            throw new Error(userData.error || 'Failed to fetch user profile data');
        }
        return userData;

    } catch (err) {
        console.error(err);
        throw new Response('Bad request', { status: 400 });
    }

};