export default function Login() {
    return (
      <div className="max-w-md mx-auto mt-20 p-6 bg-white shadow rounded">
        <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
        <form className="flex flex-col gap-4">
          <input type="email" placeholder="Email" className="border p-2 rounded"/>
          <input type="password" placeholder="Password" className="border p-2 rounded"/>
          <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
            Login
          </button>
        </form>
      </div>
    );
  }
  
  