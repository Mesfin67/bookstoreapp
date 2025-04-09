import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { useSnackbar } from 'notistack';

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get('token');
      
      if (!token) {
        enqueueSnackbar("Verification token is missing", { variant: "error" });
        navigate('/signup');
        return;
      }

      try {
        const res = await axios.post(
          'http://localhost:5000/api/v1/auth/verify-email',
          { token }, // Send as an object
          {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true,
          }
        );

        enqueueSnackbar(res.data.message || "Email verified successfully!", { 
          variant: "success" 
        });
        navigate('/login');
      } catch (error) {
        const errorMessage = error.response?.data?.message || 
                           "Email verification failed";
        enqueueSnackbar(errorMessage, { variant: "error" });
        navigate('/login');
      }
    };

    verifyEmail();
  }, [searchParams, navigate, enqueueSnackbar]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Verifying your email...</h1>
        <p>Please wait while we verify your email address.</p>
      </div>
    </div>
  );
};

export default VerifyEmail;