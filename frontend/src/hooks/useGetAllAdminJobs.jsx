import { setAllAdminJobs } from '@/redux/jobSlice' //action from Redux slice that stores jobs in Redux state.
import { JOB_API_END_POINT } from '@/utils/constant' //handles job-related things
import axios from 'axios' //used to make http requests to the server
import { useEffect } from 'react' //code will run when the component mounts/loads
import { useDispatch } from 'react-redux' // dispatch actions to Redux.

//this will automatially fetch all admin jobs when the page loads and store that job data in redux store.
const useGetAllAdminJobs = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
        //fetch all admin jobs from the server.
        //this function will be called when the component mounts/loads.
        const fetchAllAdminJobs = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/getadminjobs`,{withCredentials:true});
                // request - res.data.success is true, 
                // the fetched jobs (res.data.jobs) are sent to Redux using the action setAllAdminJobs
                if(res.data.success){
                    dispatch(setAllAdminJobs(res.data.jobs));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllAdminJobs();
    },[] // mpty means it only runs once when the component loads.
    )
}

export default useGetAllAdminJobs