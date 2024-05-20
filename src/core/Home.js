// import React, { useState } from 'react';
// import { Form, Button } from 'react-bootstrap';
// import Navbar from './Navbar';

// function PathForm() {
//   const [start, setStart] = useState('');
//   const [end, setEnd] = useState('');
//   const [algorithm, setAlgorithm] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const url = `/display?start=${start}&end=${end}&algorithm=${algorithm}`;
//     window.location.href = url; // Redirect to the new page
//   };

//   return (
//     <div>
// <Navbar/>
// <Form onSubmit={handleSubmit}>
//       <Form.Group controlId="start">
//         <Form.Label>Start Point</Form.Label>
//         <Form.Control
//           type="text"
//           placeholder="Enter start point"
//           value={start}
//           onChange={(e) => setStart(e.target.value)}
//         />
//       </Form.Group>

//       <Form.Group controlId="end">
//         <Form.Label>End Point</Form.Label>
//         <Form.Control
//           type="text"
//           placeholder="Enter end point"
//           value={end}
//           onChange={(e) => setEnd(e.target.value)}
//         />
//       </Form.Group>

//       <Form.Group controlId="algorithm">
//         <Form.Label>Algorithm</Form.Label>
//         <Form.Control
//           as="select"
//           value={algorithm}
//           onChange={(e) => setAlgorithm(e.target.value)}
//         >
//           <option value="">Select algorithm</option>
//           <option value="bellmanford">Bellman-Ford</option>
//           <option value="dijkstra">Dijkstra</option>
//           <option value="a*">A*</option>
//         </Form.Control>
//       </Form.Group>

//       <Button variant="primary" type="submit">
//         Submit
//       </Button>
//     </Form>
//     </div>
    
//   );
// }

// export default PathForm;





import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import Navbar from './Navbar';

function PathForm() {
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [algorithm, setAlgorithm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = `/display?start=${start}&end=${end}&algorithm=${algorithm}`;
    window.location.href = url; // Redirect to the new page
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="start">
            <Form.Label>Start Point</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter start point"
              value={start}
              onChange={(e) => setStart(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="end">
            <Form.Label>End Point</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter end point"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="algorithm">
            <Form.Label>Algorithm</Form.Label>
            <Form.Control
              as="select"
              value={algorithm}
              onChange={(e) => setAlgorithm(e.target.value)}
            >
              <option value="">Select algorithm</option>
              <option value="bellmanford">Bellman-Ford</option>
              <option value="dijkstra">Dijkstra</option>
              <option value="astar">A*</option>
            </Form.Control>
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default PathForm;
