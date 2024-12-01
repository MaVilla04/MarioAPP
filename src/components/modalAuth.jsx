import React, { useState } from 'react';
import axios from 'axios';

const ModalAuth = ({ isOpen, onClose }) => {
    const [activeTab, setActiveTab] = useState('login');
    const [loginData, setLoginData] = useState({ username: '', password: '' });
    const [signupData, setSignupData] = useState({ username: '', password: '' });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [signupSuccess, setSignupSuccess] = useState(false); // Estado para el éxito del registro

    // Estados para mostrar/ocultar la contraseña
    const [showLoginPassword, setShowLoginPassword] = useState(false);
    const [showSignupPassword, setShowSignupPassword] = useState(false);
    const apiUrl = process.env.API_HOST;


    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };


    const handleClose = () => {
        onClose();
    };


    const handleInputChange = (e, type) => {
        const { name, value } = e.target;
        if (type === 'login') {
            setLoginData(prevState => ({
                ...prevState,
                [name]: value
            }));
        } else {
            setSignupData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    // Validación de Login
    const validateLogin = () => {
        const { username, password } = loginData;
        let formErrors = {};

        if (!username) {
            formErrors.username = "El nombre de usuario es requerido";
        }
        if (!password) {
            formErrors.password = "La contraseña es requerida";
        }

        return formErrors;
    };

    // Validación de Sign Up
    const validateSignup = () => {
        const { username, password } = signupData;
        let formErrors = {};

        if (!username) {
            formErrors.username = "El nombre de usuario es requerido";
        }
        if (!password) {
            formErrors.password = "La contraseña es requerida";
        }

        return formErrors;
    };

    // Maneja el envío del formulario de Login
    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        const formErrors = validateLogin();
        if (Object.keys(formErrors).length === 0) {
            setLoading(true);  // Comienza la carga
            setErrors({});     // Limpia errores previos
    
            try {
                const response = await axios.post(`${apiUrl}/marioTransformations/login/`, {
                    name: loginData.username,
                    password: loginData.password,
                });
    
                // Si la respuesta es exitosa
                if (response.status === 200) {
                    setLoginSuccess(true);
                    console.log("Login exitoso:", response.data);
    
        
                    const token = response.data.token;  
                    if (token) {
                        localStorage.setItem('authToken', token); 
                    }
    
                    onClose();
                }
            } catch (error) {
                setLoginSuccess(false);
                if (error.response) {
                    setErrors({
                        apiError: "Credenciales inválidas. Por favor, intente de nuevo.",
                    });
                } else {
                    setErrors({
                        apiError: "Ocurrió un error al intentar iniciar sesión.",
                    });
                }
            } finally {
                setLoading(false);  // Termina la carga
            }
        } else {
            setErrors(formErrors);
        }
    };

    // Maneja el envío del formulario de Sign Up
    const handleSignupSubmit = async (e) => {
        e.preventDefault();
        const formErrors = validateSignup();
        if (Object.keys(formErrors).length === 0) {
            setLoading(true);  // Comienza la carga
            setErrors({});     // Limpia errores previos

            try {
                const response = await axios.post(`${apiUrl}/marioTransformations/newUser/`, {
                    name: signupData.username,
                    password: signupData.password,
                });

                // Si la respuesta es exitosa
                if (response.status === 200) {
                    setSignupSuccess(true);
                    console.log("Registro exitoso:", response.data);
                    onClose();
                }
            } catch (error) {
                setSignupSuccess(false);
                if (error.response) {
                    setErrors({
                        apiError: "Error al registrar. Por favor, intente de nuevo.",
                    });
                } else {
                    setErrors({
                        apiError: "Ocurrió un error al intentar registrar.",
                    });
                }
            } finally {
                setLoading(false);  // Termina la carga
            }
        } else {
            setErrors(formErrors);
        }
    };

    // Funciones para alternar la visibilidad de la contraseña
    const toggleLoginPasswordVisibility = () => {
        setShowLoginPassword(!showLoginPassword);
    };

    const toggleSignupPasswordVisibility = () => {
        setShowSignupPassword(!showSignupPassword);
    };

    return (
        isOpen && (
            <div className="fixed inset-0 flex justify-center items-center backdrop-blur-sm z-50">
                <div className="bg-white rounded-lg w-full sm:w-96 p-6 shadow-lg">
                    {/* Encabezado del modal */}
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-semibold">{activeTab === 'login' ? 'Login' : 'Sign Up'}</h2>
                        <button onClick={handleClose} className="text-black hover:text-rose-500">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Tabs */}
                    <div className="flex mb-4 border-b">
                        <button
                            onClick={() => handleTabChange('login')}
                            className={`py-2 px-4 text-sm font-medium rounded-t-lg focus:outline-none ${activeTab === 'login' ? 'border-b-2 border-rose-600 text-rose-600' : 'text-black hover:text-rose-600'}`}
                        >
                            Login
                        </button>
                        <button
                            onClick={() => handleTabChange('signup')}
                            className={`py-2 px-4 text-sm font-medium rounded-t-lg focus:outline-none ${activeTab === 'signup' ? 'border-b-2 border-rose-600 text-rose-600' : 'text-black hover:text-black'}`}
                        >
                            Sign Up
                        </button>
                    </div>

                    {/* Formulario de Login */}
                    {activeTab === 'login' && (
                        <form onSubmit={handleLoginSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="username" className="block text-sm font-medium text-black-700">Username</label>
                                <input
                                    type="text"
                                    name="username"
                                    value={loginData.username}
                                    onChange={(e) => handleInputChange(e, 'login')}
                                    className="mt-1 text-black block w-full px-4 py-2 border border-white-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Username"
                                />
                                {errors.username && <p className="text-red-500 text-xs">{errors.username}</p>}
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-black-700">Contraseña</label>
                                <div className="relative">
                                    <input
                                        type={showLoginPassword ? "text" : "password"}
                                        name="password"
                                        value={loginData.password}
                                        onChange={(e) => handleInputChange(e, 'login')}
                                        className="mt-1 text-black block w-full px-4 py-2 border border-white-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Password"
                                    />
                                    <button
                                        type="button"
                                        onClick={toggleLoginPasswordVisibility}
                                        className="absolute right-2 top-2 text-gray-500"
                                    >
                                        {showLoginPassword ? 'Ocultar' : 'Ver'}
                                    </button>
                                </div>
                                {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
                            </div>
                            <div>
                                {loading ? (
                                    <button
                                        type="button"
                                        className="w-full py-2 px-4 bg-rose-600 font-semibold text-white rounded-lg focus:outline-none"
                                    >
                                        Cargando...
                                    </button>
                                ) : (
                                    <button
                                        type="submit"
                                        disabled={loading}  // Deshabilitar el botón durante la carga
                                        className="w-full py-2 px-4 bg-rose-600 font-semibold text-white rounded-lg hover:bg-rose-700 focus:outline-none"
                                    >
                                        Iniciar sesión
                                    </button>
                                )}
                            </div>
                            {errors.apiError && <p className="text-red-500 text-xs">{errors.apiError}</p>}
                            {loginSuccess && <p className="text-green-500 text-xs">Login exitoso. Bienvenido!</p>}
                        </form>
                    )}

                    {/* Formulario de Sign Up */}
                    {activeTab === 'signup' && (
                        <form onSubmit={handleSignupSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="username" className="block text-sm font-medium text-black-700">Username</label>
                                <input
                                    type="text"
                                    name="username"
                                    value={signupData.username}
                                    onChange={(e) => handleInputChange(e, 'signup')}
                                    className="mt-1 text-black block w-full px-4 py-2 border border-white-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Username"
                                />
                                {errors.username && <p className="text-red-500 text-xs">{errors.username}</p>}
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-black-700">Contraseña</label>
                                <div className="relative">
                                    <input
                                        type={showSignupPassword ? "text" : "password"}
                                        name="password"
                                        value={signupData.password}
                                        onChange={(e) => handleInputChange(e, 'signup')}
                                        className="mt-1 text-black block w-full px-4 py-2 border border-white-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Password"
                                    />
                                    <button
                                        type="button"
                                        onClick={toggleSignupPasswordVisibility}
                                        className="absolute right-2 top-2 text-gray-500"
                                    >
                                        {showSignupPassword ? 'Ocultar' : 'Ver'}
                                    </button>
                                </div>
                                {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
                            </div>
                            <div>
                                {loading ? (
                                    <button
                                        type="button"
                                        className="w-full py-2 px-4 bg-rose-600 font-semibold text-white rounded-lg focus:outline-none"
                                    >
                                        Cargando...
                                    </button>
                                ) : (
                                    <button
                                        type="submit"
                                        disabled={loading}  // Deshabilitar el botón durante la carga
                                        className="w-full py-2 px-4 bg-rose-600 font-semibold text-white rounded-lg hover:bg-rose-700 focus:outline-none"
                                    >
                                        Crear cuenta
                                    </button>
                                )}
                            </div>
                            {errors.apiError && <p className="text-red-500 text-xs">{errors.apiError}</p>}
                            {signupSuccess && <p className="text-green-500 text-xs">Registro exitoso. Bienvenido!</p>}
                        </form>
                    )}
                </div>
            </div>
        )
    );
};

export default ModalAuth;
