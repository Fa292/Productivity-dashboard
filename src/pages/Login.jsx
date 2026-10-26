import { AuthContext } from "../context/Authcontext.jsx"
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button.jsx";
import Card from "../components/Card.jsx";
import { Icons } from "../components/Icons";
function Login(){
    const {login} = useContext(AuthContext);
    const navigate = useNavigate();
    const handleLogin = () =>{
        login();
        navigate("/");
    }
    return(
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-950 transition duration-300">
            <Card className="w-96 h-96 flex flex-col items-center justify-center  gap-4">
                <h1 className="dark:text-white">Helix</h1>
                <Button variant="primary">Get started</Button>
                <Button variant="secondary" onClick={handleLogin}>Login</Button>
            </Card>
        </div>
    );
}
export default Login;