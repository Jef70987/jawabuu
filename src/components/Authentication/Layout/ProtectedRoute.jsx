import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children}) =>{
    //authentication check
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

    if ( !isAuthenticated){
        localStorage.removeItem('isAuthenticated') 
        //redirect to login while remembering where they came from
        return < Navigate to="/Login/" replace />;
    }
    //
    return children;
}

export default ProtectedRoute;