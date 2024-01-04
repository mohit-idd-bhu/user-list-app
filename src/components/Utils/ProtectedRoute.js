const ProtectedRoute = ({ isLoggedIn, children }) => {
    if (!isLoggedIn) {
        return;
    }
    return children;
};
export default ProtectedRoute;