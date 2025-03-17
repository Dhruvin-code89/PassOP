import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { StateContext } from '../App';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ShowPass = ({ items }) => {
  const { passwordArray, form, setPasswordArray, setform } = useContext(StateContext);

  // Function to delete a password
  const deletePassword = (id) => {
    const updatedPass = passwordArray.filter((item) => item.id !== id);
    setPasswordArray(updatedPass);
    localStorage.setItem('passwords', JSON.stringify(updatedPass));

    toast.success('Password deleted successfully!');
  };

  // Function to edit a password
  const editPassword = (id) => {
    const item = passwordArray.find((item) => item.id === id);
    if (item) {
      setform((prevForm) => ({ ...prevForm, site: item.site, username: item.username, password: item.password })); // Immutable state update
    }

    const updatedPass = passwordArray.filter((item) => item.id !== id);
    setPasswordArray(updatedPass);
    localStorage.setItem('passwords', JSON.stringify(updatedPass));
  };

  // Function to copy text and show toast
  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      const isPassword = passwordArray.some((item) => item.password === text);

      if (isPassword) {
        toast.info(`Copied the password`);
      } else {
        toast.info(`Copied the text: ${text}`);
      }
    } catch (error) {
      console.error("Failed to copy text: ", error);
      toast.error("Failed to copy text to clipboard");
    }
  };

  const encPass = (x) => {
    const stars = [];
    for (let i = 0; i < x; i++) {
      stars.push(<span key={i}>*</span>)
    }
    return <div>{stars}</div>
  }

  return (
    <>
      <div className="overflow-x-auto mb-5">
        <table className="w-full lg:w-[65vw] table-auto border-collapse text-center text-white m-auto">
          <thead>
            <tr className="bg-green-700">
              <th className="p-2">Website</th>
              <th className="p-2">Username</th>
              <th className="p-2">Password</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((element, index) => (
              <tr className="bg-green-100 border border-slate-200" key={index}>
                {/* Website Column */}
                <td className="text-black p-2">
                  <div className="flex items-center justify-center">
                    <span className="bg-green-200 px-1 rounded truncate max-w-[200px] sm:max-w-[300px]">
                      {element.site}
                    </span>
                    <span
                      className="cursor-pointer ml-1"
                      onClick={() => copyToClipboard(element.site)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width={16}
                        height={16}
                        color={"#000000"}
                        fill={"none"}>
                        <path
                          d="M9 15C9 12.1716 9 10.7574 9.87868 9.87868C10.7574 9 12.1716 9 15 9L16 9C18.8284 9 20.2426 9 21.1213 9.87868C22 10.7574 22 12.1716 22 15V16C22 18.8284 22 20.2426 21.1213 21.1213C20.2426 22 18.8284 22 16 22H15C12.1716 22 10.7574 22 9.87868 21.1213C9 20.2426 9 18.8284 9 16L9 15Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round" />
                        <path
                          d="M16.9999 9C16.9975 6.04291 16.9528 4.51121 16.092 3.46243C15.9258 3.25989 15.7401 3.07418 15.5376 2.90796C14.4312 2 12.7875 2 9.5 2C6.21252 2 4.56878 2 3.46243 2.90796C3.25989 3.07417 3.07418 3.25989 2.90796 3.46243C2 4.56878 2 6.21252 2 9.5C2 12.7875 2 14.4312 2.90796 15.5376C3.07417 15.7401 3.25989 15.9258 3.46243 16.092C4.51121 16.9528 6.04291 16.9975 9 16.9999"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round" />
                      </svg>
                    </span>
                  </div>
                </td>

                {/* Username Column */}
                <td className="text-black p-2">
                  <div className="flex items-center justify-center">
                    <span className="truncate max-w-[100px] sm:max-w-[150px]">
                      {element.username}
                    </span>
                    <span
                      className="cursor-pointer ml-1"
                      onClick={() => copyToClipboard(element.username)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width={16}
                        height={16}
                        color={"#000000"}
                        fill={"none"}>
                        <path
                          d="M9 15C9 12.1716 9 10.7574 9.87868 9.87868C10.7574 9 12.1716 9 15 9L16 9C18.8284 9 20.2426 9 21.1213 9.87868C22 10.7574 22 12.1716 22 15V16C22 18.8284 22 20.2426 21.1213 21.1213C20.2426 22 18.8284 22 16 22H15C12.1716 22 10.7574 22 9.87868 21.1213C9 20.2426 9 18.8284 9 16L9 15Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round" />
                        <path
                          d="M16.9999 9C16.9975 6.04291 16.9528 4.51121 16.092 3.46243C15.9258 3.25989 15.7401 3.07418 15.5376 2.90796C14.4312 2 12.7875 2 9.5 2C6.21252 2 4.56878 2 3.46243 2.90796C3.25989 3.07417 3.07418 3.25989 2.90796 3.46243C2 4.56878 2 6.21252 2 9.5C2 12.7875 2 14.4312 2.90796 15.5376C3.07417 15.7401 3.25989 15.9258 3.46243 16.092C4.51121 16.9528 6.04291 16.9975 9 16.9999"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round" />
                      </svg>
                    </span>
                  </div>
                </td>

                {/* Password Column */}
                <td className="text-black p-2">
                  <div className="flex items-center justify-center">
                    <span className="truncate max-w-[100px] sm:max-w-[150px]">
                      {encPass(element.password.length)}
                    </span>
                    <span
                      className="cursor-pointer ml-1"
                      onClick={() => copyToClipboard(element.password)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width={16}
                        height={16}
                        color={"#000000"}
                        fill={"none"}>
                        <path
                          d="M9 15C9 12.1716 9 10.7574 9.87868 9.87868C10.7574 9 12.1716 9 15 9L16 9C18.8284 9 20.2426 9 21.1213 9.87868C22 10.7574 22 12.1716 22 15V16C22 18.8284 22 20.2426 21.1213 21.1213C20.2426 22 18.8284 22 16 22H15C12.1716 22 10.7574 22 9.87868 21.1213C9 20.2426 9 18.8284 9 16L9 15Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round" />
                        <path
                          d="M16.9999 9C16.9975 6.04291 16.9528 4.51121 16.092 3.46243C15.9258 3.25989 15.7401 3.07418 15.5376 2.90796C14.4312 2 12.7875 2 9.5 2C6.21252 2 4.56878 2 3.46243 2.90796C3.25989 3.07417 3.07418 3.25989 2.90796 3.46243C2 4.56878 2 6.21252 2 9.5C2 12.7875 2 14.4312 2.90796 15.5376C3.07417 15.7401 3.25989 15.9258 3.46243 16.092C4.51121 16.9528 6.04291 16.9975 9 16.9999"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round" />
                      </svg>
                    </span>
                  </div>
                </td>

                {/* Actions Column */}
                <td className="text-black p-2">
                  <div className="flex justify-center space-x-2">
                    <span className="cursor-pointer" onClick={() => editPassword(element.id)}>
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </span>
                    <span
                      className="cursor-pointer"
                      onClick={() => deletePassword(element.id)}>
                      <lord-icon
                        src="https://cdn.lordicon.com/skkahier.json"
                        trigger="hover"></lord-icon>
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </>
  );
};

export default ShowPass;
