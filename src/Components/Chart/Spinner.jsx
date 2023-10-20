import React, { useState, useRef } from "react";
import "../../App.css";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";

const Spinner = () => {
  const [names, setNames] = useState([]);
  const [winner, setWinner] = useState(null);
  const [loading, setLoading] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const wheelRef = useRef(null);

  const handleAddName = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    if (name) {
      setNames([...names, name]);
      toast.success(`${name} added successfully`);
    } else {
      toast.error("Please Add Name");
    }
    form.reset();
  };

  console.log(spinning);
  const handleAllClear = () => {
    setNames([]);
    setWinner(null);
    toast.success("Clear all name");
  };

  const handleSpin = () => {
    toast.loading("Spinning", {
      duration: 4000,
    });
    setLoading(true);
    if (names.length === 0 || spinning) {
      toast.error("Please add name ");
      setLoading(false);
    }

    setWinner(null);
    setSpinning(true);

    const randomIndex = Math.floor(Math.random() * names.length);
    const rotation = 360 * 5 + (360 / names.length) * randomIndex;

    wheelRef.current.style.transition = "none";
    wheelRef.current.style.transform = `rotate(${rotation}deg)`;

    setTimeout(() => {
      wheelRef.current.style.transition = "transform 4s ease-out";
      wheelRef.current.style.transform = `rotate(${rotation + 1080}deg)`; // Three full spins
    }, 10);

    setTimeout(() => {
      setWinner(names[randomIndex]);
      console.log(names[randomIndex]);
      Swal.fire({
        title: `<strong>Winner</strong>`,
        icon: "success",
        html: ` <b className="text-2xl"> Winner Is ${names[randomIndex]}</b>, `,
        showCloseButton: true,
        // showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: '<i class="fa fa-thumbs-up"></i> Ok',
        confirmButtonAriaLabel: "Thumbs up, great!",
        cancelButtonText: '<i class="fa fa-thumbs-down"></i>',
        cancelButtonAriaLabel: "Thumbs down",
      });
      setSpinning(false);
      setLoading(false);
    }, 4000);
  };

  return (
    <div className="App flex justify-center items-center h-[100vh]">
      <div className="flex flex-wrap justify-center  gap-10">
        <div className="spinner">
          <div ref={wheelRef} className={` wheel ${spinning ? "spin  " : ""}`}>
            {names.map((name, index) => (
              <div
                className="item"
                key={index}
                style={{
                  transform: `rotate(${(360 / names.length) * index}deg)`,
                  width: `${300 / names.length}px`,
                  height: `${300 / names.length}px`,
                  borderRadius: "50%",
                }}
              >
                {name}
              </div>
            ))}
          </div>
          <div className="flex  mt-[20px] gap-5 justify-center items-center">
            <button
              onClick={() => handleSpin()}
              className="px-4 bg-blue-600 text-white rounded-md py-2 text-[18px] "
            >
              {loading ? "Loading..." : "Spin It"}
            </button>

            {names.length > 0 && (
              <button
                onClick={() => handleAllClear()}
                className="px-4 bg-blue-600 text-white rounded-md py-2 text-[18px] "
              >
                Clear
              </button>
            )}
          </div>
        </div>
        <div>
          <form onSubmit={handleAddName}>
            <input
              type="text"
              placeholder="Type name"
              name="name"
              className="outline-blue-500 py-2  pl-2 rounded-md border border-blue-400 mt-10"
            />
            <input
              className="bg-blue-400 text-white px-4 py-2 rounded-xl ml-5"
              type="submit"
              value="Add Name"
            />
          </form>
          <div>
            <ul className="mt-5">
              {names?.map((name, index) => (
                <li className="text-start ml-5 " key={index}>
                  {name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Spinner;
