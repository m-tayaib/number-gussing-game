import { useState, useEffect } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [userInput, setUserInput] = useState<string>("");
  const [randomNumGen, setRandomNumGen] = useState<number>(0);
  const [message, setMessage] = useState<string>("");
  const [attempt, setAttempt] = useState<number>(0);
  const [list, setList] = useState<
    { value: string; status: "high" | "low" | "correct" }[]
  >([]);

  const toastOptions: Parameters<typeof toast.info>[1] = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
    transition: Bounce,
  };

  useEffect(() => {
    generateRandomNumber();
  }, []);

  const generateRandomNumber = () => {
    const genNum = Math.floor(Math.random() * 100) + 1;
    setRandomNumGen(genNum);
  };

  const resetGame = () => {
    generateRandomNumber();
    setAttempt(0);
    setUserInput("");
    setMessage("");
    setList([]);
  };

  const guessNumber = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (attempt === 8) {
      toast.error("You have run out of attempts!", toastOptions);
      setMessage("Please reset the game.");
      setUserInput("");
      return;
    } else {
      setAttempt((pre) => pre + 1);
    }

    const parsedInput = parseInt(userInput, 10);
    if (isNaN(parsedInput)) {
      toast.error("Please enter a valid number!", toastOptions);
      setMessage("");
      setUserInput("");
      return;
    }

    if (parsedInput < 1 || parsedInput > 100) {
      toast.error("Please enter a number between 1 and 100!", toastOptions);
      setMessage("");
      setUserInput("");
      return;
    }

    if (parsedInput > randomNumGen) {
      toast.info("Try again!", toastOptions);
      setList((pre) => [...pre, { value: userInput, status: "high" }]);
      setMessage("Your guess is too high!");
    } else if (parsedInput < randomNumGen) {
      toast.info("Try again!", toastOptions);
      setList((pre) => [...pre, { value: userInput, status: "low" }]);
      setMessage("Your guess is too low!");
    } else {
      toast.success("Congratulations!", toastOptions);
      setList((pre) => [...pre, { value: userInput, status: "correct" }]);
      setMessage("You won! Your number matches!");
      setUserInput("");
    }

    setUserInput("");
  };

  return (
    <section className="h-screen overflow-hidden">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div>
      </div>

      <div className="container mx-auto mt-20 space-y-10 flex h-screen flex-col items-center justify-start px-4">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-center font-bold">
          Guessing Game!
        </h1>

        <button
          onClick={resetGame}
          className="bg-fuchsia-400 px-4 py-2 text-xl sm:text-2xl md:text-3xl rounded-md shadow-md hover:bg-fuchsia-600 transition-colors duration-300 ease-in-out cursor-pointer text-white font-bold"
        >
          Start a New Game
        </button>

        <p className="text-xl sm:text-2xl md:text-3xl font-thin text-center">
          Guess a number between 1 and 100
        </p>

        <form
          onSubmit={guessNumber}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <input
            required
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            type="number"
            min="1"
            max="100"
            placeholder="Enter your guess"
            className="text-lg sm:text-2xl border-2 border-fuchsia-400 rounded-md px-4 py-2 placeholder:font-thin placeholder:capitalize focus:outline-none w-64"
          />
          <button
            type="submit"
            disabled={!userInput}
            className={`bg-fuchsia-400 py-2 px-4 text-lg sm:text-2xl rounded-md shadow-md transition-colors duration-300 ease-in-out cursor-pointer text-white font-bold w-32 sm:w-auto ${
              !userInput
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-fuchsia-600"
            }`}
          >
            Guess
          </button>
        </form>

        <p className="text-xl sm:text-2xl md:text-3xl font-thin text-center">
          {message}
        </p>

        <ToastContainer />

        {list.length > 0 && (
          <div className="w-full max-w-xl px-4">
            <div className="  backdrop-blur-md rounded-lg shadow-lg p-6 border border-fuchsia-100">
              <h2 className="text-2xl sm:text-3xl font-semibold text-center text-fuchsia-600 mb-4">
                Your Guesses
              </h2>
              <ul className="space-y-3 max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-fuchsia-400 scrollbar-track-transparent">
                {list.map((item, index) => {
                  const colorClass =
                    item.status === "high"
                      ? "text-red-500 border-red-200 bg-red-50"
                      : item.status === "low"
                      ? "text-blue-500 border-blue-200 bg-blue-50"
                      : "text-green-600 border-green-200 bg-green-50";

                  const label =
                    item.status === "high"
                      ? "Too High"
                      : item.status === "low"
                      ? "Too Low"
                      : "Correct!";

                  return (
                    <li
                      key={index}
                      className={`flex justify-between items-center px-4 py-2 rounded-md border ${colorClass} shadow-sm`}
                    >
                      <span className="font-medium">
                        {index + 1}. Guess: {item.value}
                      </span>
                      <span className="italic">{label}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        )}

        <p className="absolute bottom-[3%] left-12 border-2 p-2 rounded-md shadow-black bg-black text-white text-xl sm:text-2xl md:text-3xl font-thin text-center">
          Attempts {8 - attempt}
        </p>
      </div>
    </section>
  );
}

export default App;
