export default function Register() {
    return (
      <div className="max-w-md mx-auto mt-20 p-6 bg-white shadow rounded">
        <h1 className="text-2xl font-bold mb-4 text-center">Register</h1>
        <form className="flex flex-col gap-4">
          <input type="text" placeholder="Name" className="border p-2 rounded"/>
          <input type="email" placeholder="Email" className="border p-2 rounded"/>
          <input type="password" placeholder="Password" className="border p-2 rounded"/>
          <select className="border p-2 rounded">
            <option value="client">Client</option>
            <option value="business">Business</option>
          </select>
          <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
            Register
          </button>
        </form>
      </div>
    );
  }  