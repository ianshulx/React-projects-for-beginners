// "use client";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { signIn } from "next-auth/react";
// const LoginForm = () => {
//   // const router = useRouter();
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   const handleUsernameChange = (e) => {
//     setUsername(e.target.value);
//   };

//   const handlePasswordChange = (e) => {
//     setPassword(e.target.value);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const result = await signIn("credentials", {
//         username: username,
//         password: password,
//         redirect: false,
//       });

//       if (result.ok) {
//         router.push("/");
//       } else {
//         // setError(result.error ?? "Authentication failed");
//       }
//     } catch (error) {
//       // setError("Unexpected error during authentication");
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-0 p-6 text-center rounded-md bg-white">
//       <h2 className="text-xs font-gray-100 mb-4">OR</h2>
//       <h2 className="text-2xl font-bold mb-4">Login with Credentials</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <label
//             htmlFor="username"
//             className="block text-sm font-medium text-gray-600"
//           >
//             Username
//           </label>
//           <input
//             type="text"
//             id="username"
//             name="username"
//             value={username}
//             onChange={handleUsernameChange}
//             className="mt-1 p-2 w-full border rounded-md"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label
//             htmlFor="password"
//             className="block text-sm font-medium text-gray-600"
//           >
//             Password
//           </label>
//           <input
//             type="password"
//             id="password"
//             name="password"
//             value={password}
//             onChange={handlePasswordChange}
//             className="mt-1 p-2 w-full border rounded-md"
//             required
//           />
//         </div>
//         {/* {error && <div className="text-red-500 text-sm mb-4">{error}</div>} */}

//         <button
//           type="submit"
//           className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
//         >
//           Login
//         </button>
//       </form>
//     </div>
//   );
// };

// export default LoginForm;
"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
const LoginForm = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await signIn("credentials", {
        username: username,
        password: password,
        redirect: false,
      });

      if (result.ok) {
        router.push("/");
      } else {
        setError("Incorrect username or password");
      }
    } catch (error) {
      setError("Unexpected error during authentication");
    }
  };
  return (
    <div className="max-w-md mx-auto mt-0 p-6 text-center rounded-md bg-white">
      <h2 className="text-xs font-gray-100 mb-4">OR</h2>
      <h2 className="text-2xl font-bold mb-4">Login with Credentials</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-600"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={handleUsernameChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-600"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
