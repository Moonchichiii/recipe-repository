import React, { Suspense, useState } from "react";
import { useNavigate } from "react-router-dom";





function Dashboard() {  
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  

  return (  

      <div>
      <h1>Dashboard</h1>
      <Suspense fallback={<div>Loading...</div>}>
        {show && <PostModal show={show} onHide={() => setShow(false)} />}
      </Suspense>
      
      </div>
  );
  }

export default Dashboard;
