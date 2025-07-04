export const userData = async () => {
    const waitForJwtData = async (timeout = 2000) => {
        const interval = 100;
        const maxAttempts = timeout / interval;
        let attempts = 0;

        return new Promise((resolve, reject) => {
            const check = () => {
                const data = localStorage.getItem('jwtData');
                if (data) return resolve(JSON.parse(data));
                if (++attempts > maxAttempts) return reject(new Error('jwtData not available in time'));
                setTimeout(check, interval);
            };
            check();
        });
    };


    try {
        const authData = await waitForJwtData();
        const accessToken = authData?.access;
        const response = await fetch('http://localhost:8000/api/v1/auth/profile/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
        });

        const userData = await response.json();


        if (!response.ok) {
            throw new Error(userData.error || 'Failed to fetch user profile data');
        }
        return userData;

    } catch (err) {
        console.error(err);
        throw new Response('Bad request', { status: 400 });
    }

};