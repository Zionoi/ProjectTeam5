import axios from 'axios';


function WalkingCourse({hostId}) {



    axios.get(url, {
        headers: {
            'Authorization': `Bearer ${apiKey}`
        }
    })
    .then(response => {
        console.log('Data:', response.data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
    return (
        <div>

        </div>
        
    );
}

export default WalkingCourse;
