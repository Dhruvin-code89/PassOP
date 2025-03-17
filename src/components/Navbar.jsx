import React from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useContext } from "react";
import { StateContext } from "../App";

const Navbar = () => {
  const { passwordArray } = useContext(StateContext);

  const generatePdf = () => {
    const doc = new jsPDF();
    doc.text("Your Passwords", 14, 10);

    const tableColumn = ["Site", "Username", "Password"];
    const tableRows = passwordArray.map(({ id, ...rest }) => Object.values(rest));

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save("passwords.pdf");
  };

  return (
    <nav className="bg-slate-800 h-[8vh] px-6 sm:px-12 md:px-20 lg:px-32 flex items-center justify-between shadow-md border-b border-gray-700">
      {/* Logo/Branding */}
      <div className="font-bold text-xl tracking-wide">
        <span className="text-green-400">&lt;</span>
        <span className="text-white">Pass</span>
        <span className="text-green-400">OP/&gt;</span>
      </div>

      {/* Download Button */}
      <button
        className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md transition-all duration-200 shadow-md"
        onClick={generatePdf}>
        Download as PDF
      </button>
    </nav>
  );
};

export default Navbar;
