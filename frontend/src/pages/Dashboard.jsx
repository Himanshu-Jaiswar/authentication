import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import api from '../apiIntercepter';

function Dashboard() {
  const [content, setContent] = useState("");

  async function fetchAdminDetails() {
    try {
      const {data} = await api.get(`/api/v1/admin`, {withCredentials: true});

      setContent(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  useEffect(() => {
    fetchAdminDetails();
  }, []);
  
  return (
    <div>
      {content && <div>{content}</div>}
    </div>
  )
}

export default Dashboard
