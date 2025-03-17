import React, { useEffect, useState, useContext } from 'react';
import ShowPass from './ShowPass';
import { v4 as uuidv4 } from 'uuid';
import { StateContext } from '../App';

const Manager = () => {
  const { passwordArray, form, setPasswordArray, setform } = useContext(StateContext);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    let password = localStorage.getItem("passwords");
    setPasswordArray(password ? JSON.parse(password) : []);
  }, []);

  const savePass = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const savetoStorage = () => {
    if (form.site != "" && form.username != "" && form.password != "") {
      const updatedPasswords = [...passwordArray, { ...form, id: uuidv4() }];
      setPasswordArray(updatedPasswords);
      localStorage.setItem("passwords", JSON.stringify(updatedPasswords));
      console.log(updatedPasswords)
      // Clear the form after saving
      setform({ site: "", username: "", password: "" });
    }
  };

  const togglePassVisibility = () => {
    setShowPassword(!showPassword)
  }

  let isPassword = JSON.parse(localStorage.getItem("passwords")) || []
  // console.log(isPassword)

  return (
    <>
      <section className="min-h-[83vh] max-w-[100vw] overflow-x-hidden">
        <div className="fixed top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
        {/* logo */}
        <h1 className="text-4xl text font-bold text-center mt-2">
          <span className="text-green-500"> &lt;</span>
          <span>Pass</span>
          <span className="text-green-500">OP/&gt;</span>
        </h1>
        <p className="text-green-900 text-lg text-center">Your own Password Manager</p>

        {/* form */}
        <div className="mt-1 flex flex-col w-[90vw] md:w-[88vw] lg:w-[65vw] m-auto gap-y-5">
          <input
            value={form.site}
            onChange={savePass}
            placeholder="Enter website URL"
            className="rounded-full border border-green-500 w-full p-4 py-1"
            type="text"
            name="site"
          />
          <div className="flex flex-col md:flex-row gap-3">
            <input
              value={form.username}
              onChange={savePass}
              placeholder="Enter Username"
              className="rounded-full border border-green-500 w-full p-4 py-1"
              type="text"
              name="username"
            />
            <span className='rounded-full border border-green-500 lg:w-1/3 sm:w-[100%] flex relative'>
              <input
                value={form.password}
                onChange={savePass}
                placeholder="Enter Password"
                className="rounded-full w-[100%] p-4 py-1 pr-7"
                type={showPassword ? "text" : "password"}
                name="password" />
              <img src={showPassword ? "icons/eyeCross.png" : "icons/eye.png"} alt="eye" width={24} className='absolute right-1 top-1' onClick={togglePassVisibility} />
            </span>
          </div>

          <button onClick={savetoStorage}
            className="m-auto flex gap-1 bg-green-400 hover:bg-green-300 rounded-full px-8 py-2 w-fit border border-green-900 items-center"
            type="submit">
            <lord-icon src="https://cdn.lordicon.com/jgnvfzqg.json" trigger="hover"></lord-icon>
            <span className="mb-1">Save</span>
          </button>
        </div>

        <div className='w-[65vw] m-auto my-3'>
          <b><h2>Your Passwords</h2></b>
        </div>
        {
          isPassword.length > 0 ? <ShowPass items={isPassword} /> :
            (<div className='w-[90vw] md:w-[88vw] lg:w-[65vw] m-auto my-3'>
              <p>No Password to Show</p>
            </div>)
        }
      </section>
    </>
  );
};

export default Manager;