import React, { Suspense } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../common/MainLayout/LayOut";



function Dashboard() {  
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
