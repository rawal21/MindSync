// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const WellnessRoutines = () => {
//   const [routines, setRoutines] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     // Fetch routines from the backend
//     const fetchRoutines = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get('http://localhost:3000/api/routine', {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('authToken')}`, // Assuming JWT token is stored in localStorage
//           },
//         });
//         setRoutines(response.data.routines);
//         setLoading(false);
//       } catch (err) {
//         setError('Error fetching routines');
//         setLoading(false);
//       }
//     };

//     fetchRoutines();
//   }, []);

//   const handleStartRoutine = async (id) => {
//     try {
//       // Update the status of a routine to "In Progress"
//       const response = await axios.patch(
//         `/wellness/routine/${id}/status`,
//         { status: 'In Progress' },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`,
//           },
//         }
//       );
//       // Update the local state with the updated routine
//       setRoutines((prevRoutines) =>
//         prevRoutines.map((routine) =>
//           routine._id === id ? response.data.routine : routine
//         )
//       );
//     } catch (err) {
//       setError('Error updating routine status');
//     }
//   };

//   if (loading) {
//     return <p>Loading routines...</p>;
//   }

//   if (error) {
//     return <p>{error}</p>;
//   }

//   return (
//     <div className="card">
//       <div className="card-body">
//         <h5 className="card-title">Wellness Routines</h5>
//         <ul className="list-group">
//           {routines.map((routine) => (
//             <li key={routine._id} className="list-group-item d-flex justify-content-between align-items-center">
//               <div>
//                 <h6 className="mb-0">{routine.recommendations || routine.routineType}</h6>
//                 <small className="text-muted">{routine.recommendation.duration || 'Duration not specified'}</small>
//               </div>
//               <button
//                 className="btn btn-sm btn-outline-primary"
//                 onClick={() => handleStartRoutine(routine._id)}
//               >
//                 Start
//               </button>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default WellnessRoutines;



import React, { useEffect, useState } from 'react';
import axios from 'axios';

const WellnessRoutines = () => {
  const [routines, setRoutines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch routines from the backend
    const fetchRoutines = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:3000/api/routine', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        });
        setRoutines(response.data.routines);
        setLoading(false);
      } catch (err) {
        setError('Error fetching routines');
        setLoading(false);
      }
    };

    fetchRoutines();
  }, []);

  const handleStartRoutine = async (id) => {
    try {
      const response = await axios.patch(
        `http://localhost:3000/api/routine/${id}/status`,
        { status: 'In Progress' },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        }
      );

      setRoutines((prevRoutines) =>
        prevRoutines.map((routine) =>
          routine._id === id ? response.data.routine : routine
        )
      );
    } catch (err) {
      setError('Error updating routine status');
    }
  };

  if (loading) {
    return <p>Loading routines...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Wellness Routines</h5>
        <ul className="list-group">
          {routines.map((routine) => (
            <li
              key={routine._id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <h6 className="mb-0">
                  {routine.recommendations.map((rec) => rec.name).join(', ')}
                </h6>
                <small className="text-muted">
                  {routine.recommendations.map((rec) => rec.duration).join(', ')}
                </small>
              </div>
              <button
                className="btn btn-sm btn-outline-primary"
                onClick={() => handleStartRoutine(routine._id)}
              >
                Start
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WellnessRoutines;


