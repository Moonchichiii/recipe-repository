import React, { Suspense, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../Layout/Layout";




function Dashboard() {  
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  

  return (  

      <Layout>
      <h1>Dashboard</h1>
      <Suspense fallback={<div>Loading...</div>}>
        {show && <PostModal show={show} onHide={() => setShow(false)} />}
      </Suspense>
      </Layout>
    
  );
  }

export default Dashboard;
